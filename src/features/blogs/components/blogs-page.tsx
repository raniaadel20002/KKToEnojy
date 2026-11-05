"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { AppLocale } from "@/src/i18n/locales";

import { BlogsGrid } from "./blogs-grid";
import { BlogsHero } from "./blogs-hero";

export function BlogsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const locale = useLocale() as AppLocale;
  const t = useTranslations("BlogsPage");

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* 1. Hero Section */}
      <BlogsHero />

      {/* 2. Main Content */}
      <main className="mx-auto w-full max-w-[1360px] px-5 sm:px-8 lg:px-12">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="py-6 font-[family-name:var(--font-dm-sans)] text-sm sm:py-8 sm:text-base"
        >
          <div className="flex items-center justify-center gap-2">
            <Link
              href={`/${locale}`}
              className="text-[#5B6B73] transition-colors hover:text-[#343B55]"
            >
              {t("breadcrumb.home")}
            </Link>
            <span className="text-[#888888]">&gt;</span>
            <span className="font-medium text-[#343B55]">
              {t("breadcrumb.blogs")}
            </span>
          </div>
        </nav>

        {/* Search Bar */}
        <div className="mx-auto mb-10 w-full max-w-[1240px] sm:mb-12">
          <div className="relative w-full">
            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-[#888888] sm:left-6"
              size={20}
            />
            <input
              type="text"
              placeholder={t("search.placeholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-[#E5E7EB] bg-white py-3.5 pl-14 pr-6 font-[family-name:var(--font-dm-sans)] text-sm text-[#343B55] placeholder-[#888888] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.04)] outline-none transition-all focus:border-[#0E4A68] focus:ring-1 focus:ring-[#0E4A68] sm:py-4 sm:pl-16 sm:text-base"
            />
          </div>
        </div>

        {/* 3. Blogs Grid (Popular tags section omitted per user request) */}
        <BlogsGrid searchQuery={searchQuery} />
      </main>
    </div>
  );
}
