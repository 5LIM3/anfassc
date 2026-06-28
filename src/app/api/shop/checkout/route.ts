import { NextRequest, NextResponse } from "next/server";
import { createClient, createAdminClient } from "@/lib/supabase/server";

function generateReference(prefix = "ANFASSC") {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
}

interface CartItemInput {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || !user.email) {
      return NextResponse.json({ success: false, error: "Please log in first" }, { status: 401 });
    }

    const body = await request.json();
    const items: CartItemInput[] = body.items;
    const shippingAddress = body.shipping_address;

    if (!items || items.length === 0) {
      return NextResponse.json({ success: false, error: "Your cart is empty" }, { status: 400 });
    }

    const totalNaira = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const amountKobo = totalNaira * 100;
    const reference = generateReference("ORD");

    const adminSupabase = await createAdminClient();
    await adminSupabase.from("orders").insert({
      user_id: user.id,
      items: items.map((i) => ({
        product_id: i.id,
        product_name: i.name,
        quantity: i.quantity,
        price: i.price * 100,
        size: i.size ?? null,
      })),
      total: amountKobo,
      status: "pending",
      paystack_reference: reference,
      shipping_address: shippingAddress,
    });

    return NextResponse.json({
      success: true,
      data: {
        reference,
        amount: amountKobo,
        email: user.email,
        metadata: { user_id: user.id, type: "order" },
      },
    });
  } catch (error) {
    console.error("Checkout API error:", error);
    return NextResponse.json({ success: false, error: "Failed to start checkout" }, { status: 500 });
  }
}