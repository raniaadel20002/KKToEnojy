"use client";

import { useTranslations } from "next-intl";
import { HeroContent } from "@/src/features/hero/components/hero-content";
import { HeroGallery } from "@/src/features/hero/components/hero-gallery";
import { HeroFeatures } from "@/src/features/hero/components/hero-features";

export function HeroSection() {
  const t = useTranslations("Hero");

  return (
    <section
      aria-label={t("ariaLabel")}
      className="relative w-full overflow-hidden bg-[#FAF7F2] pt-4 sm:pt-6 lg:pt-10 pb-10 sm:pb-14 lg:pb-20"
    >
      {/* Centered Hero Content (Eyebrow, Heading, Description, CTA) */}
      <HeroContent />

      {/* Seamless Continuous Curved Image Gallery Carousel */}
      <HeroGallery />

      {/* Bottom Feature Highlights (2x2 grid on mobile, 4 columns on desktop) */}
      <HeroFeatures />
    </section>
  );
}
