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
import { SyntheticEvent, useLayoutEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { Button } from "@/components/ui/button";
import { useMutation } from "react-query";
import axios from "axios";
import { Post } from "@/types";
import { slugify } from "../utils/slugify";
import Image from "next/image";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

export default function WritePage() {
  const [title, setTitle] = useState("");

  const [catSlug, setCatSlug] = useState("");
  const [content, setContent] = useState("");

  const [file, setFile] = useState<File>();
  const [imageObjectUrl, setImageObjectUrlFile] = useState<String | null>(null);

  const { data: categories, isFetching } = useCategories();

  const router = useRouter();

  const createdPost = (newPost: Partial<Post>) =>
    axios.post("/api/posts", newPost).then((response) => response.data);

  const { mutate, isLoading } = useMutation(createdPost, {
    onSuccess: (data: Post) => {
      console.log("data on success", data);
      router.push(`/posts/${data.slug}`);
    },
  });

  const { data: session } = useSession();

  useLayoutEffect(() => {
    if (!session) {
      router.replace("/login");
    }
  }, [router, session]);

  const onChangeFile = (e: SyntheticEvent) => {
    const files = (e.target as HTMLInputElement).files;

    if (!files || !files[0]) return;

    setFile(files[0]);
    setImageObjectUrlFile(URL.createObjectURL(files[0]));
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const image = await uploadImage();
    console.log("image is", image);
    if (title !== " " && content !== "" && catSlug !== "" && image) {
      mutate({
        title,
        content,
        catSlug,
        slug: slugify(title),
        image,
      });
    }
  };

  const uploadImage = async () => {
    try {
      if (!file) return;
      const data = new FormData();
      data.set("file", file);

      const response = await axios.post("/api/upload", data);
      return response.data; // /image/123123_name.jpg
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };

  return (
    <PageContainer>
      <div className="py-10 ">
        <PageTitle title="write a Post" />

        <div className="mb-6">
          {imageObjectUrl && (
            <div className="relative w-40 h-40 mx-auto mb-2">
              <Image src={imageObjectUrl as string} fill alt={title} />
            </div>
          )}
          <Input type="file" name="image" onChange={onChangeFile} />
        </div>

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

        <Button disabled={isLoading} className="mt-6" onClick={handleSubmit}>
          {isLoading ? "Creating your article" : "Publish"}
        </Button>
      </div>
    </PageContainer>
  );
}
