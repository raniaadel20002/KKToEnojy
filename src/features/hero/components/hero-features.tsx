"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

interface FeatureItem {
  key: "amazingDestinations" | "safeReliable" | "localExperts" | "unforgettable";
  icon: string;
  defaultTitle: string;
  defaultSubtitle: string;
}

const FEATURES: FeatureItem[] = [
  {
    key: "amazingDestinations",
    icon: "/Hero/feature-destinations.svg",
    defaultTitle: "Amazing",
    defaultSubtitle: "Destinations",
  },
  {
    key: "safeReliable",
    icon: "/Hero/feature-safe.svg",
    defaultTitle: "Safe & Reliable",
    defaultSubtitle: "Services",
  },
  {
    key: "localExperts",
    icon: "/Hero/feature-guides.svg",
    defaultTitle: "Local Experts",
    defaultSubtitle: "& Guides",
  },
  {
    key: "unforgettable",
    icon: "/Hero/feature-experiences.svg",
    defaultTitle: "Unforgettable",
    defaultSubtitle: "Experiences",
  },
];

export function HeroFeatures() {
  const t = useTranslations("Hero.features");

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-8 mt-2 sm:mt-4"
    >
      {/* Desktop / Tablet Row with Dividers */}
      <div className="hidden md:flex items-center justify-between">
        {FEATURES.map((item, index) => {
          let title = item.defaultTitle;
          let subtitle = item.defaultSubtitle;
          try {
            title = t(`${item.key}.title`);
            subtitle = t(`${item.key}.subtitle`);
          } catch {
            // fallback to defaults
          }

          return (
            <div key={item.key} className="relative flex items-center flex-1 justify-center">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="relative h-10 w-10 sm:h-11 sm:w-11 shrink-0 flex items-center justify-center">
                  <Image
                    src={item.icon}
                    alt={`${title} ${subtitle}`}
                    width={44}
                    height={44}
                    className="h-auto w-full object-contain"
                  />
                </div>
                <div className="font-[family-name:var(--font-dm-sans)] text-[#343B55] text-[15px] lg:text-[16px] font-medium leading-[1.25]">
                  <p>{title}</p>
                  <p>{subtitle}</p>
                </div>
              </div>

              {/* Vertical divider line between features (except after last item) */}
              {index < FEATURES.length - 1 && (
                <div
                  className="hidden lg:block absolute end-0 top-1/2 -translate-y-1/2 h-[48.31px] w-[1.34px] bg-[#888888]"
                  aria-hidden="true"
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile 2x2 Grid */}
      <div className="grid grid-cols-2 gap-y-6 gap-x-4 md:hidden">
        {FEATURES.map((item) => {
          let title = item.defaultTitle;
          let subtitle = item.defaultSubtitle;
          try {
            title = t(`${item.key}.title`);
            subtitle = t(`${item.key}.subtitle`);
          } catch {
            // fallback to defaults
          }

          return (
            <div key={item.key} className="flex items-center gap-3">
              <div className="relative h-9 w-9 shrink-0 flex items-center justify-center">
                <Image
                  src={item.icon}
                  alt={`${title} ${subtitle}`}
                  width={38}
                  height={38}
                  className="h-auto w-full object-contain"
                />
              </div>
              <div className="font-[family-name:var(--font-dm-sans)] text-[#343B55] text-xs sm:text-sm font-medium leading-[1.25]">
                <p>{title}</p>
                <p>{subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

