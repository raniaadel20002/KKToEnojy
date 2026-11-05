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

export function ContactHero() {
  const t = useTranslations("ContactPage.hero");

  return (
    <section className="relative overflow-hidden bg-[#343B55]">
      <div className="mx-auto w-full max-w-[1360px] px-5 sm:px-8 lg:px-12">
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
              {t("description")}
            </motion.p>
          </motion.div>

          {/* Right Hero Image (Blocks Contact Us) */}
          <div className="relative mt-8 aspect-[1192/560] w-full max-w-[360px] sm:max-w-[440px] md:mt-0 md:w-[48%] md:max-w-[520px] lg:w-[50%] lg:max-w-[580px] xl:max-w-[620px]">
            <Image
              src="/Contact/hero.png"
              alt={t("imageAlt")}
              fill
              priority
              quality={95}
              className="object-contain object-center md:object-right-center"
              sizes="(min-width: 1280px) 620px, (min-width: 1024px) 580px, (min-width: 768px) 48vw, 90vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
