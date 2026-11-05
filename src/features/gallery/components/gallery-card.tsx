"use client";

import Image from "next/image";
import { Expand } from "lucide-react";

import type { GalleryImage } from "@/src/features/gallery/types/gallery";

interface GalleryCardProps {
  image: GalleryImage;
  onExpand: (image: GalleryImage) => void;
}

export function GalleryCard({ image, onExpand }: GalleryCardProps) {
  return (
    <div
      className="group relative cursor-pointer overflow-hidden rounded-[16px] shadow-[0px_4px_20px_0px_rgba(14,74,104,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0px_12px_32px_0px_rgba(14,74,104,0.16)] sm:rounded-[20px]"
      onClick={() => onExpand(image)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter") onExpand(image); }}
      aria-label={`View gallery image ${image.id}`}
    >
      {/* Square image */}
      <div className="relative aspect-square w-full bg-[#EDE7DC]">
        <Image
          src={image.imageUrl}
          alt={`Gallery image ${image.id}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Dark overlay on hover */}
        <div className="absolute inset-0 bg-[#343B55]/0 transition-all duration-300 group-hover:bg-[#343B55]/20" />

        {/* Expand icon — always visible on mobile, hover on desktop */}
        <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-[10px] bg-white/90 shadow-sm transition-all duration-200 group-hover:opacity-100 md:opacity-0 sm:h-10 sm:w-10">
          <Expand size={16} className="text-[#343B55]" strokeWidth={1.8} />
        </div>
      </div>
    </div>
  );
}
