"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";

import { useDestinationsQuery } from "@/src/features/categories/api/get-destinations";
import type { AppLocale } from "@/src/i18n/locales";

// Animation Variants
const heroContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const heroItemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const gridContainerVariants: Variants = {
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

function DestinationCardSkeleton() {
  return (
    <div className="aspect-[4/3] w-full animate-pulse rounded-[24px] bg-[#e6dfd5]/60 shadow-[0_4px_16px_rgba(0,0,0,0.04)]" />
  );
}

export function DestinationsPage() {
  const { data: destinations, isLoading } = useDestinationsQuery(false);
  const locale = useLocale() as AppLocale;
  const t = useTranslations("DestinationsPage");

  return (
    <>
      {/* Hero Section */}
      <section className="relative flex min-h-[380px] w-full items-center overflow-hidden sm:min-h-[440px] lg:min-h-[500px]">
        {/* Hero Background Image */}
        <Image
          src="/Distinations/main.png"
          alt={t("hero.imageAlt")}
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-[75%_center] md:object-center"
        />

        {/* Hero Text Content */}
        <div className="relative z-10 mx-auto w-full max-w-[1320px] px-4 py-16 sm:px-8 sm:py-20 md:py-24 lg:px-12">
          <motion.div
            variants={heroContainerVariants}
            initial="hidden"
            animate="show"
            className="max-w-[620px]"
          >
            <motion.h1
              variants={heroItemVariants}
              className="font-[family-name:var(--font-playfair)] text-3xl font-bold leading-[1.15] text-white sm:text-4xl md:text-5xl lg:text-[52px]"
            >
              {t("hero.title")}
            </motion.h1>
            <motion.p
              variants={heroItemVariants}
              className="mt-3.5 max-w-[500px] font-[family-name:var(--font-dm-sans)] text-sm font-normal leading-[1.6] text-white/95 sm:mt-5 sm:text-base md:text-lg"
            >
              {t("hero.subtitle")}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="w-full bg-[#FAF7F2] pb-20 pt-8 sm:pb-24 sm:pt-10 md:pb-28 md:pt-12">
        <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-8 lg:px-10">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-8 text-center font-[family-name:var(--font-dm-sans)] text-sm sm:mb-10 sm:text-base lg:mb-12"
          >
            <Link
              href={`/${locale}`}
              className="text-[#5B6B73] transition-colors hover:text-[#343B55]"
            >
              {t("breadcrumb.home")}
            </Link>
            <span className="mx-2 text-[#888888]">&gt;</span>
            <span className="font-medium text-[#343B55]">
              {t("breadcrumb.destinations")}
            </span>
          </nav>

          {/* Cards Grid */}
          <motion.div
            key={isLoading ? "loading" : "loaded"}
            variants={gridContainerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8"
          >
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                <DestinationCardSkeleton key={i} />
              ))
              : destinations?.map((destination) => (
                <motion.div key={destination.id} variants={cardVariants}>
                  <Link
                    href={`/${locale}/trips?destinationId=${destination.id}`}
                    className="group relative isolate block aspect-[4/3] w-full min-w-0 cursor-pointer overflow-hidden rounded-[24px] [box-shadow:0px_14px_34px_0px_#0E4A6829] transition-transform duration-300 hover:-translate-y-1.5"
                  >
                    <Image
                      src={destination.imageUrl}
                      alt={t("card.destinationAlt", { name: destination.name })}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />

                    {/* Gradient overlay for bottom text */}
                    <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#0E4A68]/90 via-[#0E4A68]/30 to-transparent transition-opacity duration-300 group-hover:from-[#0E4A68] group-hover:via-[#0E4A68]/40 " />

                    
                    {/* Trips Count Badge */}
                    
                    {/* <span className="absolute right-4 top-4 z-10 rounded-[30px] bg-white px-4 py-1.5 font-[family-name:var(--font-dm-sans)] text-xs font-semibold leading-none text-[#343B55] shadow-sm sm:right-5 sm:top-5 sm:text-sm">
                    {destination.tripsCount === 1
                      ? t("card.tripsSingular", { count: destination.tripsCount })
                      : t("card.trips", { count: destination.tripsCount ?? 0 })}
                    </span>  */}
                    

                    {/* Destination Name */}
                    <div className="absolute inset-x-4 bottom-6 text-center md:bottom-8">
                      <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-white drop-shadow-md transition-transform duration-300 group-hover:-translate-y-1 sm:text-3xl lg:text-[32px]">
                        {destination.name.trim()}
                      </h2>
                    </div>
                  </Link>
                </motion.div>
              ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
