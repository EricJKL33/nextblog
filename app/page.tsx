"use client";

import PageContainer from "@/components/page-container";
import PostsList from "@/components/posts-list";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { usePosts } from "@/hooks/usePosts";
import { useCategories } from "@/hooks/useCategories";
import { Category } from "@prisma/client";

export default function Home() {
  //get Posts from db
  const { data: posts, isFetching, error } = usePosts();
  const {data: categories} = useCategories();

  return (
    <PageContainer>
      <div className="py-10 px-4">
        {/* 1st section */}
        <div
          style={{
            backgroundImage: "url(/img/mitchell-luo-FWoq_ldWlNQ-unsplash.jpg)",
          }}
          className="rounded-lg aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover"
        >
          <div className="h-full w-full flex flex-col justify-center items-center">
            <div className="sm:max-w-xl max-w-xs bg-secondary/80 p-4 rounded-lg ">
              <h1 className="text-center font-bold text-3x1 sm:text-5xl text-black dark:text-white">
                Become A Better React Developper
              </h1>
              <Input
                type="email"
                placeholder="Email"
                className="dark:bg-white mt-4"
              />
              <Button size="lg" className="w-full py-6 text-xl mt-4">
                Subscribe to our Newsletter
              </Button>
            </div>
          </div>
        </div>
        {/* Categories section */}
        <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center items-center">
          {categories?.map((category: Category) => (
            <Button variant="outline" key={category.id}>
              <Link href={`/categories/${category.slug}`}>{category.title}</Link>
            </Button>
          ))}
        </div>
        {/* Posts section */}
        {!isFetching && <PostsList posts={posts} />}
      </div>
    </PageContainer>
  );
}
