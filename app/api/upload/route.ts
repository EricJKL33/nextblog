import { writeFile } from "fs/promises";
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const data = await req.formData();
  const file: File | null = data.get("file") as unknown as File;

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const dirPath = path.join(process.cwd(), "/public/images");
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  const imageUrl = `/images/${new Date().getTime()}_${file.name}`;
  const imagePath = path.join(process.cwd(), `/public${imageUrl}`);

  try {
    await writeFile(imagePath, buffer);
    return NextResponse.json( imageUrl , { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
