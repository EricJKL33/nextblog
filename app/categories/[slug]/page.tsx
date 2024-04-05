"use client";

import PageContainer from "@/components/page-container";
import PageTitle from "@/components/page-title";
import PostsList from "@/components/posts-list";
import { usePosts } from "@/hooks/usePosts";

type Props = {
  params: {
    slug: string;
  };
};

export default function CategoriesPage({ params }: Props) {
  const { slug } = params;

  const { data: posts, isFetching } = usePosts(slug);

  return (
    <PageContainer>
      <div className="py-10 px-4">
        <PageTitle title={slug.replace("-", " ")} />
        {!isFetching && <PostsList posts={posts} />}
      </div>
    </PageContainer>
  );
}
