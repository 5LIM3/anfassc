import { NextRequest, NextResponse } from "next/server";
import { createClient, createAdminClient } from "@/lib/supabase/server";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ success: false, error: "Please log in" }, { status: 401 });
    }

    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
    if (!profile || !["admin", "super_admin"].includes(profile.role)) {
      return NextResponse.json({ success: false, error: "Admin access required" }, { status: 403 });
    }

    const body = await request.json();
    const { name, description, price, category, stock, is_featured, sizes } = body;

    if (!name || !price || !category) {
      return NextResponse.json({ success: false, error: "Name, price, and category are required" }, { status: 400 });
    }

    const adminSupabase = await createAdminClient();
    const { data, error } = await adminSupabase.from("products").insert({
      name,
      slug: slugify(name) + "-" + Date.now().toString().slice(-5),
      description: description ?? "",
      price: Math.round(Number(price) * 100), // convert Naira to kobo
      category,
      stock: Number(stock) || 0,
      is_featured: !!is_featured,
      sizes: sizes && sizes.length > 0 ? sizes : [],
      is_active: true,
    }).select().single();

    if (error) {
      console.error("Product insert error:", error);
      return NextResponse.json({ success: false, error: "Failed to create product" }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Admin products API error:", error);
    return NextResponse.json({ success: false, error: "Something went wrong" }, { status: 500 });
  }
}