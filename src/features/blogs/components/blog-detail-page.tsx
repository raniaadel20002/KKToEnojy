"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

import { useGetBlogQuery } from "@/src/features/blogs/api/get-blog";
import { useGetBlogsQuery } from "@/src/features/blogs/api/get-blogs";
import { extractIdFromSlug, generateSlug } from "@/src/features/tours/utils/slugify";
import type { AppLocale } from "@/src/i18n/locales";

import { BlogDetailContent } from "./blog-detail/blog-detail-content";
import { TableOfContents } from "./blog-detail/table-of-contents";
import { ShareStoryCard } from "./blog-detail/share-story-card";
import { RecentPosts } from "./blog-detail/recent-posts";

interface BlogDetailPageProps {
  slug: string;
}

export function BlogDetailPage({ slug }: BlogDetailPageProps) {
  const id = extractIdFromSlug(slug) ?? 0;
  const locale = useLocale() as AppLocale;
  const t = useTranslations("BlogDetails");

  const { data: blog, isLoading, error } = useGetBlogQuery(id);
  const { data: recentBlogs } = useGetBlogsQuery({ pageSize: 4, pageNumber: 1 });

  const [activeSection, setActiveSection] = useState<number | null>(null);

  useEffect(() => {
    if (blog && blog.title && id) {
      const expectedSlug = generateSlug(blog.id, blog.title);
      if (slug !== expectedSlug) {
        const newUrl =
          window.location.pathname.replace(slug, expectedSlug) + window.location.search;
        window.history.replaceState(null, "", newUrl);
      }
    }
  }, [blog, slug, id]);

  useEffect(() => {
    if (!blog?.blogSections || blog.blogSections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id.replace("section-", "");
            setActiveSection(Number(sectionId));
          }
        });
      },
      {
        rootMargin: "-20% 0px -35% 0px",
        threshold: 0.5,
      },
    );

    const sections = document.querySelectorAll("[id^='section-']");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [blog?.blogSections]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF7F2]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#0E4A68] border-t-transparent" />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#FAF7F2] px-5 text-center">
        <p className="mb-4 font-[family-name:var(--font-dm-sans)] text-xl text-red-500">
          {t("error")}
        </p>
        <Link
          href={`/${locale}/blogs`}
          className="font-[family-name:var(--font-dm-sans)] font-medium text-[#0E4A68] hover:underline"
        >
          &larr; {t("backToBlogs")}
        </Link>
      </div>
    );
  }

  const contentParagraphs = blog.content
    ? blog.content.split("\n\n").filter((p) => p.trim())
    : [];
  const leadExcerpt = contentParagraphs[0] || "";

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <main className="mx-auto w-full max-w-[1360px] px-5 pb-20 pt-4 sm:px-8 sm:pb-24 sm:pt-6 lg:px-12 lg:pb-28">
        {/* 1. Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="py-5 font-[family-name:var(--font-dm-sans)] text-sm sm:py-7 sm:text-base"
        >
          <div className="flex items-center gap-2">
            <Link
              href={`/${locale}`}
              className="text-[#5B6B73] transition-colors hover:text-[#343B55]"
            >
              {t("breadcrumb.home")}
            </Link>
            <span className="text-[#888888]">&gt;</span>
            <Link
              href={`/${locale}/blogs`}
              className="text-[#5B6B73] transition-colors hover:text-[#343B55]"
            >
              {t("breadcrumb.blogs")}
            </Link>
            <span className="text-[#888888]">&gt;</span>
            <span className="line-clamp-1 font-medium text-[#343B55]">
              {blog.title || t("breadcrumb.details")}
            </span>
          </div>
        </nav>

        {/* 2. Title & Excerpt Header + Share Card */}
        <div className="flex flex-col gap-6 pb-6 sm:pb-8 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          <div className="max-w-[780px]">
            <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-bold leading-[1.15] text-[#343B55] sm:text-4xl md:text-5xl lg:text-[52px]">
              {blog.title}
            </h1>

            {leadExcerpt && (
              <p className="mt-4 font-[family-name:var(--font-dm-sans)] text-base font-normal leading-[1.65] text-[#5B6B73] sm:text-lg">
                {leadExcerpt}
              </p>
            )}
          </div>

          {/* Desktop Share Card */}
          <div className="hidden shrink-0 lg:block">
            <ShareStoryCard title={blog.title} />
          </div>
        </div>

        {/* Mobile Share Card */}
        <div className="mb-6 block lg:hidden">
          <ShareStoryCard title={blog.title} />
        </div>

        {/* 3. Main Featured Hero Image */}
        {blog.imageUrl && (
          <div className="relative aspect-[16/8] max-h-[560px] w-full overflow-hidden rounded-[20px] bg-gray-100 shadow-[0px_8px_24px_0px_rgba(52,59,85,0.08)]">
            <Image
              src={blog.imageUrl}
              alt={blog.title}
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1360px) 1280px, 100vw"
            />
          </div>
        )}

        {/* Mobile Table of Contents */}
        {blog.blogSections && blog.blogSections.length > 0 && (
          <div className="mt-8 block lg:hidden">
            <TableOfContents
              sections={blog.blogSections}
              activeSection={activeSection}
            />
          </div>
        )}

        {/* 4. Story Layout: Left Sidebar (TOC) + Right Story Content */}
        <div className="mt-10 items-start sm:mt-14 lg:grid lg:grid-cols-[280px_1fr] lg:gap-12 xl:gap-16">
          {/* Left Column: Sticky Table of Contents on Desktop */}
          <aside className="sticky top-28 hidden lg:block">
            <TableOfContents
              sections={blog.blogSections}
              activeSection={activeSection}
            />
          </aside>

          {/* Right Column: Story Sections */}
          <div className="min-w-0">
            <BlogDetailContent blog={blog} />
          </div>
        </div>

        {/* 5. Recent Posts Section */}
        <RecentPosts blogs={recentBlogs || []} currentBlogId={blog.id} />
      </main>
    </div>
  );
}
