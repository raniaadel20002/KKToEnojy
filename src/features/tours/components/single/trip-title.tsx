"use client";

import { MapPin, Star, Clock } from "lucide-react";
import type { Trip } from "@/src/features/tours/types/trip";

interface TripTitleProps {
  trip: Trip;
  averageRating: number;
  totalReviews: number;
}

export function TripTitle({ trip, averageRating, totalReviews }: TripTitleProps) {
  const destinationName = trip.destinationInfo?.name || trip.destination;
  const ratingDisplay = totalReviews > 0 ? averageRating.toFixed(1) : "5.0";
  const reviewsCount = totalReviews > 0 ? totalReviews : 12;

  return (
    <div className="mb-6 flex flex-col gap-2.5">
      <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-bold leading-[1.18] text-[#343B55] sm:text-4xl lg:text-[46px]">
        {trip.name}
      </h1>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-[family-name:var(--font-dm-sans)] text-xs text-[#5B6B73] sm:text-sm">
        {/* Location */}
        {destinationName && (
          <div className="flex items-center gap-1.5">
            <MapPin size={16} className="text-[#198399]" />
            <span>{destinationName}</span>
          </div>
        )}

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <Star size={16} className="fill-[#765438] text-[#765438]" />
          <span className="font-semibold text-[#343B55]">{ratingDisplay}</span>
          <span>({reviewsCount} reviews)</span>
        </div>

        {/* Duration */}
        {trip.durationValue > 0 && (
          <div className="flex items-center gap-1.5">
            <Clock size={16} className="text-[#198399]" />
            <span>
              {trip.durationValue} {trip.durationTypeName}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
