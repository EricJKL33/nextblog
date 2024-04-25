"use client";

import { useState } from "react";
import { Separator } from "./ui/separator";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Comments() {
  const { status } = useSession();
  const [content, setcontent] = useState("");

  const onSubmit = () => {
    
  };

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
              Add your comment
            </Button>
          </div>
        ) : (
          <Link href="/login" className="underline">
            Login to write a comment
          </Link>
        )}
      </div>

      {/* Comments list*/}

    </div>
  );
}
