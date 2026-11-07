
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";

import type { TripType } from "@/src/features/categories/types/trip-type";

interface CategoryCardProps {
  tripType: TripType;
  index: number;
  isDesktop?: boolean;
}

const DESKTOP_ROTATIONS = [-13, 8, -3, 7, -10, 6];
const DESKTOP_PIN_ROTATIONS = [-47, 0, -45.99, 0, -47, 0];

const MOBILE_ROTATIONS = [7, -4.31, -4, 6, 5, -4.31];
const MOBILE_PIN_ROTATIONS = [7, -4.31, -4, 6, 7, -4.31];

export function CategoryCard({
  tripType,
  index,
  isDesktop = false,
}: CategoryCardProps) {
  const locale = useLocale();
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const defaultRotation = isDesktop
    ? DESKTOP_ROTATIONS[index % DESKTOP_ROTATIONS.length]
    : MOBILE_ROTATIONS[index % MOBILE_ROTATIONS.length];

  const pinRotation = isDesktop
    ? DESKTOP_PIN_ROTATIONS[index % DESKTOP_PIN_ROTATIONS.length]
    : MOBILE_PIN_ROTATIONS[index % MOBILE_PIN_ROTATIONS.length];

  // Compensate for the card's rotation so the pin keeps
  // its specified absolute angle.
  const adjustedPinRotation = isHovered
    ? pinRotation
    : pinRotation - defaultRotation;

  return (
    <Link
      href={`/${locale}/trips?typeId=${tripType.id}`}
      className="block outline-hidden select-none"
      draggable={false}
    >
      <motion.div
        className="group relative cursor-pointer"
        initial={{ rotate: defaultRotation, scale: 1 }}
        animate={{
          rotate: isHovered ? 0 : defaultRotation,
          scale: isHovered ? 1.05 : 1,
          zIndex: isHovered ? 30 : 10,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 22,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Pushpin */}
        <div className="pointer-events-none absolute -top-3.5 sm:-top-4.5 left-1/2 z-20 -translate-x-1/2">
          <motion.div
            className="relative h-[28px] w-[24px] sm:h-[36px] sm:w-[32px]"
            animate={{ rotate: adjustedPinRotation }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 22,
            }}
          >
            <Image
              src="/Categories/Pushpin.svg"
              alt=""
              fill
              className="object-contain"
            />
          </motion.div>
        </div>

        {/* Polaroid Card */}
        <div className="relative w-full overflow-hidden rounded-[10px] border border-[#888888] bg-white p-2.5 pb-3 shadow-xl transition-shadow duration-300 group-hover:shadow-2xl sm:p-3.5 sm:pb-4">
          <div className="relative aspect-square w-full overflow-hidden rounded-[4px] bg-slate-100">
            {tripType.imageUrl && !imageError ? (
              <Image
                src={tripType.imageUrl}
                alt={tripType.name}
                fill
                draggable={false}
                sizes="(max-width: 640px) 200px, (max-width: 1024px) 280px, 360px"
                className="pointer-events-none object-cover transition-transform duration-500 group-hover:scale-105"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-slate-200 text-slate-400">
                <span>{tripType.name}</span>
              </div>
            )}
          </div>

          <div className="pt-2 text-center sm:pt-3">
            <h3 className="truncate px-1 font-[family-name:var(--font-dm-sans)] text-[14px] font-bold text-[#343B55] sm:text-[18px] lg:text-[20px]">
              {tripType.name.trim()}
            </h3>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
