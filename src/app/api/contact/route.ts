import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";
import { createAdminClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: "Validation failed", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const supabase = await createAdminClient();
    const { error } = await supabase.from("contact_messages").insert(result.data);

    if (error) throw error;

    // TODO: Send email notification via Resend
    // await sendContactNotification(result.data);

    return NextResponse.json({ success: true, message: "Message received. We'll be in touch soon." });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ success: false, error: "Failed to send message" }, { status: 500 });
  }
}
