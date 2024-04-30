"use client";

import { SyntheticEvent, useState } from "react";
import { Separator } from "./ui/separator";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useMutation } from "react-query";
import axios from "axios";
import { Comment } from "@prisma/client";
import { useComments } from "@/hooks/useComments";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { CommentWithUser } from "@/types";

export default function Comments({ postSlug }: { postSlug: string }) {
  const { status } = useSession();
  const [content, setcontent] = useState("");

  // Mutation to create a comment

  const createComment = (newComment: Partial<Comment>) => {
    return axios.post("/api/comments", newComment).then((res) => res.data);
  };

  const { mutate, isLoading } = useMutation(createComment, {
    onSuccess: (data: Comment) => {
      console.log("comment has been created", data);
    },
  });

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    mutate({ content, postSlug });
  };

  // Get all Comments

  const { data: comments, isFetching } = useComments(postSlug);

  return (
    <div className="mt-10">
      <Separator />
      <h2 className="text-2xl text-slate-500 font-semibold mt-4">Comments</h2>

      {/* Formulary */}

      <div className="mt-2 mb-6">
        {status === "authenticated" ? (
          <div className="">
            <Textarea
              placeholder="Write a comment..."
              onChange={(e) => setcontent(e.target.value)}
            />

            <Button
              disabled={content === ""}
              onClick={onSubmit}
              className="mt-4"
            >
              {isLoading ? "Posting comment..." : "Post"}
            </Button>
          </div>
        ) : (
          <Link href="/login" className="underline">
            Login to write a comment
          </Link>
        )}
      </div>

      {/* Comments list*/}

      {isFetching ? (
        <p>Loading comments ...</p>
      ) : (
        comments.map((comment: CommentWithUser) => (
          <div className="flex items-center" key={comment.id}>
            <Avatar>
              <AvatarImage src={comment.user.image || "img/124599.jpg"} />
              <AvatarFallback>{comment.user.name}</AvatarFallback>
            </Avatar>

            <div className="ml-3 p-4 rounded-lg border-slate-400">
              <div className="flex items-center gap-2">
                <span>{comment.user.name}</span>
                <span className="text-slate-500 text-sm">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            <p>{comment.content}</p>
          </div>
        ))
      )}
    </div>
  );
}
