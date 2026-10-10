import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

// Helper to ensure uploads folder exists
async function ensureUploadsDir() {
  try {
    await fs.mkdir(UPLOADS_DIR, { recursive: true });
  } catch (err) {
    console.error("Failed to create uploads directory:", err);
  }
}

// GET: list all uploaded media files
export async function GET(req: NextRequest) {
  try {
    await ensureUploadsDir();
    const files = await fs.readdir(UPLOADS_DIR);

    const mediaList = await Promise.all(
      files
        .filter((file) => !file.startsWith("."))
        .map(async (filename) => {
          const filePath = path.join(UPLOADS_DIR, filename);
          const stats = await fs.stat(filePath);
          return {
            filename,
            url: `/uploads/${filename}`,
            size: stats.size,
            updatedAt: stats.mtime.toISOString(),
          };
        })
    );

    // Sort newest first
    mediaList.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

    return NextResponse.json({ success: true, files: mediaList });
  } catch (error) {
    console.error("Error reading uploads:", error);
    return NextResponse.json(
      { error: "Failed to list uploads", details: String(error) },
      { status: 500 }
    );
  }
}

// POST: upload an image file
export async function POST(req: NextRequest) {
  try {
    await ensureUploadsDir();

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate mime type
    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/svg+xml",
      "image/gif",
      "image/avif",
    ];

    if (!validTypes.includes(file.type) && !file.name.match(/\.(jpg|jpeg|png|webp|svg|gif|avif)$/i)) {
      return NextResponse.json(
        { error: "Invalid file type. Please upload a JPG, PNG, WEBP, SVG, or GIF image." },
        { status: 400 }
      );
    }

    // Sanitize filename
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const ext = path.extname(originalName) || ".png";
    const nameWithoutExt = path.basename(originalName, ext);
    const uniqueFilename = `${nameWithoutExt}-${Date.now()}${ext}`;
    const destinationPath = path.join(UPLOADS_DIR, uniqueFilename);

    // Convert to buffer and write
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await fs.writeFile(destinationPath, buffer);

    const publicUrl = `/uploads/${uniqueFilename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: uniqueFilename,
      size: file.size,
      type: file.type,
    });
  } catch (error) {
    console.error("Image upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload image", details: String(error) },
      { status: 500 }
    );
  }
}

// DELETE: remove an uploaded image
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    let filename = searchParams.get("filename");

    if (!filename) {
      const body = await req.json().catch(() => ({}));
      filename = body.filename;
    }

    if (!filename) {
      return NextResponse.json({ error: "Filename is required" }, { status: 400 });
    }

    // Prevent directory traversal
    const safeFilename = path.basename(filename);
    const filePath = path.join(UPLOADS_DIR, safeFilename);

    try {
      await fs.unlink(filePath);
      return NextResponse.json({ success: true, filename: safeFilename });
    } catch (e) {
      return NextResponse.json({ error: "File not found or already deleted" }, { status: 404 });
    }
  } catch (error) {
    console.error("Delete media error:", error);
    return NextResponse.json(
      { error: "Failed to delete file", details: String(error) },
      { status: 500 }
    );
  }
}
