"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import type { AppLocale } from "@/src/i18n/locales";

export function ContactBreadcrumb() {
  const locale = useLocale() as AppLocale;
  const t = useTranslations("ContactPage.breadcrumb");

  return (
    <nav
      aria-label="Breadcrumb"
      className="bg-[#FAF7F2] py-6 font-[family-name:var(--font-dm-sans)] text-sm sm:py-8 sm:text-base"
    >
      <div className="mx-auto w-full max-w-[1360px] px-5 text-center sm:px-8 lg:px-12">
        <div className="flex items-center justify-center gap-2">
          <Link
            href={`/${locale}`}
            className="text-[#5B6B73] transition-colors hover:text-[#343B55]"
          >
            {t("home")}
          </Link>
          <span className="text-[#888888]">&gt;</span>
          <span className="font-medium text-[#343B55]">{t("contact")}</span>
        </div>
      </div>
    </nav>
  );
}
