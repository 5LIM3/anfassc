import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Routes that require authentication
const PROTECTED_ROUTES = ["/dashboard", "/profile", "/membership-card", "/orders"];

// Routes only accessible when NOT logged in
const AUTH_ROUTES = ["/login", "/register", "/forgot-password"];

// Routes that require admin role
const ADMIN_ROUTES = ["/admin"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  let response = NextResponse.next({ request });

  // ---- Security Headers ----
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  response.headers.set(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.paystack.co",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https://res.cloudinary.com https://cdn.sanity.io",
      "connect-src 'self' https://*.supabase.co https://api.paystack.co https://checkout.paystack.com",
      "frame-src https://js.paystack.co https://checkout.paystack.com",
    ].join("; ")
  );

  // ---- Supabase Auth ----
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  // ---- Route Guards ----

  // Redirect logged-in users away from auth pages
  if (AUTH_ROUTES.some((r) => pathname.startsWith(r))) {
    if (user) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return response;
  }

  // Protect member routes
  if (PROTECTED_ROUTES.some((r) => pathname.startsWith(r))) {
    if (!user) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Protect admin routes
  if (ADMIN_ROUTES.some((r) => pathname.startsWith(r))) {
    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Check admin role in profiles table
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (!profile || !["admin", "super_admin"].includes(profile.role)) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public|api/webhook).*)",
  ],
};
