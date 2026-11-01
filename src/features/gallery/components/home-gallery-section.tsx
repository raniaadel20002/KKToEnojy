"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useGalleryImagesQuery } from "@/src/features/gallery/api/get-gallery-images";
import { GalleryLightbox } from "@/src/features/gallery/components/gallery-lightbox";
import type { GalleryImage } from "@/src/features/gallery/types/gallery";

// Number of images per column group (before duplication)
const COL_SIZE = 6;
// Scroll duration in seconds — identical for both columns guarantees same speed
const SCROLL_DURATION = 60;

// Animation Variants
const sectionVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.2,
    },
  },
};

const titleItemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const mobileGridVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const mobileItemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

export function HomeGallerySection() {
  const { data: images, isLoading, error } = useGalleryImagesQuery();
  const t = useTranslations("Gallery");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center py-20 text-gray-500">
        {t("loading")}
      </div>
    );
  }

  if (error || !images || images.length === 0) {
    return null;
  }

  // --- Mobile logic: use first 6 images ---
  const mobileTopImages = images.slice(0, 2);
  const mobileBottomImages = images.slice(2, 6);

  // --- Desktop logic ---
  // Middle column uses first 2 images
  const desktopMiddleImages = images.slice(0, 2);
  const rest = images.length > 2 ? images.slice(2) : images;

  // Build left and right base arrays of exactly COL_SIZE items by cycling
  const buildColumn = (source: GalleryImage[], size: number): GalleryImage[] => {
    const result: GalleryImage[] = [];
    for (let i = 0; i < size; i++) {
      result.push(source[i % source.length]);
    }
    return result;
  };

  const half = Math.ceil(rest.length / 2);
  const rawLeft = rest.slice(0, half).length > 0 ? rest.slice(0, half) : images;
  const rawRight = rest.slice(half).length > 0 ? rest.slice(half) : images;

  const leftBase = buildColumn(rawLeft, COL_SIZE);
  const rightBase = buildColumn(rawRight, COL_SIZE);

  const openLightbox = (img: GalleryImage) => {
    const idx = images.findIndex((i) => i.id === img.id);
    if (idx !== -1) setLightboxIndex(idx);
  };

  const closeLightbox = () => setLightboxIndex(null);

  const nextImage = () => {
    if (lightboxIndex !== null && lightboxIndex < images.length - 1) {
      setLightboxIndex(lightboxIndex + 1);
    }
  };

  const prevImage = () => {
    if (lightboxIndex !== null && lightboxIndex > 0) {
      setLightboxIndex(lightboxIndex - 1);
    }
  };

  const TitleBlock = () => (
    <div className="flex flex-col items-center justify-center py-6 text-center">
      <motion.p
        variants={titleItemVariants}
        className="font-[family-name:var(--font-montez)] text-[24px] text-[#69DD84] md:text-[32px]"
      >
        {t("subtitle")}
      </motion.p>
      <motion.h2
        variants={titleItemVariants}
        className="mt-2 text-3xl font-bold text-[var(--color-deep-ocean)] md:text-4xl"
      >
        {t("title")}
      </motion.h2>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: 120 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        className="mx-auto mt-3 h-1 bg-[#69DD84]"
      />
    </div>
  );

  // Renders a scrolling column. Each image uses aspect-[4/5].
  // We duplicate the array for seamless infinite loop.
  const ScrollColumn = ({
    items,
    direction,
  }: {
    items: GalleryImage[];
    direction: "up" | "down";
  }) => {
    const animate = direction === "up" ? { y: ["0%", "-50%"] } : { y: ["-50%", "0%"] };

    return (
      <div className="relative h-full w-full overflow-hidden">
        <motion.div
          className="flex flex-col"
          animate={animate}
          transition={{ repeat: Infinity, ease: "linear", duration: SCROLL_DURATION }}
        >
          {/* First set */}
          <div className="flex flex-col gap-4">
            {items.map((img, idx) => (
              <div
                key={`col-a-${img.id}-${idx}`}
                className="relative aspect-[4/5] w-full cursor-pointer overflow-hidden"
                onClick={() => openLightbox(img)}
              >
                <Image
                  src={img.imageUrl}
                  alt=""
                  fill
                  className="object-cover transition-transform hover:scale-105"
                  sizes="33vw"
                />
              </div>
            ))}
          </div>
          {/* Duplicate set for seamless loop */}
          <div className="flex flex-col gap-4 pt-4">
            {items.map((img, idx) => (
              <div
                key={`col-b-${img.id}-${idx}`}
                className="relative aspect-[4/5] w-full cursor-pointer overflow-hidden"
                onClick={() => openLightbox(img)}
              >
                <Image
                  src={img.imageUrl}
                  alt=""
                  fill
                  className="object-cover transition-transform hover:scale-105"
                  sizes="33vw"
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className="w-full bg-white"
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 md:px-8 lg:px-10">
        {/* --- MOBILE & TABLET LAYOUT --- */}
        <div className="block md:hidden">
          <motion.div variants={mobileGridVariants} className="grid grid-cols-2 gap-3">
            {mobileTopImages.map((img, i) => (
              <motion.div
                variants={mobileItemVariants}
                key={`mob-top-${img.id}-${i}`}
                className="relative aspect-square cursor-pointer overflow-hidden rounded-lg"
                onClick={() => openLightbox(img)}
              >
                <Image
                  src={img.imageUrl}
                  alt=""
                  fill
                  className="object-cover transition-transform hover:scale-105"
                  sizes="50vw"
                />
              </motion.div>
            ))}
          </motion.div>

          <TitleBlock />

          <motion.div variants={mobileGridVariants} className="grid grid-cols-2 gap-3">
            {mobileBottomImages.map((img, i) => (
              <motion.div
                variants={mobileItemVariants}
                key={`mob-bot-${img.id}-${i}`}
                className="relative aspect-square cursor-pointer overflow-hidden rounded-lg"
                onClick={() => openLightbox(img)}
              >
                <Image
                  src={img.imageUrl}
                  alt=""
                  fill
                  className="object-cover transition-transform hover:scale-105"
                  sizes="50vw"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* --- DESKTOP LAYOUT --- */}
        <div className="hidden overflow-hidden md:grid md:grid-cols-3" style={{ height: "860px" }}>
          {/* Left Column — scrolls up */}
          <ScrollColumn items={leftBase} direction="up" />

          {/* Middle Column — static */}
          <div className="flex flex-col overflow-hidden px-6 py-10">
            <TitleBlock />
            <div className="flex flex-1 flex-col gap-4 overflow-hidden">
              {desktopMiddleImages.map((img, idx) => (
                <div
                  key={`desk-mid-${img.id}-${idx}`}
                  className="relative w-full flex-1 cursor-pointer overflow-hidden"
                  onClick={() => openLightbox(img)}
                >
                  <Image
                    src={img.imageUrl}
                    alt=""
                    fill
                    className="object-cover transition-transform hover:scale-105"
                    sizes="33vw"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column — scrolls down */}
          <ScrollColumn items={rightBase} direction="down" />
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <GalleryLightbox
          image={images[lightboxIndex]}
          images={images}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrev={prevImage}
        />
      )}
    </motion.section>
  );
}
