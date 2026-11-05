"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";

import { useGetBlogsQuery } from "@/src/features/blogs/api/get-blogs";
import { BlogCard } from "./blog-card";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function BlogCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[20px] bg-white shadow-[0px_8px_24px_0px_rgba(52,59,85,0.08)]">
      <div className="aspect-[16/10] w-full animate-pulse bg-gray-200" />
      <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
        <div>
          <div className="mb-3 h-4 w-24 animate-pulse rounded bg-gray-200" />
          <div className="mb-2 h-6 w-3/4 animate-pulse rounded bg-gray-200" />
          <div className="h-6 w-1/2 animate-pulse rounded bg-gray-200" />
        </div>
        <div className="mt-6 flex justify-end">
          <div className="size-10 animate-pulse rounded-full bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

interface BlogsGridProps {
  searchQuery: string;
}

export function BlogsGrid({ searchQuery }: BlogsGridProps) {
  const [visibleCount, setVisibleCount] = useState(6);
  const { data: blogs, isLoading, error } = useGetBlogsQuery({ pageSize: 50 });
  const t = useTranslations("BlogsPage.grid");

  // Client-side filter
  const filteredBlogs = blogs?.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const visibleBlogs = filteredBlogs?.slice(0, visibleCount);
  const hasMore = (filteredBlogs?.length || 0) > visibleCount;

  const handleSeeMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <div className="pb-16 sm:pb-20 lg:pb-24">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => <BlogCardSkeleton key={i} />)
          : visibleBlogs?.map((blog) => (
              <motion.div
                key={blog.id}
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
              >
                <BlogCard blog={blog} />
              </motion.div>
            ))}
      </div>

      {!isLoading && (error || !filteredBlogs || filteredBlogs.length === 0) && (
        <div className="py-20 text-center font-[family-name:var(--font-dm-sans)] text-lg text-[#5B6B73]">
          {error ? t("error") : t("empty")}
        </div>
      )}

      {/* 'See More' button matching design */}
      {!isLoading && hasMore && (
        <div className="mt-12 flex justify-center sm:mt-14">
          <button
            type="button"
            onClick={handleSeeMore}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#343B55] px-9 py-3 font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[#343B55] transition-all duration-300 hover:bg-[#343B55] hover:text-white sm:px-11 sm:py-3.5 sm:text-base"
          >
            <span>{t("seeMore")}</span>
            <ArrowRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
