"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import type { AppLocale } from "@/src/i18n/locales";

export function TripsBreadcrumb() {
  const locale = useLocale() as AppLocale;
  const t = useTranslations("TripsPage.breadcrumb");

  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-8 text-center font-[family-name:var(--font-dm-sans)] text-sm sm:mb-10 sm:text-base lg:mb-12"
    >
      <Link
        href={`/${locale}`}
        className="text-[#5B6B73] transition-colors hover:text-[#343B55]"
      >
        {t("home")}
      </Link>
      <span className="mx-2 text-[#888888]">&gt;</span>
      <span className="font-medium text-[#343B55]">
        {t("trips")}
      </span>
    </nav>
  );
}
