"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import type { AppLocale } from "@/src/i18n/locales";

export function Breadcrumb() {
  const locale = useLocale() as AppLocale;
  const t = useTranslations("GalleryPage.breadcrumb");

  return (
    <nav
      aria-label="Breadcrumb"
      className="bg-[#FAF7F2] py-6 font-[family-name:var(--font-dm-sans)] text-sm sm:py-8"
    >
      <div className="mx-auto w-full max-w-[1320px] px-4 text-center sm:px-8 lg:px-10">
        <div className="flex items-center justify-center gap-2">
          <Link
            href={`/${locale}`}
            className="text-[#5B6B73] transition-colors hover:text-[#343B55]"
          >
            {t("home")}
          </Link>
          <span className="text-[#888888]">&gt;</span>
          <span className="font-medium text-[#343B55]">{t("gallery")}</span>
        </div>
      </div>
    </nav>
  );
}
