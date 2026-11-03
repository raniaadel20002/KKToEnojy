"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { motion, type Variants } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

import { useTripsQuery } from "@/src/features/tours/api/get-trips";
import { TourCard } from "@/src/features/tours/components/tour-card";
import { CenteredSuccessToast } from "@/src/features/tours/components/centered-success-toast";
import type { Trip } from "@/src/features/tours/types/trip";
import type { AppLocale } from "@/src/i18n/locales";

// Animation Variants
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const cardContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function ToursSection() {
  const locale = useLocale() as AppLocale;
  const t = useTranslations("Tours");

  // Fetch full pool of trips to select a diverse mix across different types
  const { data: trips, isLoading } = useTripsQuery({
    pageSize: 45,
  });

  // Select a diverse mix across different trip categories
  const displayedTrips = useMemo(() => {
    if (!trips || trips.length === 0) return [];

    const preferredCategories = [
      "snorkelling",
      "culture excursions",
      "safari excursions",
      "diving",
      "water sports",
      "activities",
      "horse riding",
      "spa & massage",
      "transfer",
    ];

    const selected: Trip[] = [];
    const usedTypes = new Set<string>();

    // Pass 1: Select 1 trip from each preferred category in order
    for (const cat of preferredCategories) {
      if (selected.length >= 4) break;
      const match = trips.find((t) => {
        const typeNorm = (t.tripTypeName || "").trim().toLowerCase();
        return typeNorm.includes(cat) && !usedTypes.has(typeNorm);
      });
      if (match) {
        selected.push(match);
        usedTypes.add((match.tripTypeName || "").trim().toLowerCase());
      }
    }

    // Pass 2: Fill remaining slots with any unused trip types
    if (selected.length < 4) {
      for (const trip of trips) {
        if (selected.length >= 4) break;
        const typeNorm = (trip.tripTypeName || "").trim().toLowerCase();
        if (!usedTypes.has(typeNorm)) {
          selected.push(trip);
          usedTypes.add(typeNorm);
        }
      }
    }

    // Pass 3: Fallback to remaining trips if still under 4
    if (selected.length < 4) {
      for (const trip of trips) {
        if (selected.length >= 4) break;
        if (!selected.some((s) => s.id === trip.id)) {
          selected.push(trip);
        }
      }
    }

    return selected;
  }, [trips]);

  return (
    <section className="relative overflow-hidden bg-[#FAF7F2] py-16 md:py-24">
      {/* Content Container */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 mx-auto w-full px-4 sm:px-6 md:px-8 lg:max-w-[1340px]"
      >
        {/* Section Header */}
        <div className="mb-10 flex flex-col items-center text-center md:mb-14">
          <motion.h2
            variants={itemVariants}
            className="font-[family-name:var(--font-playfair)] text-3xl font-bold leading-tight text-[#343B55] md:text-4xl lg:text-[44px]"
          >
            {t("title")}
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-2 font-[family-name:var(--font-dm-sans)] text-sm font-normal text-[#5B6B73] md:text-base"
          >
            {t("subtitle")}
          </motion.p>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 117 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mt-3.5 h-2 w-[117px] rounded-[20px] bg-[#765438]"
          />
        </div>

        {/* Loading state skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-[490px] w-full animate-pulse rounded-[20px] border border-[#EDE7DC] bg-white p-5"
              >
                <div className="h-[210px] w-full rounded-t-[20px] bg-[#EDE7DC]/70" />
                <div className="mt-5 h-4 w-1/3 rounded bg-[#EDE7DC]/70" />
                <div className="mt-2.5 h-5 w-3/4 rounded bg-[#EDE7DC]/70" />
                <div className="mt-2 h-4 w-1/2 rounded bg-[#EDE7DC]/70" />
                <div className="mt-8 flex justify-between">
                  <div className="h-4 w-1/3 rounded bg-[#EDE7DC]/70" />
                  <div className="h-4 w-1/4 rounded bg-[#EDE7DC]/70" />
                </div>
                <div className="mt-5 flex flex-col gap-2.5">
                  <div className="h-11 rounded-[30px] bg-[#EDE7DC]/70" />
                  <div className="h-11 rounded-[30px] bg-[#EDE7DC]/70" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Trips Cards Grid */}
        {!isLoading && displayedTrips && displayedTrips.length > 0 && (
          <div>
            <motion.div
              variants={cardContainerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {displayedTrips.map((trip) => (
                <motion.div
                  key={trip.id}
                  variants={cardVariants}
                  className="h-full"
                >
                  <TourCard trip={trip} />
                </motion.div>
              ))}
            </motion.div>

            {/* Centered View More Button (Desktop & Mobile) */}
            <div className="mt-10 md:mt-12 flex justify-center w-full">
              <Link
                href={`/${locale}/trips`}
                className="inline-flex items-center justify-center gap-2 rounded-[30px] border-[1.5px] border-[#343B55] bg-transparent px-8 py-2.5 text-sm font-semibold text-[#343B55] transition-colors hover:bg-[#343B55] hover:text-white cursor-pointer"
              >
                <span>{t("viewMore")}</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && (!displayedTrips || displayedTrips.length === 0) && (
          <div className="py-20 text-center text-[#5B6B73]">
            <p className="text-base">{t("noTours")}</p>
          </div>
        )}
      </motion.div>

      {/* Centered Toast Feedback */}
      <CenteredSuccessToast />
    </section>
  );
}
