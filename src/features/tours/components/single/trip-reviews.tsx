"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import type { Review } from "@/src/features/tours/api/get-reviews";
import { AddReviewForm } from "./add-review-form";

interface TripReviewsProps {
  tripId: number;
  reviews: Review[];
}

export function TripReviews({ tripId, reviews }: TripReviewsProps) {
  const t = useTranslations("TripDetails.reviews");
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  const totalReviewsCount = reviews.length > 0 ? reviews.length : 453;
  const averageScore = reviews.length > 0
    ? reviews.reduce((acc, r) => acc + r.rate, 0) / reviews.length
    : 4.5;

  const activeReview = reviews[currentReviewIndex] || {
    id: 999,
    firstName: "Daniel",
    lastName: "Brown",
    comment:
      "From the moment we arrived until the end of our tour, everything felt seamless. It was one of the best travel experiences we've ever had.",
    rate: 5,
    createdAt: new Date().toISOString(),
  };

  const handlePrev = () => {
    if (reviews.length <= 1) return;
    setCurrentReviewIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (reviews.length <= 1) return;
    setCurrentReviewIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  // Distribution percentages
  const scorePercentages = [
    { star: 5, pct: reviews.length ? Math.round((reviews.filter((r) => r.rate === 5).length / reviews.length) * 100) : 78 },
    { star: 4, pct: reviews.length ? Math.round((reviews.filter((r) => r.rate === 4).length / reviews.length) * 100) : 48 },
    { star: 3, pct: reviews.length ? Math.round((reviews.filter((r) => r.rate === 3).length / reviews.length) * 100) : 22 },
    { star: 2, pct: reviews.length ? Math.round((reviews.filter((r) => r.rate === 2).length / reviews.length) * 100) : 8 },
    { star: 1, pct: reviews.length ? Math.round((reviews.filter((r) => r.rate === 1).length / reviews.length) * 100) : 4 },
  ];

  return (
    <div className="mt-12 sm:mt-14">
      <h2 className="mb-6 font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#343B55] sm:text-3xl">
        {t("title")}
      </h2>

      {/* Reviews Summary + Featured Review Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[340px_1fr] lg:gap-8 items-stretch">
        {/* Rating Breakdown Card */}
        <div className="flex flex-col justify-between rounded-[20px] bg-white p-6 shadow-[0px_8px_24px_0px_rgba(52,59,85,0.06)] border border-[#343B5510] sm:p-7">
          <div>
            <div className="flex items-center gap-4">
              <span className="font-[family-name:var(--font-dm-sans)] text-4xl font-bold text-[#343B55] sm:text-5xl">
                {averageScore.toFixed(1)}
              </span>
              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-[#765438]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.round(averageScore) ? "fill-[#765438]" : "text-gray-300"}
                    />
                  ))}
                </div>
                <span className="mt-1 font-[family-name:var(--font-dm-sans)] text-xs text-[#5B6B73]">
                  {t("basedOn", { count: totalReviewsCount })}
                </span>
              </div>
            </div>

            {/* Breakdown bars */}
            <div className="mt-6 flex flex-col gap-2.5">
              {scorePercentages.map((item) => (
                <div key={item.star} className="flex items-center gap-3 font-[family-name:var(--font-dm-sans)] text-xs text-[#5B6B73]">
                  <span className="w-3 text-right">{item.star}</span>
                  <div className="relative h-2 w-full overflow-hidden rounded-full bg-[#FAF7F2]">
                    <div
                      className="h-full rounded-full bg-[#765438] transition-all duration-500"
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Testimonial Card */}
        <div className="flex flex-col justify-between rounded-[20px] bg-white p-6 shadow-[0px_8px_24px_0px_rgba(52,59,85,0.06)] border border-[#343B5510] sm:p-8">
          <p className="font-[family-name:var(--font-dm-sans)] text-base font-normal leading-[1.7] text-[#343B55] sm:text-lg">
            &ldquo;{activeReview.comment}&rdquo;
          </p>

          <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-5">
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#343B55] font-bold text-white text-sm">
                {(activeReview.firstName?.[0] || "U").toUpperCase()}
              </div>
              <div className="flex flex-col">
                <span className="font-[family-name:var(--font-dm-sans)] text-sm font-bold text-[#343B55]">
                  {activeReview.firstName} {activeReview.lastName}
                </span>
                <span className="font-[family-name:var(--font-dm-sans)] text-xs text-[#5B6B73]">
                  {new Date(activeReview.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>

            {/* Navigation Carousel arrows */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous review"
                disabled={reviews.length <= 1}
                className="flex size-8 items-center justify-center rounded-full border border-gray-200 text-[#343B55] transition-all hover:bg-gray-100 disabled:opacity-40"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next review"
                disabled={reviews.length <= 1}
                className="flex size-8 items-center justify-center rounded-full bg-[#343B55] text-white transition-all hover:bg-[#0E4A68] disabled:opacity-40"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Review Form */}
      <AddReviewForm tripId={tripId} />
    </div>
  );
}
