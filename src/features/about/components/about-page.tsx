"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";

import type { AppLocale } from "@/src/i18n/locales";

// Animations
const heroContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const heroItemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const sectionFadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const cardSlideLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const cardSlideRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const offerCardVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function AboutPage() {
  const locale = useLocale() as AppLocale;
  const t = useTranslations("AboutPage");

  return (
    <>
      {/* 1. HERO SECTION (Unchanged, as requested) */}
      <section className="relative overflow-hidden bg-[#343B55]">
        <div className="mx-auto w-full max-w-[1360px] px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col items-center pt-10 pb-8 sm:pt-14 md:min-h-[460px] md:flex-row md:items-center md:justify-between md:py-8 lg:min-h-[520px] lg:py-10 xl:min-h-[560px]">
            {/* Left: Text Content */}
            <motion.div
              variants={heroContainerVariants}
              initial="hidden"
              animate="show"
              className="flex flex-col items-center text-center md:max-w-[440px] md:items-start md:text-left lg:max-w-[520px]"
            >
              <motion.h1
                variants={heroItemVariants}
                className="font-[family-name:var(--font-playfair)] text-[32px] font-bold leading-[1.18] text-white sm:text-[38px] md:text-[40px] lg:text-[48px] xl:text-[54px]"
              >
                {t("hero.title")}
              </motion.h1>

              <motion.p
                variants={heroItemVariants}
                className="mt-3.5 max-w-[340px] font-[family-name:var(--font-dm-sans)] text-sm font-normal leading-[1.65] text-white/90 sm:max-w-[380px] sm:text-base md:mt-4 md:max-w-[460px] lg:mt-5 lg:text-[17px]"
              >
                {t("hero.subtitle")}
              </motion.p>
            </motion.div>

            {/* Right: ABOUT US Wooden Blocks */}
            <div className="relative mt-8 aspect-[1022/532] w-full max-w-[360px] sm:max-w-[420px] md:mt-0 md:w-[48%] md:max-w-[500px] lg:w-[48%] lg:max-w-[560px]">
              <Image
                src="/AboutUs/hero.png"
                alt={t("hero.imageAlt")}
                fill
                priority
                quality={95}
                className="object-contain object-center md:object-right-center"
                sizes="(min-width: 1280px) 560px, (min-width: 1024px) 500px, (min-width: 768px) 48vw, 90vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. BREADCRUMB */}
      <nav
        aria-label="Breadcrumb"
        className="bg-[#FAF7F2] py-6 font-[family-name:var(--font-dm-sans)] text-sm sm:py-8 sm:text-base"
      >
        <div className="mx-auto w-full max-w-[1360px] px-5 text-center sm:px-8 lg:px-12">
          <div className="flex items-center justify-center gap-2">
            <Link
              href={`/${locale}`}
              className="text-[#5B6B73] transition-colors hover:text-[#343B55]"
            >
              {t("breadcrumb.home")}
            </Link>
            <span className="text-[#888888]">&gt;</span>
            <span className="font-medium text-[#343B55]">
              {t("breadcrumb.about")}
            </span>
          </div>
        </div>
      </nav>

      {/* 3. MAIN CONTENT SECTION */}
      <section className="w-full bg-[#FAF7F2] pb-20 pt-2 sm:pb-24 md:pb-28">
        <div className="mx-auto w-full max-w-[1360px] px-5 sm:px-8 lg:px-12">
          {/* Intro Heading + Description */}
          <motion.div
            variants={sectionFadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="mx-auto max-w-[850px] text-center"
          >
            <h2 className="font-[family-name:var(--font-playfair)] text-[28px] font-bold leading-[1.25] text-[#343B55] sm:text-[34px] lg:text-[40px]">
              {t("intro.title")}
            </h2>
            <p className="mt-4 font-[family-name:var(--font-dm-sans)] text-sm font-normal leading-[1.7] text-[#5B6B73] sm:text-base md:mt-5">
              {t("intro.description")}
            </p>
            {/* Small decorative divider */}
            <div className="mx-auto mt-5 h-[3px] w-16 rounded-full bg-[#765438]" />
          </motion.div>

          {/* Zigzag Story Section */}
          <div className="relative mx-auto mt-16 w-full max-w-[1195px] sm:mt-20 lg:mt-24 lg:aspect-[1195/1030]">
            {/* Desktop Decorative S-curve Vector connecting the 3 rows */}
            <div className="pointer-events-none absolute inset-0 hidden lg:block">
              <Image
                src="/AboutUs/Vector.svg"
                alt=""
                fill
                priority
                aria-hidden="true"
                className="object-fill opacity-90"
              />
            </div>

            <div className="relative z-10 flex flex-col gap-14 sm:gap-18 lg:grid lg:h-full lg:grid-rows-3 lg:gap-0">
              {/* Row 1: About Our Company (Desktop: Image Left, Text Right | Mobile: Image Top, Text Bottom) */}
              <motion.div
                variants={cardSlideLeft}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                className="grid grid-cols-1 items-center gap-6 sm:gap-8 lg:h-full lg:grid-cols-2 lg:gap-10"
              >
                {/* Image Frame: Custom border on mobile, fits within Vector arc on desktop */}
                <div className="mx-auto w-full max-w-[440px] rounded-tl-[104px] rounded-tr-[20px] rounded-br-[20px] rounded-bl-[104px] border-[4px] border-[#0E4A68] bg-transparent lg:ml-6 lg:max-w-[490px] lg:rounded-none lg:border-none lg:p-0">
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-tl-[94px] rounded-tr-[12px] rounded-br-[12px] rounded-bl-[94px] lg:rounded-tl-[135px] lg:rounded-bl-[135px] lg:rounded-tr-[20px] lg:rounded-br-[20px]">
                    <Image
                      src="/AboutUs/row-img1.png"
                      alt={t("company.imageAlt")}
                      fill
                      className="object-cover object-center"
                      sizes="(min-width: 1024px) 500px, 90vw"
                    />
                  </div>
                </div>

                {/* Text Content */}
                <div className="flex flex-col items-start text-left lg:max-w-[480px] lg:pl-6">
                  {/* Desktop: Icon above Title */}
                  <div className="relative mb-3 hidden h-16 w-16 lg:block">
                    <Image
                      src="/AboutUs/icon.svg"
                      alt=""
                      fill
                      aria-hidden="true"
                      className="object-contain"
                    />
                  </div>

                  {/* Mobile Header Row (Title left, Icon right) | Desktop Title */}
                  <div className="flex w-full items-center justify-between lg:block">
                    <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold leading-[1.25] text-[#343B55] sm:text-3xl lg:text-[34px]">
                      {t("company.title")}
                    </h3>
                    <div className="relative h-14 w-14 shrink-0 sm:h-16 sm:w-16 lg:hidden">
                      <Image
                        src="/AboutUs/icon.svg"
                        alt=""
                        fill
                        aria-hidden="true"
                        className="object-contain"
                      />
                    </div>
                  </div>

                  <p className="mt-3.5 font-[family-name:var(--font-dm-sans)] text-sm font-normal leading-[1.7] text-[#5B6B73] sm:text-base lg:mt-4">
                    {t("company.description")}
                  </p>
                </div>
              </motion.div>

              {/* Row 2: Our Mission (Desktop: Text Left, Image Right | Mobile: Image Top, Text Bottom) */}
              <motion.div
                variants={cardSlideRight}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                className="grid grid-cols-1 items-center gap-6 sm:gap-8 lg:h-full lg:grid-cols-2 lg:gap-10"
              >
                {/* Image Frame: Custom reversed border on mobile, fits within Vector arc on desktop */}
                <div className="mx-auto w-full max-w-[440px] rounded-tl-[20px] rounded-tr-[104px] rounded-br-[104px] rounded-bl-[20px] border-[4px] border-[#0E4A68] bg-transparent  lg:order-last lg:mr-6 lg:max-w-[490px] lg:justify-self-end lg:rounded-none lg:border-none lg:p-0">
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-tl-[12px] rounded-tr-[94px] rounded-br-[94px] rounded-bl-[12px] lg:rounded-tr-[135px] lg:rounded-br-[135px] lg:rounded-tl-[20px] lg:rounded-bl-[20px]">
                    <Image
                      src="/AboutUs/row-img2.png"
                      alt={t("mission.imageAlt")}
                      fill
                      className="object-cover object-center"
                      sizes="(min-width: 1024px) 500px, 90vw"
                    />
                  </div>
                </div>

                {/* Text Content */}
                <div className="flex flex-col items-start text-left lg:max-w-[480px] lg:pl-10">
                  {/* Desktop: Icon above Title */}
                  <div className="relative mb-3 hidden h-16 w-16 lg:block">
                    <Image
                      src="/AboutUs/icon (1).svg"
                      alt=""
                      fill
                      aria-hidden="true"
                      className="object-contain"
                    />
                  </div>

                  {/* Mobile Header Row (Title left, Icon right) | Desktop Title */}
                  <div className="flex w-full items-center justify-between lg:block">
                    <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold leading-[1.25] text-[#343B55] sm:text-3xl lg:text-[34px]">
                      {t("mission.title")}
                    </h3>
                    <div className="relative h-14 w-14 shrink-0 sm:h-16 sm:w-16 lg:hidden">
                      <Image
                        src="/AboutUs/icon (1).svg"
                        alt=""
                        fill
                        aria-hidden="true"
                        className="object-contain"
                      />
                    </div>
                  </div>

                  <p className="mt-3.5 font-[family-name:var(--font-dm-sans)] text-sm font-normal leading-[1.7] text-[#5B6B73] sm:text-base lg:mt-4">
                    {t("mission.description")}
                  </p>
                </div>
              </motion.div>

              {/* Row 3: Our Vision (Desktop: Image Left, Text Right | Mobile: Image Top, Text Bottom) */}
              <motion.div
                variants={cardSlideLeft}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                className="grid grid-cols-1 items-center gap-6 sm:gap-8 lg:h-full lg:grid-cols-2 lg:gap-10"
              >
                {/* Image Frame: Custom border on mobile, fits within Vector arc on desktop */}
                <div className="mx-auto w-full max-w-[440px] rounded-tl-[104px] rounded-tr-[20px] rounded-br-[20px] rounded-bl-[104px] border-[4px] border-[#0E4A68] bg-transparent lg:ml-6 lg:max-w-[490px] lg:rounded-none lg:border-none lg:p-0">
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-tl-[94px] rounded-tr-[12px] rounded-br-[12px] rounded-bl-[94px] lg:rounded-tl-[135px] lg:rounded-bl-[135px] lg:rounded-tr-[20px] lg:rounded-br-[20px]">
                    <Image
                      src="/AboutUs/row-img3.png"
                      alt={t("vision.imageAlt")}
                      fill
                      className="object-cover object-center"
                      sizes="(min-width: 1024px) 500px, 90vw"
                    />
                  </div>
                </div>

                {/* Text Content */}
                <div className="flex flex-col items-start text-left lg:max-w-[480px] lg:pl-6">
                  {/* Desktop: Icon above Title */}
                  <div className="relative mb-3 hidden h-16 w-16 lg:block">
                    <Image
                      src="/AboutUs/icon (2).svg"
                      alt=""
                      fill
                      aria-hidden="true"
                      className="object-contain"
                    />
                  </div>

                  {/* Mobile Header Row (Title left, Icon right) | Desktop Title */}
                  <div className="flex w-full items-center justify-between lg:block">
                    <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold leading-[1.25] text-[#343B55] sm:text-3xl lg:text-[34px]">
                      {t("vision.title")}
                    </h3>
                    <div className="relative h-14 w-14 shrink-0 sm:h-16 sm:w-16 lg:hidden">
                      <Image
                        src="/AboutUs/icon (2).svg"
                        alt=""
                        fill
                        aria-hidden="true"
                        className="object-contain"
                      />
                    </div>
                  </div>

                  <p className="mt-3.5 font-[family-name:var(--font-dm-sans)] text-sm font-normal leading-[1.7] text-[#5B6B73] sm:text-base lg:mt-4">
                    {t("vision.description")}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* 4. WHAT WE OFFER SECTION */}
          <div className="mt-24 sm:mt-28 lg:mt-32">
            <motion.div
              variants={sectionFadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              className="text-center"
            >
              <h2 className="font-[family-name:var(--font-playfair)] text-[28px] font-bold leading-[1.25] text-[#343B55] sm:text-[34px] lg:text-[40px]">
                {t("offers.title")}
              </h2>
              <p className="mt-3 font-[family-name:var(--font-dm-sans)] text-sm font-normal text-[#5B6B73] sm:text-base">
                {t("offers.subtitle")}
              </p>
              <div className="mx-auto mt-4 h-[3px] w-14 rounded-full bg-[#765438]" />
            </motion.div>

            {/* 3 Cards Grid */}
            <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-3 sm:gap-6 lg:gap-8">
              {/* Card 1: Sea Trips */}
              <motion.div
                variants={offerCardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
                className="flex flex-col items-center rounded-[24px] bg-white p-8 text-center shadow-[0px_8px_28px_0px_#343B551A] transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative mb-5 flex h-20 w-20 items-center justify-center">
                  <Image
                    src="/AboutUs/o-icon.svg"
                    alt=""
                    fill
                    aria-hidden="true"
                    className="object-contain"
                  />
                </div>
                <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-[#343B55] sm:text-2xl">
                  {t("offers.items.seaTrips.title")}
                </h3>
                <p className="mt-3 font-[family-name:var(--font-dm-sans)] text-xs font-normal leading-[1.6] text-[#5B6B73] sm:text-sm">
                  {t("offers.items.seaTrips.description")}
                </p>
              </motion.div>

              {/* Card 2: Desert Safari */}
              <motion.div
                variants={offerCardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
                className="flex flex-col items-center rounded-[24px] bg-white p-8 text-center shadow-[0px_8px_28px_0px_#343B551A] transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative mb-5 flex h-20 w-20 items-center justify-center">
                  <Image
                    src="/AboutUs/o-icon (2).svg"
                    alt=""
                    fill
                    aria-hidden="true"
                    className="object-contain"
                  />
                </div>
                <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-[#343B55] sm:text-2xl">
                  {t("offers.items.desertSafari.title")}
                </h3>
                <p className="mt-3 font-[family-name:var(--font-dm-sans)] text-xs font-normal leading-[1.6] text-[#5B6B73] sm:text-sm">
                  {t("offers.items.desertSafari.description")}
                </p>
              </motion.div>

              {/* Card 3: Historical Tours */}
              <motion.div
                variants={offerCardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
                className="flex flex-col items-center rounded-[24px] bg-white p-8 text-center shadow-[0px_8px_28px_0px_#343B551A] transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative mb-5 flex h-20 w-20 items-center justify-center">
                  <Image
                    src="/AboutUs/o-icon (1).svg"
                    alt=""
                    fill
                    aria-hidden="true"
                    className="object-contain"
                  />
                </div>
                <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-[#343B55] sm:text-2xl">
                  {t("offers.items.historicalTours.title")}
                </h3>
                <p className="mt-3 font-[family-name:var(--font-dm-sans)] text-xs font-normal leading-[1.6] text-[#5B6B73] sm:text-sm">
                  {t("offers.items.historicalTours.description")}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
