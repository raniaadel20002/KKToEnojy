"use client";

import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { StepCard } from "@/src/features/how-it-works/components/step-card";
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
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const gridContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const stepCardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function HowItWorksSection() {
  const t = useTranslations("HowItWorks");

  return (
    <section className="relative overflow-hidden bg-[#003A5A] py-16 md:py-20 lg:py-24">
      {/* Background SVG heart shape - completely static as requested */}
      <div className="pointer-events-none absolute inset-0 select-none">
        <svg
          width="1358"
          height="1167"
          viewBox="0 0 1439 690"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            top: "-200px",
          }}
        >
          <path
            d="M162.155 43.9913C307.731 -50.2367 494.621 171.149 683.05 174.182C922.868 178.041 1046.21 -106.593 1262.5 43.9913C1585.96 269.187 1414.38 730.376 1173.22 952.346C963.595 1145.28 694.515 1217.36 400.6 1046.59C152.973 902.714 6.0872 690.978 0.306083 428.467C-3.53066 254.248 27.4926 131.155 162.155 43.9913Z"
            fill="#FFFFFF1A"
          />
        </svg>
      </div>

      {/* Content */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 mx-auto w-full px-5 md:px-8 lg:max-w-[1400px] lg:px-10"
      >
        {/* Header */}
        <div className="mb-20 flex flex-col items-center text-center md:mb-24 lg:mb-28">
          <motion.p
            variants={itemVariants}
            className="font-[family-name:var(--font-montez)] text-[24px] leading-[160%] text-[#69DD84] md:text-[32px]"
          >
            {t("subtitle")}
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="mt-1 font-sans text-[28px] font-semibold leading-[160%] text-white md:text-[40px]"
          >
            {t("title")}
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 117 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="mt-2 h-2 bg-[#69DD84]"
          />
        </div>

        {/* Steps cards */}
        <motion.div
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 gap-x-6 gap-y-[84px] md:gap-x-8 md:gap-y-[60px] lg:grid-cols-4 lg:gap-8"
        >
          {stepsData.map((step) => (
            <motion.div
              key={step.id}
              variants={stepCardVariants}
              className="flex"
            >
              <StepCard step={step} t={t} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
