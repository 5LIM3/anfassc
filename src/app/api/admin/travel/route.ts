import { NextRequest, NextResponse } from "next/server";
import { createClient, createAdminClient } from "@/lib/supabase/server";

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
    const {
      title, description, tournament, destination,
      departure_date, return_date, price, includes,
      spots_total, image,
    } = body;

    if (!title || !tournament || !destination || !departure_date || !return_date || !price || !spots_total) {
      return NextResponse.json({ success: false, error: "Please fill in all required fields" }, { status: 400 });
    }

    if (image !== undefined && image !== null) {
      const cloudinaryPrefix = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/`;
      if (typeof image !== "string" || !image.startsWith(cloudinaryPrefix)) {
        return NextResponse.json({ success: false, error: "Invalid package image" }, { status: 400 });
      }
    }

    const adminSupabase = await createAdminClient();
    const { data, error } = await adminSupabase.from("travel_packages").insert({
      title,
      description: description ?? "",
      tournament,
      destination,
      departure_date,
      return_date,
      price: Math.round(Number(price) * 100), // convert Naira to kobo
      includes: Array.isArray(includes) ? includes : [],
      spots_total: Number(spots_total),
      spots_remaining: Number(spots_total),
      status: "open",
      image: image || null,
    }).select().single();

    if (error) {
      console.error("Travel package insert error:", error);
      return NextResponse.json({ success: false, error: "Failed to create travel package" }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Admin travel API error:", error);
    return NextResponse.json({ success: false, error: "Something went wrong" }, { status: 500 });
  }
}
