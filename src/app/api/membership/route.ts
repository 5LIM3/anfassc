import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const MEMBERSHIP_PRICES: Record<string, number> = {
  standard: 10000,
  premium: 25000,
  vip: 50000,
};

function generateReference(prefix = "ANFASSC") {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || !user.email) {
      return NextResponse.json({ success: false, error: "Please log in first" }, { status: 401 });
    }

    const body = await request.json();
    const tier = body.tier as string;

    if (!MEMBERSHIP_PRICES[tier]) {
      return NextResponse.json({ success: false, error: "Invalid membership tier" }, { status: 400 });
    }

    const reference = generateReference("MEM");
    const amountKobo = MEMBERSHIP_PRICES[tier] * 100;

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