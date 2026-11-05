"use client";

import { Clock, Users, Calendar, Compass } from "lucide-react";
import { useTranslations } from "next-intl";
import type { Trip } from "@/src/features/tours/types/trip";

interface TripQuickInfoProps {
  trip: Trip;
}

export function TripQuickInfo({ trip }: TripQuickInfoProps) {
  const t = useTranslations("TripDetails.keyInfo");

  const availabilityText =
    trip.availableDays.length === 7 || trip.availableDays.length === 0
      ? t("daily")
      : trip.availableDays.join(", ");

  const items = [
    {
      icon: Clock,
      label: t("duration"),
      value: `${trip.durationValue} ${trip.durationTypeName}`,
    },
    {
      icon: Users,
      label: t("groupSize"),
      value: t("groupSizeValue"),
    },
    {
      icon: Calendar,
      label: t("availability"),
      value: availabilityText,
    },
    {
      icon: Compass,
      label: t("tourType"),
      value: trip.tripTypeName || t("historical"),
    },
  ];

  return (
    <div className="rounded-[20px] bg-white p-5 shadow-[0px_8px_24px_0px_rgba(52,59,85,0.06)] border border-[#343B5510] sm:p-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="flex items-center gap-3.5"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#19839912] text-[#198399]">
                <Icon size={19} />
              </div>
              <div className="flex flex-col">
                <span className="font-[family-name:var(--font-dm-sans)] text-xs text-[#5B6B73]">
                  {item.label}
                </span>
                <span className="font-[family-name:var(--font-dm-sans)] text-sm font-bold text-[#343B55] sm:text-[15px]">
                  {item.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
