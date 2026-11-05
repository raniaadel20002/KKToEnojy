"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function GalleryHero() {
  const t = useTranslations("GalleryPage.hero");

  return (
    <section className="relative overflow-hidden bg-[#343B55]">
      <div className="mx-auto w-full max-w-[1360px] px-5 sm:px-8 lg:px-12">
        {/*
          Mobile (< md): Centered text on top, mobile collage (/Gallary/responsive.png) below
          Desktop (>= md): Two-column layout, left text vertically centered, desktop collage (/Gallary/hero.png) on right
        */}
        <div className="flex flex-col items-center pt-10 pb-8 sm:pt-14 md:min-h-[460px] md:flex-row md:items-center md:justify-between md:py-8 lg:min-h-[520px] lg:py-10 xl:min-h-[560px]">
          {/* Left Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center text-center md:max-w-[440px] md:items-start md:text-left lg:max-w-[520px]"
          >
            <motion.h1
              variants={itemVariants}
              className="font-[family-name:var(--font-playfair)] text-[32px] font-bold leading-[1.18] text-white sm:text-[38px] md:text-[40px] lg:text-[48px] xl:text-[54px]"
            >
              {t("title")}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-3.5 max-w-[340px] font-[family-name:var(--font-dm-sans)] text-sm font-normal leading-[1.65] text-white/90 sm:max-w-[380px] sm:text-base md:mt-4 md:max-w-[460px] lg:mt-5 lg:text-[17px]"
            >
              {t("subtitle")}
            </motion.p>
          </motion.div>

          {/* Mobile Collage Image (< md) */}
          <div className="relative mt-8 w-full max-w-[280px] sm:max-w-[320px] aspect-[580/647] md:hidden">
            <Image
              src="/Gallary/responsive.png"
              alt={t("imageAlt")}
              fill
              priority
              quality={90}
              className="object-contain object-center"
              sizes="(max-width: 768px) 320px, 100vw"
            />
          </div>

          {/* Desktop/Tablet Collage Image (>= md) */}
          <div className="relative hidden aspect-[1120/1140] w-[42%] max-w-[380px] md:block lg:w-[44%] lg:max-w-[440px] xl:max-w-[480px]">
            <Image
              src="/Gallary/hero.png"
              alt={t("imageAlt")}
              fill
              priority
              quality={95}
              className="object-contain object-center md:object-right-center"
              sizes="(min-width: 1280px) 480px, (min-width: 1024px) 440px, 380px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
