import { writeFile, mkdir } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file = data.get("file") as unknown as File;

    if (!file) {
      return NextResponse.json({ success: false, message: "No file uploaded" });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Define the upload directory and ensure it exists
    const uploadDir = join(process.cwd(), "uploads");
    await mkdir(uploadDir, { recursive: true });

    const filePath = join(uploadDir, file.name);
    await writeFile(filePath, buffer);

    console.log(`File uploaded: ${filePath}`);
    return NextResponse.json({ success: true, filePath });
  } catch (error) {
    console.error("Error during file upload:", error);
    return NextResponse.json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
