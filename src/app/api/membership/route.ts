import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { membershipSchema } from "@/lib/validations";
import { MEMBERSHIP_TIERS } from "@/types";
import { generateReference } from "@/lib/utils";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const result = membershipSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ success: false, error: "Invalid tier" }, { status: 400 });
    }

    const { tier } = result.data;
    const tierDetails = MEMBERSHIP_TIERS[tier];
    const reference = generateReference("MEM");
    const amountKobo = tierDetails.price * 100;

    // Return Paystack payment details — frontend initiates payment
    return NextResponse.json({
      success: true,
      data: {
        reference,
        amount: amountKobo,
        email: user.email,
        metadata: {
          user_id: user.id,
          tier,
          type: "membership",
        },
      },
    });
  } catch (error) {
    console.error("Membership API error:", error);
    return NextResponse.json({ success: false, error: "Failed to initiate payment" }, { status: 500 });
  }
}
