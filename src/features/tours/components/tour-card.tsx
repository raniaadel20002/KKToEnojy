"use client";

import { MapPin, Star, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

import type { Trip } from "@/src/features/tours/types/trip";
import { generateTripSlug } from "@/src/features/tours/utils/slugify";
import { getNextAvailableDate } from "@/src/features/tours/utils/get-next-available-date";
import { useCartStore } from "@/src/store/use-cart-store";
import { useToastStore } from "@/src/store/use-toast-store";
import type { AppLocale } from "@/src/i18n/locales";

interface TourCardProps {
  trip: Trip;
}

export function TourCard({ trip }: TourCardProps) {
  const router = useRouter();
  const locale = useLocale() as AppLocale;
  const t = useTranslations("Tours");
  const addItem = useCartStore((state) => state.addItem);
  const showToast = useToastStore((state) => state.showToast);

  const primaryImage =
    trip.images.find((img) => img.isPrimary) || trip.images[0];

  const tripUrl = `/${locale}/trips/${generateTripSlug(trip.id, trip.name)}`;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    const dateStr = getNextAvailableDate(trip.availableDays);
    addItem({
      id: `${trip.id}-${dateStr}`,
      trip,
      date: dateStr,
      adultCount: 1,
      childCount: 0,
    });
    showToast(trip.name);
  };

  const formattedPrice =
    trip.adultPrice === 0
      ? "Contact us"
      : `${trip.currencyName === "EUR" ? "€" : "$"}${trip.adultPrice} ${trip.currencyName || "USA"}`;

  return (
    <div
      onClick={() => router.push(tripUrl)}
      className="group relative flex flex-col h-full w-full bg-white border border-[#EDE7DC] rounded-[20px] shadow-[0px_12px_32px_0px_rgba(14,74,104,0.1)] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-[210px] sm:h-[220px] w-full shrink-0 overflow-hidden rounded-t-[20px] bg-gray-100">
        {primaryImage ? (
          <Image
            src={primaryImage.imageUrl}
            alt={trip.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-[#EDE7DC]" />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Category Label */}
        <p className="text-xs md:text-sm font-medium text-[#198399] tracking-normal mb-1.5">
          {trip.tripTypeName}
        </p>

        {/* Title */}
        <h3 className="text-base md:text-lg font-semibold text-[#343B55] line-clamp-1 mb-2.5">
          {trip.name}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-xs text-[#5B6B73] font-normal mb-3">
          <MapPin size={15} className="text-[#198399] shrink-0" />
          <span className="truncate">{trip.destinationInfo?.name || trip.destination || "Egypt"}</span>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[#EDE7DC] mb-3.5" />

        {/* Rating & Reviews + Price */}
        <div className="flex items-center justify-between gap-2 mt-auto mb-5">
          <div className="flex items-center gap-1.5">
            <Star size={15} className="fill-[#765438] text-[#765438] shrink-0" />
            <span className="font-semibold text-sm text-[#343B55]">4.8</span>
            <span className="text-xs text-[#5B6B73] font-normal">(345 Review)</span>
          </div>
          <span className="text-sm md:text-base font-bold text-[#198399] shrink-0">
            {formattedPrice}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5 w-full">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              router.push(tripUrl);
            }}
            className="h-[46px] w-full rounded-[30px] bg-[#343B55] text-white text-sm font-semibold transition-colors hover:bg-[#262c40] flex items-center justify-center cursor-pointer shadow-sm"
          >
            {t("bookNow")}
          </button>
          <button
            type="button"
            onClick={handleAddToCart}
            className="h-[46px] w-full rounded-[30px] border-[1.5px] border-[#343B55] bg-transparent text-[#343B55] text-sm font-semibold transition-colors hover:bg-[#343B55]/5 flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShoppingCart size={17} className="text-[#343B55]" strokeWidth={1.5} />
            <span>{t("addToCart")}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
