"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import type { AppLocale } from "@/src/i18n/locales";

interface TripHeaderProps {
  tripName: string;
}

export function TripHeader({ tripName }: TripHeaderProps) {
  const locale = useLocale() as AppLocale;
  const t = useTranslations("TripDetails.breadcrumb");

  return (
    <nav className="bg-[#FAF7F2] py-4 sm:py-6" aria-label="Breadcrumb">
      <div className="mx-auto w-full max-w-[1360px] px-5 sm:px-8 lg:px-12">
        <div className="flex items-center gap-2 font-[family-name:var(--font-dm-sans)] text-xs sm:text-sm text-[#5B6B73]">
          <Link
            href={`/${locale}`}
            className="transition-colors hover:text-[#343B55]"
          >
            {t("home")}
          </Link>
          <span className="text-[#888888]">/</span>
          <Link
            href={`/${locale}/trips`}
            className="transition-colors hover:text-[#343B55]"
          >
            {t("trips")}
          </Link>
          <span className="text-[#888888]">/</span>
          <span className="line-clamp-1 font-medium text-[#343B55]">
            {tripName}
          </span>
        </div>
      </div>
    </nav>
  );
}
