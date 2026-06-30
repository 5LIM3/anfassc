import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { sendMembershipConfirmationEmail, sendOrderConfirmationEmail } from "@/lib/email/resend";

export async function POST(request: NextRequest) {
  try {
    const { reference } = await request.json();
    if (!reference) {
      return NextResponse.json({ success: false, error: "Missing reference" }, { status: 400 });
    }

    const paystackRes = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
    });
    const paystackData = await paystackRes.json();

    if (!paystackData.status || paystackData.data?.status !== "success") {
      return NextResponse.json({ success: false, error: "Payment not successful" }, { status: 400 });
    }

    const { metadata, amount, customer } = paystackData.data;
    const supabase = await createAdminClient();
    const customerEmail = customer?.email as string | undefined;

    if (metadata?.type === "membership") {
      const startDate = new Date().toISOString().split("T")[0];
      const expiryDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1))
        .toISOString()
        .split("T")[0];

      const { data: existing } = await supabase
        .from("memberships")
        .select("id")
        .eq("user_id", metadata.user_id)
        .maybeSingle();

      let membershipNumber = "";

      if (existing) {
        const { data: updated } = await supabase
          .from("memberships")
          .update({
            tier: metadata.tier,
            status: "active",
            start_date: startDate,
            expiry_date: expiryDate,
            paystack_reference: reference,
          })
          .eq("id", existing.id)
          .select("membership_number")
          .single();
        membershipNumber = updated?.membership_number ?? "";
      } else {
        const { data: inserted } = await supabase.from("memberships").insert({
          user_id: metadata.user_id,
          tier: metadata.tier,
          status: "active",
          membership_number: "",
          start_date: startDate,
          expiry_date: expiryDate,
          paystack_reference: reference,
        }).select("membership_number").single();
        membershipNumber = inserted?.membership_number ?? "";
      }

      // Send confirmation email
      if (customerEmail) {
        const { data: profile } = await supabase.from("profiles").select("full_name").eq("id", metadata.user_id).single();
        await sendMembershipConfirmationEmail(
          customerEmail,
          profile?.full_name ?? "Member",
          metadata.tier,
          membershipNumber
        );
      }
    }

    if (metadata?.type === "order") {
      const { data: order } = await supabase
        .from("orders")
        .update({ status: "paid" })
        .eq("paystack_reference", reference)
        .select("items, total, user_id")
        .single();

      if (order && customerEmail) {
        const { data: profile } = await supabase.from("profiles").select("full_name").eq("id", order.user_id).single();
        await sendOrderConfirmationEmail(
          customerEmail,
          profile?.full_name ?? "Member",
          order.total,
          order.items
        );
      }
    }

    return NextResponse.json({ success: true, amount });
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json({ success: false, error: "Verification failed" }, { status: 500 });
  }
}