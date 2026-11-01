
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

import type { TripType } from "@/src/features/categories/types/trip-type";

interface CategoryCardProps {
  tripType: TripType;
  index: number;
}

export function CategoryCard({
  tripType,
  index,
}: CategoryCardProps) {
  const locale = useLocale();
  const t = useTranslations("Categories");
  return (
    <Link href={`/${locale}/trips?typeId=${tripType.id}`} className="block" draggable={false}>
      <motion.div
        whileHover={{
          scale: 1.04,
          transition: { duration: 0.25 },
        }}
        className="group relative h-[320px] w-full shrink-0 cursor-pointer select-none overflow-hidden rounded-[24px] md:h-[380px]"
      >
        <Image
          src={tripType.imageUrl}
          alt={tripType.name}
          fill
          draggable={false}
          sizes="(max-width: 768px) 280px, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/30" />

        {/* Hover CTA */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="rounded-full bg-white/25 px-5 py-2 text-sm font-semibold text-white backdrop-blur-sm ring-1 ring-white/50">
            {t("exploreTrips")}
          </span>
        </div>

        {/* Label pill at bottom center */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-max max-w-[90%] rounded-full bg-white px-5 py-2 shadow-md transition-all duration-300 group-hover:shadow-lg">
          <span className="block truncate text-center text-sm font-semibold text-[var(--color-deep-ocean)] md:text-base">
            {tripType.name}
          </span>
        </div>
      </motion.div>
    </Link>
  );
}
