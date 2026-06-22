import { NextRequest, NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validations";
import { createAdminClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = newsletterSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ success: false, error: "Invalid email" }, { status: 400 });
    }

    const supabase = await createAdminClient();
    const { error } = await supabase
      .from("newsletter_subscribers")
      .upsert({ email: result.data.email, is_active: true }, { onConflict: "email" });

    if (error) throw error;

    return NextResponse.json({ success: true, message: "You're subscribed!" });
  } catch {
    return NextResponse.json({ success: false, error: "Subscription failed" }, { status: 500 });
  }
}
