"use client";

import Image from "next/image";
import type { TripImage } from "@/src/features/tours/types/trip";

interface TripGalleryProps {
  images: TripImage[];
}

export function TripGallery({ images }: TripGalleryProps) {
  const primaryImage = images.find((img) => img.isPrimary) || images[0];
  const otherImages = images.filter((img) => img.id !== primaryImage?.id);

  if (!primaryImage) {
    return (
      <div className="h-[300px] w-full rounded-[20px] bg-gray-200 sm:h-[420px]" />
    );
  }

  // Pool of extra thumbnails, repeating if fewer than 4 to keep the 2x2 visual grid
  const allThumbnails = otherImages.length > 0 ? otherImages : [primaryImage];
  const desktopThumbnails = [
    allThumbnails[0] || primaryImage,
    allThumbnails[1] || allThumbnails[0] || primaryImage,
    allThumbnails[2] || allThumbnails[0] || primaryImage,
    allThumbnails[3] || allThumbnails[1] || allThumbnails[0] || primaryImage,
  ];

  const mobileThumbnails = [
    allThumbnails[0] || primaryImage,
    allThumbnails[1] || allThumbnails[0] || primaryImage,
    allThumbnails[2] || allThumbnails[1] || allThumbnails[0] || primaryImage,
  ];

  return (
    <div className="mb-10 sm:mb-12">
      {/* Desktop / Tablet Layout (>= md) */}
      <div className="hidden h-[460px] gap-4 md:flex lg:h-[520px] lg:gap-5">
        {/* Main Big Featured Image (Left) */}
        <div className="relative h-full w-[56%] shrink-0 overflow-hidden rounded-[20px] shadow-[0px_8px_24px_0px_rgba(52,59,85,0.06)]">
          <Image
            src={primaryImage.imageUrl}
            alt="Main trip image"
            fill
            priority
            className="object-cover transition-transform duration-700 hover:scale-105"
            sizes="(min-width: 1024px) 720px, 60vw"
          />
        </div>

        {/* 2x2 Thumbnail Grid (Right) */}
        <div className="grid h-full flex-1 grid-cols-2 grid-rows-2 gap-4 lg:gap-5">
          {desktopThumbnails.map((img, index) => (
            <div
              key={`${img.id}-${index}`}
              className="relative h-full w-full overflow-hidden rounded-[20px] shadow-[0px_8px_24px_0px_rgba(52,59,85,0.06)]"
            >
              <Image
                src={img.imageUrl}
                alt="Trip gallery image"
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(min-width: 1024px) 280px, 20vw"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Layout (< md) */}
      <div className="flex flex-col gap-3 md:hidden">
        {/* Main Featured Image */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[20px] shadow-[0px_8px_24px_0px_rgba(52,59,85,0.06)]">
          <Image
            src={primaryImage.imageUrl}
            alt="Main trip image"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>

        {/* 3 Thumbnails row below */}
        <div className="grid grid-cols-3 gap-3">
          {mobileThumbnails.map((img, index) => (
            <div
              key={`mob-${img.id}-${index}`}
              className="relative aspect-[4/3] w-full overflow-hidden rounded-[16px] shadow-[0px_4px_16px_0px_rgba(52,59,85,0.06)]"
            >
              <Image
                src={img.imageUrl}
                alt="Trip gallery thumbnail"
                fill
                className="object-cover"
                sizes="33vw"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
