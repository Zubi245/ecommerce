import { NextResponse } from "next/server";
import imagekit from "../../lib/imagekit";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { image, folder = "products" } = data;

    // Extract base64 data from data URL
    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    const fileName = `${folder}_${Date.now()}`;

    const result = await imagekit.upload({
      file: base64Data,
      fileName,
      folder: `samfabrics/${folder}`,
    });

    return NextResponse.json({ url: result.url });
  } catch (error) {
    console.error("ImageKit upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

// Auth endpoint for client-side uploads
export async function GET() {
  try {
    const authParams = imagekit.getAuthenticationParameters();
    return NextResponse.json(authParams);
  } catch (error) {
    console.error("ImageKit auth error:", error);
    return NextResponse.json({ error: "Auth failed" }, { status: 500 });
  }
}
