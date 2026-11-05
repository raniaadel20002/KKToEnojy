"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { Trip } from "@/src/features/tours/types/trip";
import { formatPrice } from "@/src/features/tours/utils/format-price";
import { AvailabilityModal } from "./availability-modal";

interface TripBookingCardProps {
  trip: Trip;
}

export function TripBookingCard({ trip }: TripBookingCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = useTranslations("TripDetails.booking");

  return (
    <>
      <div className="rounded-[20px] bg-white p-6 shadow-[0px_8px_24px_0px_rgba(52,59,85,0.06)] border border-[#343B5510] sm:p-7">
        <div className="flex flex-col gap-4 font-[family-name:var(--font-dm-sans)]">
          {/* Adult Price Row */}
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-normal text-[#5B6B73]">
              {t("adult")}
            </span>
            <span className="text-base font-bold text-[#343B55] sm:text-lg">
              {trip.adultPrice === 0
                ? t("contactUs")
                : `${formatPrice(trip.adultPrice, trip.currencyName)} / ${t("perPerson")}`}
            </span>
          </div>

          {/* Child Price Row */}
          {trip.childPrice > 0 && (
            <div className="flex items-baseline justify-between border-t border-gray-100 pt-3">
              <span className="text-sm font-normal text-[#5B6B73]">
                {t("children")}
              </span>
              <span className="text-base font-bold text-[#343B55] sm:text-lg">
                {formatPrice(trip.childPrice, trip.currencyName)} / ${t("perPerson")}
              </span>
            </div>
          )}

          {/* Check Availability CTA Button */}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="mt-3 w-full rounded-full bg-[#343B55] py-3.5 sm:py-4 text-center font-[family-name:var(--font-dm-sans)] text-sm sm:text-base font-bold text-white transition-all hover:bg-[#0E4A68] hover:shadow-md"
          >
            {t("checkAvailability")}
          </button>
        </div>
      </div>

      {/* Booking Date & Availability Modal */}
      <AvailabilityModal
        trip={trip}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
