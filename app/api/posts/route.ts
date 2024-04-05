import prisma from "@/lib/connect";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    //api/posts?cat="slug"

    const {searchParams} = new URL(req.url);
    const catSlug = searchParams.get("cat");

    //slug null || "react"
    const posts = await prisma.post.findMany({
        where:{
            ...(catSlug && catSlug !== "null" && catSlug !=="" && {catSlug})
        }
    });


    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
};
