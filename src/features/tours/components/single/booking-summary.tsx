"use client";

import Image from "next/image";
import { CalendarDays, X } from "lucide-react";
import type { Trip } from "@/src/features/tours/types/trip";
import { formatPrice } from "@/src/features/tours/utils/format-price";

interface BookingSummaryProps {
  trip: Trip;
  selectedDate: Date | null;
  adultCount: number;
  childCount: number;
  extraServices?: {
    healthInsurance?: boolean;
    medicalInsurance?: boolean;
  };
  onResetDate?: () => void;
}

export function BookingSummary({
  trip,
  selectedDate,
  adultCount,
  childCount,
  extraServices = {},
  onResetDate,
}: BookingSummaryProps) {
  const primaryImage =
    trip.images.find((img) => img.isPrimary) ?? trip.images[0];

  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      })
    : "—";

  const adultSubtotal = adultCount * trip.adultPrice;
  const childSubtotal = childCount * trip.childPrice;
  const healthInsuranceCost = extraServices.healthInsurance ? 30 : 0;
  const medicalInsuranceCost = extraServices.medicalInsurance ? 50 : 0;
  const total = adultSubtotal + childSubtotal + healthInsuranceCost + medicalInsuranceCost;

  const hasExtraServices = extraServices.healthInsurance || extraServices.medicalInsurance;

  return (
    <div className="flex flex-col rounded-2xl border border-[#EDE7DC] bg-white p-5 shadow-sm">
      <h3 className="font-serif text-lg font-bold text-[#343B55] mb-4">
        Booking summary
      </h3>

      {/* Mini Trip Card */}
      <div className="relative flex items-start gap-3 rounded-xl bg-[#FAF7F2] p-3.5">
        {primaryImage && (
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
            <Image
              src={primaryImage.imageUrl}
              alt={trip.name}
              fill
              className="object-cover"
              sizes="56px"
            />
          </div>
        )}
        <div className="flex flex-1 flex-col pr-6">
          <p className="text-xs sm:text-sm font-semibold text-[#343B55] line-clamp-2 leading-snug">
            {trip.name}
          </p>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-[#5B6B73]">
            <CalendarDays size={13} className="text-[#198399]" />
            <span>{formattedDate}</span>
          </div>
        </div>

        {onResetDate && (
          <button
            type="button"
            onClick={onResetDate}
            aria-label="Clear date"
            className="absolute right-2.5 top-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-gray-200/70 hover:bg-gray-300 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
          >
            <X size={12} strokeWidth={2.5} />
          </button>
        )}
      </div>

      {/* Package Section */}
      <div className="mt-4 flex flex-col gap-1.5">
        <p className="text-[11px] font-bold uppercase tracking-wider text-[#8C9BA5]">
          PACKAGE
        </p>

        <div className="flex items-center justify-between text-xs font-medium text-[#343B55]">
          <span>
            Adult: {adultCount} x{" "}
            {trip.adultPrice === 0 ? "Free" : formatPrice(trip.adultPrice, trip.currencyName)}
          </span>
          <span className="font-semibold">
            {trip.adultPrice === 0 ? "Free" : formatPrice(adultSubtotal, trip.currencyName)}
          </span>
        </div>

        {trip.childPrice > 0 && childCount > 0 && (
          <div className="flex items-center justify-between text-xs font-medium text-[#343B55]">
            <span>
              Child: {childCount} x{" "}
              {trip.childPrice === 0 ? "Free" : formatPrice(trip.childPrice, trip.currencyName)}
            </span>
            <span className="font-semibold">
              {trip.childPrice === 0 ? "Free" : formatPrice(childSubtotal, trip.currencyName)}
            </span>
          </div>
        )}
      </div>

      {/* Extra Services Section */}
      {hasExtraServices && (
        <div className="mt-4 flex flex-col gap-1.5">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#8C9BA5]">
            EXTRA SERVICES
          </p>

          {extraServices.healthInsurance && (
            <div className="flex items-center justify-between text-xs font-medium text-[#343B55]">
              <span>Health insurance</span>
              <span className="font-semibold">$30</span>
            </div>
          )}

          {extraServices.medicalInsurance && (
            <div className="flex items-center justify-between text-xs font-medium text-[#343B55]">
              <span>Medical insurance</span>
              <span className="font-semibold">$50</span>
            </div>
          )}
        </div>
      )}

      {/* Divider */}
      <div className="my-4 h-px w-full bg-[#EDE7DC]" />

      {/* Total */}
      <div className="flex items-center justify-between">
        <span className="font-serif text-base font-bold text-[#343B55]">
          Total
        </span>
        <span className="font-serif text-2xl font-bold text-[#765438]">
          {(trip.adultPrice === 0 && adultCount > 0) || (trip.childPrice === 0 && childCount > 0)
            ? total > 0
              ? `${formatPrice(total, trip.currencyName)}`
              : "Free"
            : formatPrice(total, trip.currencyName)}
        </span>
      </div>
    </div>
  );
}
