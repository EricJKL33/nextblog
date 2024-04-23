"use client";

import PageContainer from "@/components/page-container";
import PageTitle from "@/components/page-title";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategories } from "@/hooks/useCategories";
import { Category } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Button } from "@/components/ui/button";

export default function WritePage() {
  const [title, setTitle] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [content, setContent] = useState("");

  const { data: categories, isFetching } = useCategories();

  const { data: session } = useSession();

  const router = useRouter();

  if (!session) {
    router.replace("/login");
  }

  const handleSubmit = () => {};

  return (
    <PageContainer>
      <div className="py-10 ">
        <PageTitle title="write a Post" />

        <Input
          type="text"
          placeholder="Title"
          className="mb-6"
          onChange={(e) => setTitle(e.target.value)}
        />

        {isFetching ? (
          <p>Loading categories</p>
        ) : (
          <Select onValueChange={(value) => setCatSlug(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category"></SelectValue>
            </SelectTrigger>
            <SelectContent>
              {categories.map((category: Category) => (
                <SelectItem key={category.id} value={category.slug}>
                  {category.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        <ReactQuill
          className="mt-6"
          placeholder="Write your post here"
          value={content}
          onChange={setContent}
        />

        <Button className="mt-6" onClick={handleSubmit}>Publish</Button>
      </div>
    </PageContainer>
  );
}
