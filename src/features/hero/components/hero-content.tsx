"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";

export function HeroContent() {
  const t = useTranslations("Hero");
  const locale = useLocale();

  let eyebrow = "YOUR NEXT ADVENTURE AWAITS";
  let title = "Discover the Egypt";
  let description1 =
    "Crystal clear waters, breathtaking landscapes, and unforgettable experiences.";
  let description2 = "Explore Egypt and beyond with us.";
  let cta = "Explore Our Experiences";

  try {
    eyebrow = t("eyebrow");
    title = t("title");
    description1 = t("description1");
    description2 = t("description2");
    cta = t("cta");
  } catch {
    // fallback to default strings
  }

  return (
    <div className="flex flex-col items-center text-center max-w-3xl mx-auto px-4">
      {/* Subtitle / Eyebrow */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="font-[family-name:var(--font-dm-sans)] font-semibold text-[11px] sm:text-xs md:text-sm uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#765438] mb-2 sm:mb-4"
      >
        {eyebrow}
      </motion.p>

      {/* Main Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        className="font-[family-name:var(--font-playfair)] font-semibold text-[32px] sm:text-[44px] md:text-5xl lg:text-[64px] text-[#343B55] tracking-tight leading-[1.12] mb-2 sm:mb-4"
      >
        {title}
      </motion.h1>

      {/* Description lines */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        className="font-[family-name:var(--font-dm-sans)] text-[#5B6B73] text-[13px] sm:text-[15px] md:text-[16px] leading-[1.5] sm:leading-[1.6] max-w-[320px] sm:max-w-xl mb-5 sm:mb-8"
      >
        <p>{description1}</p>
        <p>{description2}</p>
      </motion.div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        className="w-full sm:w-auto flex justify-center"
      >
        <Link
          href={`/${locale}/trips`}
          className="group w-full max-w-[320px] sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-[#765438] px-7 sm:px-8 py-3 sm:py-3.5 text-[14px] sm:text-[16px] font-medium text-white shadow-sm hover:bg-[#5f432b] hover:shadow-md transition-all active:scale-[0.98]"
        >
          <span>{cta}</span>
          <span className="relative flex h-5 w-5 items-center justify-center transition-transform group-hover:translate-x-1">
            <Image
              src="/Hero/hero-cta-arrow.svg"
              alt=""
              width={20}
              height={20}
              className="h-auto w-auto"
            />
          </span>
        </Link>
      </motion.div>
    </div>
  );
}
