import { Post } from "@/types";
import { NextResponse } from "next/server";
import prisma from "@/lib/connect";

// const POST: Post = {
//   id: 1,
//   category: "React",
//   title: "React State Management: Choosing the Right Solution",
//   image: "/react-state-management.jpg",
//   caption:
//     "Explore different state management solutions in React and choose the one that fits your needs.",
//   date: "2023-01-15",
//   minutesToRead: 10,
//   author: "John ReactDev",
//   nbViews: 25,
//   nbComments: 8,
//   slug: "react-state-management-choosing-right-solution",
//   content:
//     "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
// };

// Get Single Post

export const GET = async (
  req: Request,
  { params }: { params: { slug: string } }
) => {
  const { slug } = params;

  //api/posts/react/react-navigation
  //slug en params
  // -> db -> post

  try {
    const post = await prisma.post.update({
      where: { slug },
      data: {
        view: {
          increment: 1,
        },
      }
    });
    return NextResponse.json(post, { status: 200 });
  } catch (error) {

    return NextResponse.json(
      { error: "Something went wrong!" },
      { status: 500 }
    );
  }
};
