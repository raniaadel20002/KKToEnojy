import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { generateSlug } from "@/src/features/tours/utils/slugify";
import type { Blog } from "@/src/features/admin/blogs/types";

interface HomeBlogCardProps {
  blog: Blog;
}

export function HomeBlogCard({ blog }: HomeBlogCardProps) {
  const locale = useLocale();
  const t = useTranslations("Blogs");

  return (
    <Link href={`/${locale}/blogs/${generateSlug(blog.id, blog.title)}`}>
      <article className="group flex h-full flex-col overflow-hidden rounded-[20px] bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
        {/* Image */}
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          {blog.imageUrl ? (
            <Image
              src={blog.imageUrl}
              alt={blog.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="h-full w-full bg-gray-200" />
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-6">
          {/* Title */}
          <h3 className="mb-6 line-clamp-2 text-lg font-semibold leading-[1.4] text-[var(--color-deep-ocean)] transition-colors group-hover:text-[var(--color-ocean)] md:text-xl">
            {blog.title}
          </h3>

          {/* Read More Button */}
          <div className="mt-auto flex justify-end">
            <button
              type="button"
              className="rounded-full border border-[var(--color-deep-ocean)] px-8 py-2 text-sm font-medium text-[var(--color-deep-ocean)] transition-all hover:bg-[var(--color-deep-ocean)] hover:text-white md:text-base"
            >
              {t("readMore")}
            </button>
          </div>
        </div>
      </article>
    </Link>
  );
}
