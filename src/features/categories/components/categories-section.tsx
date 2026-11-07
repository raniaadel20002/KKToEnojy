"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

import { useTripTypesQuery } from "@/src/features/categories/api/get-trip-types";
import { CategoryCard } from "@/src/features/categories/components/category-card";
import type { TripType } from "@/src/features/categories/types/trip-type";

export function CategoriesSection() {
  const { data: rawTripTypes, isLoading, error } = useTripTypesQuery();
  const locale = useLocale();
  const t = useTranslations("Categories");

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(media.matches);

    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  const tripTypes = useMemo(() => {
    if (!rawTripTypes || rawTripTypes.length === 0) return null;

    // Retain the first 4 existing categories
    const existing = rawTripTypes.slice(0, 4);
    const existingIds = new Set(existing.map((t) => t.id));

    // Specifically find Snorkeling and Safari from the API data
    const snorkeling = rawTripTypes.find(
      (t) =>
        !existingIds.has(t.id) &&
        (/snorkel/i.test(t.name) || t.id === 4)
    );
    if (snorkeling) existingIds.add(snorkeling.id);

    const safari = rawTripTypes.find(
      (t) =>
        !existingIds.has(t.id) &&
        (/safari/i.test(t.name) || t.id === 5)
    );
    if (safari) existingIds.add(safari.id);

    const result = [...existing];
    if (snorkeling) result.push(snorkeling);
    if (safari) result.push(safari);

    // Fallback: if either category was not matched specifically, fill up to 6 from rawTripTypes
    if (result.length < 6) {
      for (const item of rawTripTypes) {
        if (result.length >= 6) break;
        if (!result.some((r) => r.id === item.id)) {
          result.push(item);
        }
      }
    }

    return result;
  }, [rawTripTypes]);

  if (isLoading) {
    return (
      <section className="bg-[#343B55] py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-5 text-center">
          <p className="text-white/70">{t("loading")}</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-[#343B55] py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-5 text-center">
          <p className="text-red-300">{t("error")}</p>
        </div>
      </section>
    );
  }

  if (!tripTypes || tripTypes.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#343B55] py-14 sm:py-20 lg:py-24 overflow-hidden">
      <div className="mx-auto w-full  px-4 sm:px-6 lg:max-w-[1360px] lg:px-8">
        {/* Header Section:
            - Heading: #FFFFFF Bold
            - Subtitle: #FFFFFF (9pt Regular)
            - Decorative underline: #198399 radius 20px
        */}
        <div className="mb-10 sm:mb-14  lg:mb-16 text-center">
          <h2 className="font-[family-name:var(--font-playfair)] text-[34px] sm:text-[44px] lg:text-[52px] font-bold text-white tracking-tight leading-tight">
            {t("title")}
          </h2>
          <p className="mt-2 font-[family-name:var(--font-dm-sans)] text-[13px] sm:text-[15px] lg:text-[16px] text-white/90 max-w-xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
          <div
            className="mx-auto mt-3 h-1.5 sm:h-2 w-[117px] rounded-[20px] bg-[#198399]"
            aria-hidden="true"
          />
        </div>

        {/* Categories Cards Grid:
            - Desktop: 3 columns in 2 rows with responsive rotations
            - Responsive / Mobile: 2 columns in 3 rows with responsive rotations
        */}
        <div className="relative">
          {/* Desktop 3-column Layout (2 rows for 6 cards) */}
          <div className="hidden lg:grid grid-cols-3 gap-x-8 lg:gap-x-12 xl:gap-x-14 gap-y-12 lg:gap-y-16 max-w-[1040px] xl:max-w-[1140px] mx-auto pt-6 pb-6">
            {tripTypes.map((tripType, index) => (
              <CategoryCard
                key={tripType.id}
                tripType={tripType}
                index={index}
                isDesktop={true}
              />
            ))}
          </div>

          {/* Mobile / Tablet 2-column Layout (3 rows for 6 cards) */}
          <div className="grid grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-10 sm:gap-y-12 max-w-[440px] sm:max-w-[560px] mx-auto pt-5 pb-3 lg:hidden">
            {tripTypes.map((tripType, index) => (
              <CategoryCard
                key={tripType.id}
                tripType={tripType}
                index={index}
                isDesktop={false}
              />
            ))}
          </div>
        </div>

        {/* CTA Button:
            - Background: #198399
            - Text and color: #FFFFFF SemiBold
            - Radius: 30px
        */}
        <div className="mt-12 sm:mt-16 flex justify-center">
          <Link
            href={`/${locale}/trips`}
            className="group inline-flex items-center gap-2.5 rounded-[30px] bg-[#198399] px-7 sm:px-9 py-3 sm:py-3.5 text-sm sm:text-base font-semibold text-white shadow-md hover:bg-[#146b7d] hover:shadow-lg transition-all active:scale-[0.98]"
          >
            <span>{t("viewAll")}</span>
            <span className="relative flex h-3.5 w-3.5 items-center justify-center transition-transform group-hover:translate-x-1">
              <Image
                src="/Categories/Vector (1).svg"
                alt=""
                width={10}
                height={8}
                className="h-auto w-auto"
              />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
