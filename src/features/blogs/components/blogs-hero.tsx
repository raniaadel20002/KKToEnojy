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

export function BlogsHero() {
  const t = useTranslations("BlogsPage.hero");

  return (
    <section className="relative min-h-[420px] w-full overflow-hidden sm:min-h-[480px] lg:min-h-[540px] xl:min-h-[600px]">
      <Image
        src="/Blogs/hero.png"
        alt={t("imageAlt")}
        fill
        priority
        quality={90}
        className="object-cover object-[center_35%]"
        sizes="100vw"
      />
      {/* Gradient Overlay for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/35 to-black/20" />

      <div className="relative mx-auto flex min-h-[420px] w-full max-w-[1360px] flex-col justify-center px-5 py-16 sm:min-h-[480px] sm:px-8 sm:py-20 lg:min-h-[540px] lg:px-12 xl:min-h-[600px]">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="max-w-[700px] text-left"
        >
          <motion.h1
            variants={itemVariants}
            className="font-[family-name:var(--font-playfair)] text-[34px] font-bold leading-[1.15] text-white sm:text-[44px] md:text-[52px] lg:text-[58px] xl:text-[64px]"
          >
            {t("title")}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-4 max-w-[480px] font-[family-name:var(--font-dm-sans)] text-[15px] font-normal leading-[1.65] text-white/90 sm:mt-5 sm:text-base md:text-[17px]"
          >
            {t("subtitle")}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
