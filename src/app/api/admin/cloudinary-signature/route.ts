import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import cloudinary from "@/lib/cloudinary/config";

const ALLOWED_FOLDERS = ["anfassc/products", "anfassc/travel"];
const DEFAULT_FOLDER = "anfassc/products";

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

    let requestedFolder = DEFAULT_FOLDER;
    try {
      const body = await request.json();
      if (typeof body?.folder === "string" && ALLOWED_FOLDERS.includes(body.folder)) {
        requestedFolder = body.folder;
      }
    } catch {
      // No JSON body sent — fall back to the default folder
    }

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json({ success: false, error: "Cloudinary is not configured" }, { status: 500 });
    }

    const timestamp = Math.round(Date.now() / 1000);
    const signature = cloudinary.utils.api_sign_request({ timestamp, folder: requestedFolder }, apiSecret);

    return NextResponse.json({ success: true, signature, timestamp, folder: requestedFolder, apiKey, cloudName });
  } catch (error) {
    console.error("Cloudinary signature error:", error);
    return NextResponse.json({ success: false, error: "Something went wrong" }, { status: 500 });
  }
}
