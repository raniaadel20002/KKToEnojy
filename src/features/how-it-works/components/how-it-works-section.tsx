"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { stepsData } from "@/src/features/how-it-works/data/steps-data";

// Animation Variants
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const cardHoverVariants: Variants = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.06,
    y: -4,
    transition: { type: "spring", stiffness: 400, damping: 20 },
  },
};

export function HowItWorksSection() {
  const t = useTranslations("HowItWorks");

  return (
    <section className="relative overflow-hidden bg-[#343B55] py-16 md:py-24 lg:py-28">
      {/* Content Container */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 mx-auto w-full px-5 md:px-8 lg:max-w-[1360px]"
      >
        {/* Section Header */}
        <div className="mb-14 flex flex-col items-center text-center md:mb-18 lg:mb-24">
          <motion.h2
            variants={itemVariants}
            className="font-[family-name:var(--font-playfair)] text-3xl font-bold leading-tight text-white md:text-4xl lg:text-[44px]"
          >
            {t("title")}
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-2.5 font-[family-name:var(--font-dm-sans)] text-sm font-normal text-white md:text-base"
          >
            {t("subtitle")}
          </motion.p>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 140 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mt-3.5 h-2 w-[140px] rounded-[20px] bg-[#198399]"
          />
        </div>

        {/* ─── DESKTOP VIEW: Continuous Process Track with Alternating Cards ─── */}
        <div className="hidden lg:block">
          <div className="relative mx-auto w-full max-w-[1266px] aspect-[1266/535]">
            {/* SVG Process Track & Connecting Pins */}
            <svg
              viewBox="0 -95 1266 535"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute inset-0 h-full w-full pointer-events-none"
            >
              {/* Continuous Dual Zigzag Track */}
              <motion.path
                d="M1 121H245C251.667 121 257 117.667 261 111L323 11C327 4.33333 332.333 1 339 1H561C567.667 1 573 4.33333 577 11L639 111C643 117.667 648.333 121 655 121H877C883.667 121 889 117.667 893 111L955 11C959 4.33333 964.333 1 971 1H1265M1 311H245C251.667 311 257 307.667 261 301L323 201C327 194.333 332.333 191 339 191H561C567.667 191 573 194.333 577 201L639 301C643 307.667 648.333 311 655 311H877C883.667 311 889 307.667 893 301L955 201C959 194.333 964.333 191 971 191H1265"
                stroke="#198399"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
              />

              {/* Vertical Pin Lines to Cards */}
              {/* Pin 1: Card 1 bottom (123, 62) to Track (123, 121) */}
              <motion.line
                x1="123"
                y1="62"
                x2="123"
                y2="121"
                stroke="#198399"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.6 }}
              />
              {/* Pin 2: Track (450, 191) to Card 2 top (450, 250) */}
              <motion.line
                x1="450"
                y1="191"
                x2="450"
                y2="250"
                stroke="#198399"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.8 }}
              />
              {/* Pin 3: Card 3 bottom (766, 62) to Track (766, 121) */}
              <motion.line
                x1="766"
                y1="62"
                x2="766"
                y2="121"
                stroke="#198399"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 1.0 }}
              />
              {/* Pin 4: Track (1118, 191) to Card 4 top (1118, 250) */}
              <motion.line
                x1="1118"
                y1="191"
                x2="1118"
                y2="250"
                stroke="#198399"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 1.2 }}
              />

              {/* Brown Dots at track junctions */}
              <motion.circle
                cx="123"
                cy="121"
                r="5.5"
                fill="#765438"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, type: "spring" }}
              />
              <motion.circle
                cx="450"
                cy="191"
                r="5.5"
                fill="#765438"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9, type: "spring" }}
              />
              <motion.circle
                cx="766"
                cy="121"
                r="5.5"
                fill="#765438"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.1, type: "spring" }}
              />
              <motion.circle
                cx="1118"
                cy="191"
                r="5.5"
                fill="#765438"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.3, type: "spring" }}
              />
            </svg>

            {/* ─── STEP 1: Icon Top, Text Bottom ─── */}
            <div
              className="absolute -translate-x-1/2"
              style={{ left: `${(123 / 1266) * 100}%`, top: "9.9%" }}
            >
              <motion.div
                initial="rest"
                whileHover="hover"
                variants={cardHoverVariants}
                className="cursor-pointer"
              >
                <Image
                  src={stepsData[0].iconImage}
                  alt={t(stepsData[0].titleKey)}
                  width={104}
                  height={104}
                  className="h-[104px] w-[104px] drop-shadow-md"
                />
              </motion.div>
            </div>
            <div
              className="absolute -translate-x-1/2 text-center w-[250px]"
              style={{ left: `${(123 / 1266) * 100}%`, top: "50%" }}
            >
              <h3 className="font-[family-name:var(--font-dm-sans)] text-lg font-semibold text-[#FAF7F2] md:text-xl leading-tight">
                {t(stepsData[0].titleKey)}
              </h3>
              <p className="mt-2 font-[family-name:var(--font-dm-sans)] text-sm font-normal text-[#E7E2D9] leading-relaxed">
                {t(stepsData[0].descriptionKey)}
              </p>
            </div>

            {/* ─── STEP 2: Text Top, Icon Bottom ─── */}
            <div
              className="absolute -translate-x-1/2 text-center w-[250px]"
              style={{ left: `${(450 / 1266) * 100}%`, top: "29%" }}
            >
              <h3 className="font-[family-name:var(--font-dm-sans)] text-lg font-semibold text-[#FAF7F2] md:text-xl leading-tight">
                {t(stepsData[1].titleKey)}
              </h3>
              <p className="mt-2 font-[family-name:var(--font-dm-sans)] text-sm font-normal text-[#E7E2D9] leading-relaxed">
                {t(stepsData[1].descriptionKey)}
              </p>
            </div>
            <div
              className="absolute -translate-x-1/2"
              style={{ left: `${(450 / 1266) * 100}%`, top: "64.5%" }}
            >
              <motion.div
                initial="rest"
                whileHover="hover"
                variants={cardHoverVariants}
                className="cursor-pointer"
              >
                <Image
                  src={stepsData[1].iconImage}
                  alt={t(stepsData[1].titleKey)}
                  width={104}
                  height={104}
                  className="h-[104px] w-[104px] drop-shadow-md"
                />
              </motion.div>
            </div>

            {/* ─── STEP 3: Icon Top, Text Bottom ─── */}
            <div
              className="absolute -translate-x-1/2"
              style={{ left: `${(766 / 1266) * 100}%`, top: "9.9%" }}
            >
              <motion.div
                initial="rest"
                whileHover="hover"
                variants={cardHoverVariants}
                className="cursor-pointer"
              >
                <Image
                  src={stepsData[2].iconImage}
                  alt={t(stepsData[2].titleKey)}
                  width={104}
                  height={104}
                  className="h-[104px] w-[104px] drop-shadow-md"
                />
              </motion.div>
            </div>
            <div
              className="absolute -translate-x-1/2 text-center w-[250px]"
              style={{ left: `${(766 / 1266) * 100}%`, top: "50%" }}
            >
              <h3 className="font-[family-name:var(--font-dm-sans)] text-lg font-semibold text-[#FAF7F2] md:text-xl leading-tight">
                {t(stepsData[2].titleKey)}
              </h3>
              <p className="mt-2 font-[family-name:var(--font-dm-sans)] text-sm font-normal text-[#E7E2D9] leading-relaxed">
                {t(stepsData[2].descriptionKey)}
              </p>
            </div>

            {/* ─── STEP 4: Text Top, Icon Bottom ─── */}
            <div
              className="absolute -translate-x-1/2 text-center w-[250px]"
              style={{ left: `${(1118 / 1266) * 100}%`, top: "29%" }}
            >
              <h3 className="font-[family-name:var(--font-dm-sans)] text-lg font-semibold text-[#FAF7F2] md:text-xl leading-tight">
                {t(stepsData[3].titleKey)}
              </h3>
              <p className="mt-2 font-[family-name:var(--font-dm-sans)] text-sm font-normal text-[#E7E2D9] leading-relaxed">
                {t(stepsData[3].descriptionKey)}
              </p>
            </div>
            <div
              className="absolute -translate-x-1/2"
              style={{ left: `${(1118 / 1266) * 100}%`, top: "64.5%" }}
            >
              <motion.div
                initial="rest"
                whileHover="hover"
                variants={cardHoverVariants}
                className="cursor-pointer"
              >
                <Image
                  src={stepsData[3].iconImage}
                  alt={t(stepsData[3].titleKey)}
                  width={104}
                  height={104}
                  className="h-[104px] w-[104px] drop-shadow-md"
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* ─── MOBILE VIEW: Vertical Stacked Timeline (as in responsive.png) ─── */}
        <div className="relative mx-auto max-w-[480px] lg:hidden">
          {/* Continuous Vertical Teal Timeline Line */}
          <div className="absolute left-[44px] sm:left-[52px] top-[44px] sm:top-[52px] bottom-[44px] sm:bottom-[52px] w-[2px] -translate-x-1/2 bg-[#198399]" />

          {/* Steps List */}
          <div className="flex flex-col gap-8 sm:gap-10">
            {stepsData.map((step, idx) => (
              <motion.div
                key={step.id}
                variants={itemVariants}
                className="relative flex items-center gap-5 sm:gap-6"
              >
                {/* Step Icon Card */}
                <div className="relative z-10 shrink-0">
                  <Image
                    src={step.iconImage}
                    alt={t(step.titleKey)}
                    width={104}
                    height={104}
                    className="h-[88px] w-[88px] sm:h-[104px] sm:w-[104px] drop-shadow-md"
                  />
                </div>

                {/* Step Text Info */}
                <div className="flex flex-col justify-center">
                  <h3 className="font-[family-name:var(--font-dm-sans)] text-lg sm:text-xl font-semibold text-[#FAF7F2] leading-snug">
                    {t(step.titleKey)}
                  </h3>
                  <p className="mt-1.5 font-[family-name:var(--font-dm-sans)] text-sm sm:text-base font-normal text-[#E7E2D9] leading-relaxed">
                    {t(step.descriptionKey)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
