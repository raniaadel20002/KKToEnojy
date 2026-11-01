"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
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
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function ExploreSection() {
  const locale = useLocale();
  const t = useTranslations("Explore");

  return (
    <section
      className="relative py-10 md:py-14 lg:py-16"
      style={{ backgroundColor: "#003A5A" }}
    >
      {/* Content Container */}
      <div className="mx-auto w-full px-4 md:px-8 lg:max-w-[1320px] lg:px-10">
        {/* Card Wrapper — relative, NO overflow-hidden so planes can stick out */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="relative"
        >
          {/* Top-Left Plane — sticks out of card corners */}
          <motion.div
            variants={itemVariants}
            className="pointer-events-none absolute -left-10 -top-10 z-20 select-none md:-left-14 md:-top-14"
          >
            <Image
              src="/ExploreSection/plane.svg"
              alt=""
              width={240}
              height={240}
              unoptimized
              className="w-[140px] object-contain opacity-30 md:w-[190px] lg:w-[240px]"
            />
          </motion.div>

          {/* Bottom-Right Plane — smaller, sticks out of bottom-right corner */}
          <motion.div
            variants={itemVariants}
            className="pointer-events-none absolute -bottom-10 -right-10 z-20 select-none md:-bottom-14 md:-right-14"
          >
            <Image
              src="/ExploreSection/plane.svg"
              alt=""
              width={200}
              height={200}
              unoptimized
              className="w-[120px] object-contain opacity-30 md:w-[160px] lg:w-[200px]"
            />
          </motion.div>

          {/* Banner Card — overflow-hidden clips the image and gradient only */}
          <div className="relative h-[240px] w-full overflow-hidden rounded-2xl shadow-2xl sm:h-[320px] md:h-[390px] lg:h-[457px]">
            {/* Background Image */}
            <Image
              src="/ExploreSection/imageExplore.webp"
              alt="Explore Tour Background"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1320px) 100vw, 1320px"
              priority
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent from-30% via-[#003A5A]/40 to-[#003A5A]/75" />

            {/* Text Content — right side */}
            <div className="absolute inset-0 flex items-center justify-end px-8 pb-8 sm:px-12 sm:pb-10 md:px-16 md:pb-14 lg:px-24 lg:pb-16">
              <div className="flex flex-col items-center gap-3 md:gap-4">
                <motion.h2
                  variants={textVariants}
                  className="whitespace-nowrap text-xl font-bold text-white sm:text-2xl md:text-3xl lg:text-[42px] lg:leading-tight"
                >
                  {t("title")}
                </motion.h2>
                <motion.p
                  variants={textVariants}
                  className="whitespace-nowrap text-xs text-gray-200 sm:text-sm md:text-base"
                >
                  {t("description")}
                </motion.p>
                <motion.div variants={textVariants} className="w-full">
                  <Link
                    href={`/${locale}/trips`}
                    className="mt-1 block w-full rounded-full bg-white py-2 text-center text-sm font-semibold text-[var(--color-deep-ocean)] transition-all hover:bg-gray-100 hover:shadow-lg md:py-3 md:text-base"
                  >
                    {t("cta")}
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
