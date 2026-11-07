"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion, type Variants } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { usePopularDestinationsQuery } from "@/src/features/destinations/api/get-popular-destinations";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

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
      delayChildren: 0.3,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function PopularDestinationsSection() {
  const { data: destinations, isLoading, error } = usePopularDestinationsQuery();
  const locale = useLocale();
  const t = useTranslations("PopularDestinations");

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Mouse drag-to-scroll state
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const hasMoved = useRef(false);
  const [isCursorGrabbing, setIsCursorGrabbing] = useState(false);

  const allDestinations = destinations ?? [];

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
  }, [checkScroll, allDestinations.length]);

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

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center bg-[#F8FDFF] py-20 text-gray-500">
        {t("loading")}
      </div>
    );
  }

  if (error || allDestinations.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-[#FAF7F2] py-16 md:py-20 lg:py-24">
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="mx-auto w-full max-w-[1320px] px-4 md:px-8 lg:px-10"
      >
        {/* Header Block */}
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

        {/* Horizontally Scrollable Carousel */}
        <div className="relative">
          {/* Navigation Arrows for Carousel */}
          {canScrollLeft && (
            <button
              type="button"
              onClick={() => scroll("left")}
              aria-label="Previous destinations"
              className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-[#343B55] shadow-[0px_8px_20px_rgba(14,74,104,0.18)] border border-[#EDE7DC] backdrop-blur-sm transition-all hover:bg-[#343B55] hover:text-white hover:scale-105 active:scale-95 cursor-pointer"
            >
              <ChevronLeft size={22} />
            </button>
          )}

          {canScrollRight && (
            <button
              type="button"
              onClick={() => scroll("right")}
              aria-label="Next destinations"
              className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-[#343B55] shadow-[0px_8px_20px_rgba(14,74,104,0.18)] border border-[#EDE7DC] backdrop-blur-sm transition-all hover:bg-[#343B55] hover:text-white hover:scale-105 active:scale-95 cursor-pointer"
            >
              <ChevronRight size={22} />
            </button>
          )}

          <motion.div
            ref={scrollContainerRef}
            variants={cardContainerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            onClickCapture={handleClickCapture}
            className={`flex gap-5 sm:gap-6 overflow-x-auto touch-pan-x overscroll-x-contain ${
              isCursorGrabbing
                ? "cursor-grabbing select-none snap-none scroll-auto"
                : "cursor-grab snap-x snap-mandatory scroll-smooth"
            } pt-2 pb-6 px-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
          >
            {allDestinations.map((dest) => (
              <motion.div
                key={dest.id}
                variants={cardVariants}
                className="group relative w-[280px] sm:w-[340px] md:w-[380px] lg:w-[400px] shrink-0 flex-none snap-start overflow-hidden rounded-[24px] [box-shadow:0px_14px_34px_0px_#0E4A6829]"
              >
                <Link
                  href={`/${locale}/trips?destinationId=${dest.id}`}
                  className="block cursor-pointer"
                  draggable={false}
                >
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={dest.imageUrl}
                      alt={dest.name}
                      fill
                      draggable={false}
                      className="object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none select-none"
                      sizes="(max-width: 640px) 280px, (max-width: 1024px) 380px, 400px"
                    />
                    {/* Gradient overlay for bottom text readability per Figma */}
                    <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#0E4A68]/90 via-[#0E4A68]/30 to-transparent transition-opacity duration-300 group-hover:from-[#0E4A68] group-hover:via-[#0E4A68]/40" />

                    {/* Hover CTA */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="rounded-full bg-white/20 px-5 py-2 text-sm font-semibold text-white backdrop-blur-sm ring-1 ring-white/40">
                        {t("exploreTrips")}
                      </span>
                    </div>

                    {/* Destination Name */}
                    <div className="absolute inset-x-0 bottom-6 text-center md:bottom-8">
                      <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-white transition-all duration-300 group-hover:-translate-y-2 md:text-3xl">
                        {dest.name.trim()}
                      </h3>
                      <span className="mx-auto mt-2 block h-1.5 w-10 rounded-[20px] bg-[#765438] transition-all duration-300 group-hover:-translate-y-2 sm:w-12" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* View More Button Centered at Bottom */}
        <motion.div
          variants={itemVariants}
          className="mt-10 md:mt-12 flex justify-center w-full"
        >
          <Link
            href={`/${locale}/Destinations`}
            className="inline-flex items-center justify-center gap-2 rounded-full border-[1.5px] border-[#343B55] bg-transparent px-8 py-2.5 text-sm font-semibold text-[#343B55] transition-colors hover:bg-[#343B55] hover:text-white cursor-pointer"
          >
            <span>{t("viewMore")}</span>
            <ArrowRight size={16} />
          </Link>
        </motion.div>

      </motion.div>
    </section>
  );
}
