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
    const { title, description, event_date } = body;

    if (!title) {
      return NextResponse.json({ success: false, error: "Title is required" }, { status: 400 });
    }

    const adminSupabase = await createAdminClient();
    const { data, error } = await adminSupabase.from("gallery_albums").insert({
      title,
      description: description ?? "",
      event_date: event_date || null,
      is_published: true,
    }).select().single();

    if (error) {
      console.error("Album insert error:", error);
      return NextResponse.json({ success: false, error: "Failed to create album" }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Album create error:", error);
    return NextResponse.json({ success: false, error: "Something went wrong" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: albums } = await supabase
      .from("gallery_albums")
      .select("*, gallery_images(id, url, caption)")
      .eq("is_published", true)
      .order("event_date", { ascending: false });

    return NextResponse.json({ success: true, data: albums ?? [] });
  } catch (error) {
    console.error("Albums fetch error:", error);
    return NextResponse.json({ success: false, error: "Failed to load albums" }, { status: 500 });
  }
}