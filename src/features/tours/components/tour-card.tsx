"use client";

import { MapPin, Star, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import type { Trip } from "@/src/features/tours/types/trip";
import { formatPrice } from "@/src/features/tours/utils/format-price";
import { generateTripSlug } from "@/src/features/tours/utils/slugify";
import { AvailabilityModal } from "./single/availability-modal";
import type { AppLocale } from "@/src/i18n/locales";

interface TourCardProps {
  trip: Trip;
}

export function TourCard({ trip }: TourCardProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const locale = useLocale() as AppLocale;
  const t = useTranslations("Tours");

  const primaryImage =
    trip.images.find((img) => img.isPrimary) || trip.images[0];

  const tripUrl = `/${locale}/trips/${generateTripSlug(trip.id, trip.name)}`;

  return (
    <>
      <div
        onClick={() => router.push(tripUrl)}
        className="group flex flex-col h-full min-h-[520px] w-full shrink-0 cursor-pointer overflow-hidden rounded-[24px] bg-white shadow-lg transition-transform hover:scale-[1.02] md:min-h-[540px]"
      >
        {/* Image */}
        <div className="relative h-[240px] shrink-0 w-full overflow-hidden">
          {primaryImage ? (
            <Image
              src={primaryImage.imageUrl}
              alt={trip.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover"
            />
          ) : (
            <div className="h-full w-full bg-gray-200" />
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-5 pb-4">
          <p className="mb-2 h-[20px] overflow-hidden text-xs font-semibold uppercase tracking-wide text-[#979BA7]">
            {trip.tripTypeName}
          </p>

          <h3 className="mb-3 text-lg font-semibold text-[var(--color-deep-ocean)]">
            {trip.name}
          </h3>

          <div className="mb-3 flex h-[24px] items-center gap-1.5 text-sm text-[var(--color-muted)]">
            <MapPin size={16} className="shrink-0" />
            <span className="truncate">{trip.destinationInfo.name}</span>
          </div>

          <div className="mb-4 flex h-[24px] items-center justify-between text-sm">
            <div className="flex items-center gap-1.5">
              <Star size={16} className="fill-orange-500 text-orange-500" />
              <span className="font-medium text-gray-700">4.8 (345 Review)</span>
            </div>
            <div className="flex items-center gap-1">
              {trip.adultPrice > 0 && <span className="text-[var(--color-muted)]">€</span>}
              <span className="font-semibold text-[#69DD84]">
                {trip.adultPrice === 0 ? "Contact us for price" : formatPrice(trip.adultPrice, trip.currencyName)}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-auto flex flex-col gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                router.push(tripUrl);
              }}
              className="h-[44px] w-full rounded-full bg-[var(--color-deep-ocean)] font-semibold text-white transition-colors hover:bg-[var(--color-ocean)]"
            >
              {t("bookNow")}
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
              }}
              className="flex h-[44px] w-full items-center justify-center gap-2 rounded-full border-2 border-[var(--color-deep-ocean)] font-semibold text-[var(--color-deep-ocean)] transition-colors hover:bg-slate-50"
            >
              <ShoppingCart size={16} />
              {t("addToCart")}
            </button>
          </div>
        </div>
      </div>

      <AvailabilityModal
        trip={trip}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
