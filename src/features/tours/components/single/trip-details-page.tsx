"use client";

import { useEffect } from "react";
import { useTripQuery } from "@/src/features/tours/api/get-trip";
import { useTripReviewsQuery } from "@/src/features/tours/api/get-reviews";
import { extractIdFromSlug, generateSlug } from "@/src/features/tours/utils/slugify";

import { TripHeader } from "./trip-header";
import { TripTitle } from "./trip-title";
import { TripGallery } from "./trip-gallery";
import { TripDescription } from "./trip-description";
import { TripQuickInfo } from "./trip-quick-info";
import { TripBookingCard } from "./trip-booking-card";
import { TripInclusions } from "./trip-inclusions";
import { TripHighlights } from "./trip-highlights";
import { TripReviews } from "./trip-reviews";

interface TripDetailsPageProps {
  slug: string;
}

export function TripDetailsPage({ slug }: TripDetailsPageProps) {
  const tripId = extractIdFromSlug(slug);

  const { data: trip, isLoading: isTripLoading, error: tripError } = useTripQuery(
    tripId as number,
  );

  const { data: reviews = [], isLoading: isReviewsLoading } = useTripReviewsQuery(
    tripId as number,
  );

  useEffect(() => {
    if (trip && trip.name && tripId) {
      const expectedSlug = generateSlug(trip.id, trip.name);
      if (slug !== expectedSlug) {
        const newUrl =
          window.location.pathname.replace(slug, expectedSlug) + window.location.search;
        window.history.replaceState(null, "", newUrl);
      }
    }
  }, [trip, slug, tripId]);

  if (!tripId) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-[#FAF7F2]">
        <p className="font-[family-name:var(--font-dm-sans)] text-xl text-red-500">
          Invalid trip URL
        </p>
      </div>
    );
  }

  if (isTripLoading || isReviewsLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#FAF7F2]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#0E4A68] border-t-transparent" />
      </div>
    );
  }

  if (tripError || !trip) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 bg-[#FAF7F2]">
        <p className="font-[family-name:var(--font-dm-sans)] text-xl text-red-500">
          Failed to load trip details
        </p>
        <button
          onClick={() => window.location.reload()}
          className="rounded-full bg-[#343B55] px-6 py-2.5 font-[family-name:var(--font-dm-sans)] text-white hover:bg-[#0E4A68]"
        >
          Try Again
        </button>
      </div>
    );
  }

  const averageRating = reviews.length
    ? reviews.reduce((acc, r) => acc + r.rate, 0) / reviews.length
    : 4.9;

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* 1. Breadcrumb Header */}
      <TripHeader tripName={trip.name} />

      <main className="mx-auto w-full max-w-[1360px] px-5 pb-20 pt-2 sm:px-8 sm:pb-24 lg:px-12 lg:pb-28">
        {/* 2. Title & Metadata Sub-bar */}
        <TripTitle
          trip={trip}
          averageRating={averageRating}
          totalReviews={reviews.length}
        />

        {/* 3. Media Gallery */}
        <TripGallery images={trip.images} />

        {/* 4. Main Two-Column Layout */}
        <div className="mt-10 items-start sm:mt-12 lg:grid lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_380px] lg:gap-12 xl:gap-16">
          {/* Left Column */}
          <div className="min-w-0">
            {/* About this tour */}
            <TripDescription description={trip.description} />

            {/* Tour Key Info Card */}
            <div className="mt-6">
              <TripQuickInfo trip={trip} />
            </div>

            {/* Booking Card on Mobile only (sits right under key info) */}
            <div className="mt-6 block lg:hidden">
              <TripBookingCard trip={trip} />
            </div>

            {/* What's included */}
            <div className="mt-8 sm:mt-10">
              <TripInclusions
                includes={trip.includes}
                excludes={trip.excludes}
              />
            </div>

            {/* Tour highlights */}
            <TripHighlights highlights={trip.highlights} />

            {/* Reviews Section + Add Review */}
            <TripReviews tripId={trip.id} reviews={reviews} />
          </div>

          {/* Right Column: Sticky Booking Card (Desktop) */}
          <aside className="sticky top-28 hidden lg:block">
            <TripBookingCard trip={trip} />
          </aside>
        </div>
      </main>
    </div>
  );
}
