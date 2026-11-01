"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import type { HeroDestination } from "@/src/features/hero/data/hero-destinations";

export type LocalizedHeroDestination = HeroDestination & {
  label: string;
};

// Desktop only
const CARD_WIDTH_INACTIVE = 239;
const CARD_WIDTH_ACTIVE = 305;
const CARD_HEIGHT_INACTIVE = 319;
const CARD_HEIGHT_ACTIVE = 430;

interface HeroDestinationCardProps {
  destination: LocalizedHeroDestination;
  isActive: boolean;
  onClick: () => void;
  viewLabel: string;
  variant?: "desktop" | "mobile";
}

export function HeroDestinationCard({
  destination,
  isActive,
  onClick,
  viewLabel,
  variant = "desktop",
}: HeroDestinationCardProps) {
  const isMobile = variant === "mobile";

  if (isMobile) {
    // Mobile: tall portrait cards with fixed dimensions
    return (
      <button
        type="button"
        aria-label={viewLabel}
        aria-pressed={isActive}
        onClick={onClick}
        className={`
          relative shrink-0 overflow-hidden rounded-[16px] cursor-pointer
          transition-opacity duration-200
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60
          w-[90px] h-[140px]
          ${isActive ? "opacity-100" : "opacity-75 hover:opacity-95"}
        `}
      >
        <Image
          src={destination.image}
          alt={destination.label}
          fill
          sizes="90px"
          className="object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </button>
    );
  }

  // Desktop: animated width + height via Framer Motion / CSS
  const height = isActive ? CARD_HEIGHT_ACTIVE : CARD_HEIGHT_INACTIVE;
  const width = isActive ? CARD_WIDTH_ACTIVE : CARD_WIDTH_INACTIVE;

  return (
    <motion.button
      type="button"
      aria-label={viewLabel}
      aria-pressed={isActive}
      onClick={onClick}
      animate={{ height }}
      transition={{ type: "spring", stiffness: 320, damping: 32, mass: 0.8 }}
      style={{
        width,
        transition: "width 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
        willChange: "height",
      }}
      className={`
        relative overflow-hidden rounded-[24px] shrink-0 cursor-pointer
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60
        ${isActive ? "" : "opacity-75 hover:opacity-95"}
      `}
    >
      <Image
        src={destination.image}
        alt={destination.label}
        fill
        sizes="305px"
        className="object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
    </motion.button>
  );
}
