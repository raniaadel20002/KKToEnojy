"use client";

import Image from "next/image";
import { Trash2, MapPin, CalendarDays, Users } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import type { CartItem } from "@/src/store/use-cart-store";
import { formatPrice } from "@/src/features/tours/utils/format-price";
import type { AppLocale } from "@/src/i18n/locales";

interface CartItemCardProps {
  item: CartItem;
  onRemove: (id: string) => void;
}

const dateLocaleByLocale: Record<AppLocale, string> = {
  en: "en-GB",
  fr: "fr-FR",
  de: "de-DE",
  pl: "pl-PL",
};

export function CartItemCard({ item, onRemove }: CartItemCardProps) {
  const locale = useLocale() as AppLocale;
  const t = useTranslations("CartPage.item");
  const primaryImage =
    item.trip.images.find((img) => img.isPrimary) ?? item.trip.images[0];

  const totalTravellers = item.adultCount + item.childCount;

  // Format date: e.g. "20 June 2026"
  const [year, month, day] = item.date.split("-").map(Number);
  const localDate = new Date(year, month - 1, day);
  const formattedDate = localDate.toLocaleDateString(dateLocaleByLocale[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const adultSubtotal = item.adultCount * item.trip.adultPrice;
  const childSubtotal = item.childCount * item.trip.childPrice;
  const healthInsuranceCost = item.extraServices?.healthInsurance ? 30 : 0;
  const medicalInsuranceCost = item.extraServices?.medicalInsurance ? 50 : 0;
  const total = adultSubtotal + childSubtotal + healthInsuranceCost + medicalInsuranceCost;

  // Category or duration tag
  const categoryName =
    item.trip.tripTypeName || item.trip.durationTypeName || "Tour";

  return (
    <div className="relative flex flex-col sm:flex-row items-start gap-5 rounded-[24px] bg-white p-5 sm:p-6 shadow-sm border border-[#EDE7DC]/50 transition-shadow hover:shadow-md">
      {/* Thumbnail */}
      {primaryImage && (
        <div className="relative h-48 w-full sm:h-36 sm:w-44 shrink-0 overflow-hidden rounded-[18px]">
          <Image
            src={primaryImage.imageUrl}
            alt={item.trip.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 176px"
          />
        </div>
      )}

      {/* Main Details */}
      <div className="flex flex-1 flex-col justify-between w-full">
        {/* Title & Category Badge */}
        <div className="pr-12">
          <h3 className="font-serif text-lg sm:text-xl font-bold text-[#343B55] leading-snug">
            {item.trip.name}
          </h3>
          <div className="mt-1.5">
            <span className="inline-flex items-center rounded-full bg-[#E6F4F7] px-3 py-0.5 text-xs font-medium text-[#198399]">
              {categoryName}
            </span>
          </div>
        </div>

        {/* Metadata row: Location, Date, Travelers */}
        <div className="mt-3.5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm text-[#5B6B73]">
          {item.trip.destination && (
            <div className="flex items-center gap-1.5">
              <MapPin size={15} className="text-[#198399]" />
              <span>{item.trip.destination}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <CalendarDays size={15} className="text-[#198399]" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users size={15} className="text-[#198399]" />
            <span>
              {item.adultCount} {item.adultCount === 1 ? "Adult" : "Adults"}
              {item.childCount > 0 && `, ${item.childCount} ${item.childCount === 1 ? "Child" : "Children"}`}
            </span>
          </div>
        </div>

        {/* Pricing */}
        <div className="mt-4 flex flex-col justify-end">
          <span className="text-xs text-[#7A8B94]">
            {item.trip.adultPrice === 0
              ? "Contact us for price"
              : `${formatPrice(item.trip.adultPrice, item.trip.currencyName)} ${t("perPerson")}`}
          </span>
          <span className="font-serif text-2xl font-bold text-[#343B55]">
            {(item.trip.adultPrice === 0 && item.adultCount > 0) || (item.trip.childPrice === 0 && item.childCount > 0)
              ? total > 0
                ? `${formatPrice(total, item.trip.currencyName)} + Contact us for price`
                : "Contact us for price"
              : formatPrice(total, item.trip.currencyName)}
          </span>
        </div>
      </div>

      {/* Delete / Trash Button (Circular Red Outline matching cart.png) */}
      <button
        type="button"
        onClick={() => onRemove(item.id)}
        aria-label={t("removeAria", { name: item.trip.name })}
        className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-[#F07267]/60 bg-white text-[#F07267] shadow-sm transition-all hover:bg-[#FFF5F5] hover:border-[#F07267] active:scale-95 cursor-pointer"
      >
        <Trash2 size={17} strokeWidth={2.2} />
      </button>
    </div>
  );
}
