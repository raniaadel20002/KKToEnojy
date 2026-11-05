"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";

import { GalleryCard } from "@/src/features/gallery/components/gallery-card";
import { GalleryLightbox } from "@/src/features/gallery/components/gallery-lightbox";
import type { GalleryImage } from "@/src/features/gallery/types/gallery";

interface GalleryGridProps {
  images: GalleryImage[];
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export function GalleryGrid({ images }: GalleryGridProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [visibleCount, setVisibleCount] = useState(9);
  const t = useTranslations("GalleryPage");

  const visibleImages = images.slice(0, visibleCount);
  const hasMore = visibleCount < images.length;

  const handleExpand = (image: GalleryImage) => {
    setSelectedImage(image);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  const handleNext = () => {
    if (!selectedImage) return;
    const currentIndex = images.findIndex((img) => img.id === selectedImage.id);
    if (currentIndex < images.length - 1) {
      setSelectedImage(images[currentIndex + 1]);
    }
  };

  const handlePrev = () => {
    if (!selectedImage) return;
    const currentIndex = images.findIndex((img) => img.id === selectedImage.id);
    if (currentIndex > 0) {
      setSelectedImage(images[currentIndex - 1]);
    }
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 6, images.length));
  };

  return (
    <>
      <section className="bg-[#FAF7F2] pb-20 pt-4 sm:pb-24 md:pb-28">
        <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-8 lg:px-10">
          {/* Gallery grid */}
          <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3 lg:gap-6">
            {visibleImages.map((image) => (
              <motion.div
                key={image.id}
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
              >
                <GalleryCard image={image} onExpand={handleExpand} />
              </motion.div>
            ))}
          </div>

          {/* See More button */}
          {hasMore && (
            <div className="mt-12 flex justify-center sm:mt-14">
              <button
                type="button"
                onClick={handleLoadMore}
                className="rounded-[30px] border-2 border-[#343B55] px-12 py-3 font-[family-name:var(--font-dm-sans)] text-sm font-semibold text-[#343B55] transition-all duration-200 hover:bg-[#343B55] hover:text-white"
              >
                {t("seeMore")}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <GalleryLightbox
        image={selectedImage}
        images={images}
        onClose={handleClose}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </>
  );
}
