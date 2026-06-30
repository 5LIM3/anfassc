import { NextRequest, NextResponse } from "next/server";
import { sendWelcomeEmail } from "@/lib/email/resend";

export async function POST(request: NextRequest) {
  try {
    const { email, fullName } = await request.json();
    if (!email || !fullName) {
      return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
    }

    await sendWelcomeEmail(email, fullName);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Welcome email API error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}