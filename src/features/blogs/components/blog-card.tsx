"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { generateSlug } from "@/src/features/tours/utils/slugify";
import type { Blog } from "@/src/features/admin/blogs/types";

interface BlogCardProps {
  blog: Blog;
}

export function BlogCard({ blog }: BlogCardProps) {
  const locale = useLocale();
  // const t = useTranslations("BlogsPage");

  const words = (blog.content || "").trim().split(/\s+/).filter(Boolean).length;
  // const readTime = Math.max(3, Math.min(12, Math.ceil(words / 150) || 5));

  return (
    <Link
      href={`/${locale}/blogs/${generateSlug(blog.id, blog.title)}`}
      className="group block h-full cursor-pointer"
    >
      <article className="flex h-full flex-col overflow-hidden rounded-[20px] bg-white shadow-[0px_8px_24px_0px_rgba(52,59,85,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0px_12px_32px_0px_rgba(52,59,85,0.14)]">
        {/* Blog Image */}
        <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-gray-100">
          {blog.imageUrl ? (
            <Image
              src={blog.imageUrl}
              alt={blog.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(min-width: 1024px) 398px, (min-width: 640px) 50vw, 100vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-400">
              No image
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
          <div>
            {/* Read Time / Meta */}
            {/* <p className="font-[family-name:var(--font-dm-sans)] text-xs font-normal text-[#5B6B73] sm:text-[13px]">
              {readTime} {t("card.minRead")}
            </p> */}

            {/* Title */}
            <h2 className="mt-2.5 line-clamp-2 font-[family-name:var(--font-dm-sans)] text-[18px] font-bold leading-[1.3] text-[#343B55] transition-colors group-hover:text-[#198399] sm:text-[19px] lg:text-[20px]">
              {blog.title}
            </h2>
          </div>

          {/* Bottom Right Arrow Button */}
          <div className="mt-6 flex items-center justify-end">
            <span className="flex size-10 items-center justify-center rounded-full bg-[#343B55] text-white shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:bg-[#198399]">
              <ArrowRight size={18} />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
