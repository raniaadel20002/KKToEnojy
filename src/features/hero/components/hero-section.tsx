"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";

import { HeroContent } from "@/src/features/hero/components/hero-content";
import { HeroDestinationCard } from "@/src/features/hero/components/hero-destination-card";
import { HeroDestinationCards } from "@/src/features/hero/components/hero-destination-cards";
import { heroDestinations } from "@/src/features/hero/data/hero-destinations";
import { heroSlides } from "@/src/features/hero/data/hero-slides";

const SLIDE_INTERVAL_MS = 5000;
const TOTAL_SLIDES = heroSlides.length;

export function HeroSection() {
  const t = useTranslations("Hero");
  const [slideIndex, setSlideIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % TOTAL_SLIDES);
    }, SLIDE_INTERVAL_MS);
  }, []);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const handlePrev = useCallback(() => {
    setSlideIndex((prev) => (prev - 1 + TOTAL_SLIDES) % TOTAL_SLIDES);
    startTimer();
  }, [startTimer]);

  const handleNext = useCallback(() => {
    setSlideIndex((prev) => (prev + 1) % TOTAL_SLIDES);
    startTimer();
  }, [startTimer]);

  const handleCardClick = useCallback((targetSlideIndex: number) => {
    setSlideIndex(targetSlideIndex);
    startTimer();
  }, [startTimer]);

  const currentSlide = heroSlides[slideIndex];
  const localizedSlide = {
    subtitle: t(currentSlide.subtitleKey),
    title: t(currentSlide.titleKey),
    description: t(currentSlide.descriptionKey),
  };
  const localizedDestinations = heroDestinations.map((destination) => ({
    ...destination,
    label: t(`destinations.${destination.labelKey}`),
  }));
  const previousSlideLabel = t("controls.previousSlide");
  const nextSlideLabel = t("controls.nextSlide");
  const getDestinationViewLabel = (destination: string) =>
    t("destinationCards.view", { destination });

  return (
    <section
      aria-label={t("ariaLabel")}
      className="relative w-full overflow-hidden md:h-screen md:min-h-[700px]"
    >
      {/* ─── Background: all images stacked, only active one visible ───
          No AnimatePresence — avoids mounting two full-bleed images at once.
          CSS opacity transition is GPU-composited and much cheaper.        */}
      <div className="absolute inset-0 z-0">
        {heroSlides.map((slide, i) => (
          <div
            key={slide.id}
            className="absolute inset-0 transition-opacity duration-700 ease-in-out"
            style={{ opacity: i === slideIndex ? 1 : 0 }}
          >
            <Image
              src={slide.image}
              alt={t(slide.titleKey)}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        ))}
        {/* Overlays — rendered once, not per-slide */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/10" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* ═══════════════════════════════════════════
          DESKTOP (md+)
          ═══════════════════════════════════════════ */}

      {/* Text block — fade in only (no exit animation) */}
      <div className="absolute z-10 hidden md:block top-[110px] left-[80px] lg:top-[120px] lg:left-[80px]">
        <motion.div
          key={currentSlide.id + "-text"}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <HeroContent
            ctaLabel={t("cta")}
            nextSlideLabel={nextSlideLabel}
            onNext={handleNext}
            onPrev={handlePrev}
            previousSlideLabel={previousSlideLabel}
            slide={localizedSlide}
          />
        </motion.div>
      </div>

      {/* Destination cards */}
      <div className="absolute z-10 hidden md:flex items-end bottom-0 left-[42%] gap-[32px] pb-[61px]">
        {localizedDestinations.map((dest) => (
          <HeroDestinationCard
            key={dest.id}
            destination={dest}
            isActive={slideIndex === dest.slideIndex}
            onClick={() => handleCardClick(dest.slideIndex)}
            viewLabel={getDestinationViewLabel(dest.label)}
            variant="desktop"
          />
        ))}
      </div>

      {/* ═══════════════════════════════════════════
          MOBILE (< md)
          ═══════════════════════════════════════════ */}
      <div className="relative z-10 flex flex-col md:hidden">

        {/* Text content — no background box, directly on image */}
        <div className="px-5 pt-16 pb-8">
          <motion.div
            key={currentSlide.id + "-text-mobile"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <HeroContent
              ctaLabel={t("cta")}
              nextSlideLabel={nextSlideLabel}
              previousSlideLabel={previousSlideLabel}
              slide={localizedSlide}
            />
          </motion.div>
        </div>

        {/* Cards row with edge arrows */}
        <div className="relative pb-8">
          <HeroDestinationCards
            activeSlideIndex={slideIndex}
            destinations={localizedDestinations}
            getDestinationViewLabel={getDestinationViewLabel}
            nextSlideLabel={nextSlideLabel}
            onCardClick={handleCardClick}
            onNext={handleNext}
            onPrev={handlePrev}
            previousSlideLabel={previousSlideLabel}
          />
        </div>
      </div>
    </section>
  );
}
