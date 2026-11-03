"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useGalleryImagesQuery } from "@/src/features/gallery/api/get-gallery-images";
import { GalleryLightbox } from "@/src/features/gallery/components/gallery-lightbox";

// Animation Variants
const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const cameraVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut", delay: 0.2 },
  },
};

export function HomeGallerySection() {
  const { data: images, isLoading, error } = useGalleryImagesQuery();
  const t = useTranslations("Gallery");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);


  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);

  // Take up to 6 images to match the 6 dots in design
  const displayImages = images && images.length > 0 ? images.slice(0, 6) : [];

  const handlePrev = useCallback(() => {
    if (displayImages.length === 0) return;
    setCurrentIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1));
  }, [displayImages.length]);

  const handleNext = useCallback(() => {
    if (displayImages.length === 0) return;
    setCurrentIndex((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1));
  }, [displayImages.length]);

  // Subtle auto-advance every 5 seconds (pauses on hover)
  useEffect(() => {
    if (displayImages.length <= 1 || isPaused) return;
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [displayImages.length, isPaused, handleNext]);

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center bg-[#343B55] py-20 text-white/70">
        {t("loading")}
      </div>
    );
  }

  if (error || !images || images.length === 0) {
    return null;
  }

  const currentImage = displayImages[currentIndex] || images[0];

  return (
    <section className="relative w-full overflow-hidden bg-[#343B55] py-16 md:py-20 lg:py-24">
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="mx-auto w-full max-w-[1320px] px-4 md:px-8 lg:px-10"
      >
        {/* Header Block */}
        <div className="mb-10 flex flex-col items-center text-center md:mb-14">
          <motion.h2
            variants={itemVariants}
            className="font-[family-name:var(--font-playfair)] text-3xl font-bold leading-tight text-white md:text-4xl lg:text-[44px]"
          >
            {t("title")}
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-2 font-[family-name:var(--font-dm-sans)] text-sm font-normal text-white/80 md:text-base"
          >
            {t("subtitle")}
          </motion.p>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 117 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="mt-3.5 h-2 w-[117px] rounded-[20px] bg-[#198399]"
          />
        </div>

        {/* Camera Display Graphic */}
        <motion.div
          variants={cameraVariants}
          className="relative mx-auto w-full max-w-[760px] aspect-[869/650] select-none"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* LCD Screen Container */}
          {/* LCD Screen Container */}
          <div
            className="absolute z-0 overflow-hidden bg-black rounded-[4px] sm:rounded-[6px]"
            style={{
              left: "16.0%",
              top: "44.62%",
              width: "46.61%",
              height: "41.85%",
              touchAction: "pan-y",
            }}
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              dragStartX.current = e.clientX;
              setIsPaused(true);
            }}
            onPointerMove={(e) => {
              if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;

              const diff = e.clientX - dragStartX.current;

              if (Math.abs(diff) >= 60) {
                if (diff < 0) handleNext();
                else handlePrev();

                dragStartX.current = e.clientX;
              }
            }}
            onPointerUp={() => setIsPaused(false)}
            onPointerCancel={() => setIsPaused(false)}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
                onClick={() => setLightboxIndex(currentIndex)}
                className="relative h-full w-full cursor-grab active:cursor-grabbing"
              >
                <Image
                  src={currentImage.imageUrl}
                  alt="Traveler gallery memory"
                  fill
                  priority
                  draggable={false}
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* DSLR Camera Body Frame (layered on top with transparent screen cutout) */}
          <div className="relative z-10 h-full w-full pointer-events-none">
            <Image
              src="/camera.png"
              alt="Camera display"
              fill
              priority
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 820px"
            />
          </div>
        </motion.div>

        {/* Carousel Navigation Controls (Left arrow, dots, Right arrow) */}
        <motion.div
          variants={itemVariants}
          className="mt-8 flex items-center justify-center gap-6 sm:gap-8 md:mt-10"
        >
          {/* Previous Button */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label={t("prev")}
            className="flex size-11 items-center justify-center rounded-full border border-white/60 text-white transition-all hover:scale-105 hover:bg-white hover:text-[#343B55] active:scale-95 cursor-pointer md:size-12"
          >
            <ArrowLeft size={20} />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2.5">
            {displayImages.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to photo ${i + 1}`}
                className={`rounded-full transition-all duration-300 cursor-pointer ${i === currentIndex
                  ? "h-2.5 w-2.5 bg-white scale-110"
                  : "h-2 w-2 bg-white/40 hover:bg-white/70"
                  }`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            type="button"
            onClick={handleNext}
            aria-label={t("next")}
            className="flex size-11 items-center justify-center rounded-full border border-white/60 text-white transition-all hover:scale-105 hover:bg-white hover:text-[#343B55] active:scale-95 cursor-pointer md:size-12"
          >
            <ArrowRight size={20} />
          </button>
        </motion.div>
      </motion.div>

      {/* Fullscreen Lightbox when clicked */}
      {lightboxIndex !== null && (
        <GalleryLightbox
          image={displayImages[lightboxIndex]}
          images={displayImages}
          onClose={() => setLightboxIndex(null)}
          onNext={() =>
            setLightboxIndex((prev) =>
              prev !== null && prev < displayImages.length - 1 ? prev + 1 : 0
            )
          }
          onPrev={() =>
            setLightboxIndex((prev) =>
              prev !== null && prev > 0 ? prev - 1 : displayImages.length - 1
            )
          }
        />
      )}
    </section>
  );
}
