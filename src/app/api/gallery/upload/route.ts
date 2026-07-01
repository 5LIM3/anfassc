import { NextRequest, NextResponse } from "next/server";
import { createClient, createAdminClient } from "@/lib/supabase/server";
import cloudinary from "@/lib/cloudinary/config";

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

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const albumId = formData.get("album_id") as string | null;
    const caption = formData.get("caption") as string | null;

    if (!file || !albumId) {
      return NextResponse.json({ success: false, error: "File and album are required" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "anfassc/gallery" }, (error, result) => {
          if (error || !result) reject(error);
          else resolve(result as { secure_url: string });
        })
        .end(buffer);
    });

    const adminSupabase = await createAdminClient();
    const { data, error } = await adminSupabase.from("gallery_images").insert({
      album_id: albumId,
      url: uploadResult.secure_url,
      caption: caption ?? "",
      alt: caption ?? "ANFASSC event photo",
    }).select().single();

    if (error) {
      console.error("Gallery image insert error:", error);
      return NextResponse.json({ success: false, error: "Upload succeeded but saving failed" }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Gallery upload error:", error);
    return NextResponse.json({ success: false, error: "Upload failed" }, { status: 500 });
  }
}