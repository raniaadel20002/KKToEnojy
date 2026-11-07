"use client";

import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useMemo, useRef, useState, useEffect, useCallback } from "react";
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

  const [visibleCount] = useState(8);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Mouse drag-to-scroll state
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const hasMoved = useRef(false);
  const [isCursorGrabbing, setIsCursorGrabbing] = useState(false);

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

    const TARGET_COUNT = 8;
    const selected: Trip[] = [];
    const usedTypes = new Set<string>();

    // Pass 1: Select 1 trip from each preferred category in order
    for (const cat of preferredCategories) {
      if (selected.length >= TARGET_COUNT) break;
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
    if (selected.length < TARGET_COUNT) {
      for (const trip of trips) {
        if (selected.length >= TARGET_COUNT) break;
        const typeNorm = (trip.tripTypeName || "").trim().toLowerCase();
        if (!usedTypes.has(typeNorm)) {
          selected.push(trip);
          usedTypes.add(typeNorm);
        }
      }
    }

    // Pass 3: Fallback to remaining trips if still under TARGET_COUNT
    if (selected.length < TARGET_COUNT) {
      for (const trip of trips) {
        if (selected.length >= TARGET_COUNT) break;
        if (!selected.some((s) => s.id === trip.id)) {
          selected.push(trip);
        }
      }
    }

    return selected;
  }, [trips]);

  const checkScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  }, []);

  useEffect(() => {
    checkScroll();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScroll, { passive: true });
      window.addEventListener("resize", checkScroll);
      return () => {
        container.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, [checkScroll, displayedTrips.length]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = scrollContainerRef.current.clientWidth * 0.75;
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0 || !scrollContainerRef.current) return;
    isDragging.current = true;
    hasMoved.current = false;
    startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeftStart.current = scrollContainerRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current || !scrollContainerRef.current) return;
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = x - startX.current;

    if (Math.abs(walk) > 5) {
      if (!hasMoved.current) {
        hasMoved.current = true;
        setIsCursorGrabbing(true);
      }
      e.preventDefault();
      scrollContainerRef.current.scrollLeft = scrollLeftStart.current - walk;
    }
  };

  const handleMouseUpOrLeave = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    setIsCursorGrabbing(false);
    setTimeout(() => {
      hasMoved.current = false;
    }, 50);
  };

  const handleClickCapture = (e: React.MouseEvent) => {
    if (hasMoved.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <section className="w-full bg-[#FAF7F2] py-16 md:py-20 lg:py-24">
      {/* Content Container matching Popular Destinations */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 mx-auto w-full max-w-[1320px] px-4 md:px-8 lg:px-10"
      >
        {/* Section Header */}
        <div className="mb-8 md:mb-12">
          <div className="flex flex-col items-center text-center">
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
              whileInView={{ width: 120 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="mt-3.5 h-2 w-[117px] rounded-[20px] bg-[#765438]"
            />
          </div>
        </div>

        {/* Loading state skeleton */}
        {isLoading && (
          <div className="flex gap-5 sm:gap-6 overflow-x-auto pb-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 md:pb-0">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="w-[280px] sm:w-[330px] shrink-0 flex-none md:w-auto h-[490px] animate-pulse rounded-[20px] border border-[#EDE7DC] bg-white p-5"
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

        {/* Trips Cards Grid / Mobile Horizontal Scroll */}
        {!isLoading && displayedTrips && displayedTrips.length > 0 && (
          <div>
            <div className="relative">
              {/* Navigation Arrows for Mobile Carousel */}
              {canScrollLeft && (
                <button
                  type="button"
                  onClick={() => scroll("left")}
                  aria-label="Previous tours"
                  className="md:hidden absolute -left-2 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-[#343B55] shadow-[0px_8px_20px_rgba(14,74,104,0.18)] border border-[#EDE7DC] backdrop-blur-sm transition-all hover:bg-[#343B55] hover:text-white cursor-pointer"
                >
                  <ChevronLeft size={20} />
                </button>
              )}

              {canScrollRight && (
                <button
                  type="button"
                  onClick={() => scroll("right")}
                  aria-label="Next tours"
                  className="md:hidden absolute -right-2 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-[#343B55] shadow-[0px_8px_20px_rgba(14,74,104,0.18)] border border-[#EDE7DC] backdrop-blur-sm transition-all hover:bg-[#343B55] hover:text-white cursor-pointer"
                >
                  <ChevronRight size={20} />
                </button>
              )}

              <motion.div
                ref={scrollContainerRef}
                variants={cardContainerVariants}
                initial="hidden"
                animate="show"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUpOrLeave}
                onMouseLeave={handleMouseUpOrLeave}
                onClickCapture={handleClickCapture}
                className={`flex gap-5 sm:gap-6 overflow-x-auto touch-pan-x overscroll-x-contain ${
                  isCursorGrabbing
                    ? "cursor-grabbing select-none snap-none scroll-auto"
                    : "cursor-grab snap-x snap-mandatory scroll-smooth"
                } pt-2 pb-6 px-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 md:pb-0 md:pt-0 md:px-0 md:overflow-visible md:cursor-default`}
              >
                {displayedTrips.map((trip) => (
                  <motion.div
                    key={trip.id}
                    variants={cardVariants}
                    className="w-[280px] sm:w-[330px] shrink-0 flex-none snap-start md:w-auto h-full"
                  >
                    <TourCard trip={trip} />
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Centered View More Button (Desktop & Mobile) */}
            <motion.div
              variants={itemVariants}
              className="mt-10 md:mt-12 flex justify-center w-full"
            >
              <Link
                href={`/${locale}/trips`}
                className="inline-flex items-center justify-center gap-2 rounded-[30px] border-[1.5px] border-[#343B55] bg-transparent px-8 py-2.5 text-sm font-semibold text-[#343B55] transition-colors hover:bg-[#343B55] hover:text-white cursor-pointer"
              >
                <span>{t("viewMore")}</span>
                <ArrowRight size={16} />
              </Link>
            </motion.div>
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
