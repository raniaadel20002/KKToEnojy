"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { usePopularDestinationsQuery } from "@/src/features/destinations/api/get-popular-destinations";
import { ArrowRight } from "lucide-react";

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

  const displayedDestinations = destinations?.slice(0, 3) ?? [];

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center bg-[#F8FDFF] py-20 text-gray-500">
        {t("loading")}
      </div>
    );
  }

  if (error || displayedDestinations.length === 0) {
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

        {/* Grid / Horizontal Scroll */}
        <motion.div
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="flex snap-x snap-mandatory overflow-x-auto pb-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-3 md:gap-6 md:pb-0"
        >
          {displayedDestinations.map((dest, idx) => (
            <motion.div
              key={dest.id}
              variants={cardVariants}
              className={`group relative min-w-[280px] flex-none snap-center overflow-hidden rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] md:w-auto ${
                idx !== displayedDestinations.length - 1 ? "mr-4 md:mr-0" : ""
              }`}
            >
              <Link
                href={`/${locale}/trips?destinationId=${dest.id}`}
                className="block cursor-pointer"
              >
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={dest.imageUrl}
                    alt={dest.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 80vw, 33vw"
                  />
                  {/* Dark gradient for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/90 group-hover:via-black/40" />

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
