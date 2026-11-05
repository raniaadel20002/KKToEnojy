"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";

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

export function TripsHero() {
  const t = useTranslations("TripsPage.hero");

  return (
    <section className="relative flex min-h-[380px] w-full items-center overflow-hidden sm:min-h-[440px] lg:min-h-[500px]">
      {/* Hero Background Image */}
      <Image
        src="/Trips/hero.png"
        alt={t("imageAlt")}
        fill
        priority
        quality={90}
        sizes="100vw"
        className="object-cover object-[70%_center] md:object-center"
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
            {t("title")}
          </motion.h1>
          <motion.p
            variants={heroItemVariants}
            className="mt-3.5 max-w-[500px] font-[family-name:var(--font-dm-sans)] text-sm font-normal leading-[1.6] text-white/95 sm:mt-5 sm:text-base md:text-lg"
          >
            {t("subtitle")}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
