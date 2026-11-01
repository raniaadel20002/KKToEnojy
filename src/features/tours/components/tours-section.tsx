"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

import { useTripTypesQuery } from "@/src/features/tours/api/get-trip-types";
import { useTripsQuery } from "@/src/features/tours/api/get-trips";
import { TourCard } from "@/src/features/tours/components/tour-card";
import { TripTypeFilter } from "@/src/features/tours/components/trip-type-filter";

// Animation Variants
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.2,
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
      staggerChildren: 0.15,
      delayChildren: 0.3, // Wait for header to finish
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, x: 50 },
  show: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function ToursSection() {
  const [selectedTypeId, setSelectedTypeId] = useState<number | null>(4);
  const locale = useLocale();
  const t = useTranslations("Tours");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);

  const { data: tripTypes, isLoading: isLoadingTypes } = useTripTypesQuery();
  
  const orderedTripTypes = useMemo(() => {
    if (!tripTypes) return null;
    const snorkelling = tripTypes.find(t => t.id === 4);
    const others = tripTypes.filter(t => t.id !== 4);
    return snorkelling ? [snorkelling, ...others] : tripTypes;
  }, [tripTypes]);

  const { data: trips, isLoading: isLoadingTrips } = useTripsQuery({
    typeId: selectedTypeId || undefined,
    pageSize: 6,
  });

  const isLoading = isLoadingTypes || isLoadingTrips;

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setDragDistance(0);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    scrollRef.current.scrollLeft = scrollLeft - walk;
    setDragDistance((prev) => prev + Math.abs(x - startX));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleClickCapture = (e: React.MouseEvent) => {
    // If user dragged more than 10 pixels, consider it a drag and prevent click
    if (dragDistance > 10) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#003A5A] py-16 md:py-20 lg:py-24">
      {/* Background SVG blob (heart shape) - static as requested */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center select-none">
        <svg
          width="1358"
          height="1167"
          viewBox="0 0 1439 690"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0 opacity-40"
        >
          <path
            d="M162.155 43.9913C307.731 -50.2367 494.621 171.149 683.05 174.182C922.868 178.041 1046.21 -106.593 1262.5 43.9913C1585.96 269.187 1414.38 730.376 1173.22 952.346C963.595 1145.28 694.515 1217.36 400.6 1046.59C152.973 902.714 6.0872 690.978 0.306083 428.467C-3.53066 254.248 27.4926 131.155 162.155 43.9913Z"
            fill="#FFFFFF1A"
          />
        </svg>
      </div>

      {/* Content */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 mx-auto w-full px-5 md:px-8 lg:max-w-[1400px] lg:px-10"
      >
        {/* Header */}
        <div className="mb-10 flex flex-col items-center text-center md:mb-12">
          <motion.p
            variants={itemVariants}
            className="font-[family-name:var(--font-montez)] text-[28px] leading-[160%] text-[#69DD84] md:text-[36px]"
          >
            {t("subtitle")}
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="mt-1 font-sans text-[32px] font-semibold leading-[160%] text-white md:text-[40px]"
          >
            {t("title")}
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 117 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="mt-2 h-2 bg-[#69DD84]"
          />
        </div>

        {/* Filters */}
        <motion.div
          variants={itemVariants}
          className="mb-8 flex justify-center"
        >
          {isLoadingTypes ? (
            <div className="text-white">{t("loadingFilters")}</div>
          ) : orderedTripTypes && orderedTripTypes.length > 0 ? (
            <TripTypeFilter
              tripTypes={orderedTripTypes}
              selectedTypeId={selectedTypeId}
              onSelectType={setSelectedTypeId}
            />
          ) : null}
        </motion.div>

        {/* Loading state */}
        {isLoading && (
          <div className="py-20 text-center text-white">
            <p>{t("loadingTours")}</p>
          </div>
        )}

        {/* Tours horizontal slider - drag/scroll on all devices */}
        {!isLoading && trips && trips.length > 0 && (
          <div className="flex flex-col gap-10">
            <motion.div
              key={selectedTypeId || "all"}
              variants={cardContainerVariants}
              initial="hidden"
              animate="show"
              ref={scrollRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onClickCapture={handleClickCapture}
              className={`flex gap-4 overflow-x-auto select-none pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:gap-6 ${
                isDragging ? "cursor-grabbing" : "cursor-grab"
              }`}
            >
              {trips.slice(0, 6).map((trip) => (
                <motion.div
                  key={trip.id}
                  variants={cardVariants}
                  className="w-[280px] shrink-0 md:w-[320px] lg:w-[340px]"
                >
                  <TourCard trip={trip} />
                </motion.div>
              ))}
            </motion.div>
            
            <div className="flex justify-center w-full px-4">
              <Link
                href={`/${locale}/trips`}
                className="w-full max-w-[280px] md:max-w-[320px] text-center rounded-full border border-white py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                {t("viewMore")}
              </Link>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && (!trips || trips.length === 0) && (
          <div className="py-20 text-center text-white">
            <p>{t("noTours")}</p>
          </div>
        )}
      </motion.div>
    </section>
  );
}
