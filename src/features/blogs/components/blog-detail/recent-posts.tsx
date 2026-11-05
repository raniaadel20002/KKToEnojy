"use client";

import { useTranslations } from "next-intl";
import type { Blog } from "@/src/features/admin/blogs/types";
import { BlogCard } from "../blog-card";

interface RecentPostsProps {
  blogs: Blog[];
  currentBlogId: number;
}

export function RecentPosts({ blogs, currentBlogId }: RecentPostsProps) {
  const t = useTranslations("BlogDetails.recentPosts");
  const filteredBlogs = blogs.filter((blog) => blog.id !== currentBlogId).slice(0, 3);

  if (filteredBlogs.length === 0) {
    return null;
  }

  return (
    <section className="mt-20 sm:mt-24 lg:mt-28">
      <div className="text-center">
        <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#343B55] sm:text-4xl">
          {t("title")}
        </h2>
        <div className="mx-auto mt-3 h-[3px] w-14 rounded-full bg-[#765438]" />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {filteredBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </section>
  );
}
