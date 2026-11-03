"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";
import { generateSlug } from "@/src/features/tours/utils/slugify";
import type { Blog } from "@/src/features/admin/blogs/types";

interface HomeBlogCardProps {
  blog: Blog;
  index?: number;
}


export function HomeBlogCard({ blog }: HomeBlogCardProps) {
  const locale = useLocale();
  
  return (
    <Link
      href={`/${locale}/blogs/${generateSlug(blog.id, blog.title)}`}
      className="group block h-full cursor-pointer"
    >
      <article className="flex h-full flex-col overflow-hidden rounded-[16px] bg-white shadow-[0px_8px_24px_0px_rgba(14,74,104,0.16)] transition-all duration-300 group-hover:-translate-y-1.5 hover:-translate-y-1.5">
        {/* Blog Image */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
          {blog.imageUrl ? (
            <Image
              src={blog.imageUrl}
              alt={blog.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
            />
          ) : (
            <div className="h-full w-full bg-gray-200" />
          )}
        </div>

        {/* Content Body */}
        <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
          <div>
            {/* Title */}
            <h3 className="mt-2 font-[family-name:var(--font-dm-sans)] text-[15px] font-bold leading-snug text-[#343B55] line-clamp-2 transition-colors group-hover:text-[#198399] sm:text-base">
              {blog.title}
            </h3>
          </div>

          {/* Bottom Right Arrow Button */}
          <div className="mt-4 flex items-center justify-end">
            <span className="flex size-9 items-center justify-center rounded-full bg-[#343B55] text-white shadow-sm transition-all duration-300 group-hover:bg-[#198399] group-hover:scale-105 sm:size-10">
              <ArrowRight size={17} />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
