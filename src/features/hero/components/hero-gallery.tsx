"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { heroGalleryImages } from "@/src/features/hero/data/hero-gallery-data";

// 4 repetitions to ensure seamless infinite looping on all screen sizes up to 4K
const REPEATED_IMAGES = [
  ...heroGalleryImages,
  ...heroGalleryImages,
  ...heroGalleryImages,
  ...heroGalleryImages,
];

export function HeroGallery() {
  return (
    <div className="relative w-full lg:max-w-[1440px] xl:max-w-[1540px] lg:mx-auto overflow-hidden my-5 sm:my-8 lg:my-10">
      {/* SVG ClipPath Definition for the concave curved edges */}
      <svg
        className="pointer-events-none absolute h-0 w-0"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <clipPath id="heroGalleryCurve" clipPathUnits="objectBoundingBox">
            <path d="M 0 0 Q 0.5 0.35 1 0 L 1 1 Q 0.5 0.65 0 1 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Curved Container:
          - Full width (edge-to-edge) on mobile
          - Expanded max width and height on desktop for larger image display
      */}
      <div
        className="relative w-full h-[240px] sm:h-[300px] lg:h-[370px] xl:h-[400px] overflow-hidden select-none [isolation:isolate]"
        style={{
          clipPath: "url(#heroGalleryCurve)",
          WebkitClipPath: "url(#heroGalleryCurve)",
        }}
      >
        {/* Continuous Infinite Moving Carousel Strip (RTL direction: moves right to left) */}
        <motion.div
          className="flex h-full w-max items-center gap-2.5 sm:gap-4 lg:gap-5 will-change-transform"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 35,
              ease: "linear",
            },
          }}
        >
          {REPEATED_IMAGES.map((img, index) => (
            <div
              key={`${img.id}-${index}`}
              className="relative h-full w-[200px] sm:w-[250px] lg:w-[305px] xl:w-[330px] shrink-0 overflow-hidden"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                priority={index < 5}
                sizes="(max-width: 640px) 200px, (max-width: 1024px) 250px, (max-width: 1280px) 305px, 330px"
                className="object-cover object-center pointer-events-none"
              />
            </div>
          ))}
        </motion.div>

        {/* Edge Gradient Effect Overlay per specification:
            linear-gradient(90deg, rgba(250, 247, 242, 0.6) 0%, rgba(255, 255, 255, 0) 18.27%, rgba(204, 204, 204, 0) 79.33%, rgba(250, 247, 242, 0.6) 100%) */}
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(90deg, rgba(250, 247, 242, 0.6) 0%, rgba(255, 255, 255, 0) 18.27%, rgba(204, 204, 204, 0) 79.33%, rgba(250, 247, 242, 0.6) 100%)",
          }}
        />
      </div>
    </div>
  );
}
