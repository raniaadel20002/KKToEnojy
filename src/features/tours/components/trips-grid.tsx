"use client";

import type { Trip } from "@/src/features/tours/types/trip";
import { TourCard } from "@/src/features/tours/components/tour-card";
import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";

interface TripsGridProps {
  trips: Trip[];
  isLoading: boolean;
  error: Error | null;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export function TripsGrid({ trips, isLoading, error }: TripsGridProps) {
  const t = useTranslations("TripsPage.grid");

  if (error) {
    return (
      <div className="flex w-full items-center justify-center rounded-[20px] bg-red-50/80 p-8 text-center text-sm font-medium text-red-600">
        <p>{t("error")}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-[490px] w-full animate-pulse rounded-[20px] bg-[#e6dfd5]/60 shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
          />
        ))}
      </div>
    );
  }

  if (trips.length === 0) {
    return (
      <div className="flex w-full flex-col items-center justify-center rounded-[20px] border border-dashed border-[#EDE7DC] bg-white/60 py-16 text-center">
        <p className="font-[family-name:var(--font-dm-sans)] text-lg font-medium text-[#343B55]">
          {t("noTripsTitle")}
        </p>
        <p className="mt-1 font-[family-name:var(--font-dm-sans)] text-sm text-[#5B6B73]">
          {t("noTripsDescription")}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8">
      {trips.map((trip) => (
        <motion.div
          key={trip.id}
          variants={cardVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          <TourCard trip={trip} />
        </motion.div>
      ))}
    </div>
  );
}
