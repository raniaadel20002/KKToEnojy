"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  HeroDestinationCard,
  type LocalizedHeroDestination,
} from "@/src/features/hero/components/hero-destination-card";

interface HeroDestinationCardsProps {
  activeSlideIndex: number;
  destinations: LocalizedHeroDestination[];
  getDestinationViewLabel: (destination: string) => string;
  previousSlideLabel: string;
  nextSlideLabel: string;
  onCardClick: (slideIndex: number) => void;
  onPrev: () => void;
  onNext: () => void;
}

/** Mobile-only card row: ← | Red Sea | Luxor | Giza | → */
/** Mobile card row: arrows at absolute edges, 3 tall cards in center */
export function HeroDestinationCards({
  activeSlideIndex,
  destinations,
  getDestinationViewLabel,
  previousSlideLabel,
  nextSlideLabel,
  onCardClick,
  onPrev,
  onNext,
}: HeroDestinationCardsProps) {
  return (
    <div className="relative flex items-center justify-center px-3">
      {/* Prev arrow — absolute left edge */}
      <button
        type="button"
        aria-label={previousSlideLabel}
        onClick={onPrev}
        className="absolute left-3 z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/60 bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      >
        <ChevronLeft size={18} strokeWidth={2} />
      </button>

      {/* 3 tall cards centered */}
      <div className="flex items-end justify-center gap-3 px-12">
        {destinations.map((dest) => (
          <HeroDestinationCard
            key={dest.id}
            destination={dest}
            isActive={activeSlideIndex === dest.slideIndex}
            onClick={() => onCardClick(dest.slideIndex)}
            viewLabel={getDestinationViewLabel(dest.label)}
            variant="mobile"
          />
        ))}
      </div>

      {/* Next arrow — absolute right edge */}
      <button
        type="button"
        aria-label={nextSlideLabel}
        onClick={onNext}
        className="absolute right-3 z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/60 bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      >
        <ChevronRight size={18} strokeWidth={2} />
      </button>
    </div>
  );
}
