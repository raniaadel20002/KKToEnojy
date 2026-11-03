"use client";

import { useTranslations } from "next-intl";
import type { TripType } from "@/src/features/tours/types/trip-type";

interface TripTypeFilterProps {
  tripTypes: TripType[];
  selectedTypeId: number | null;
  onSelectType: (typeId: number | null) => void;
}

export function TripTypeFilter({
  tripTypes,
  selectedTypeId,
  onSelectType,
}: TripTypeFilterProps) {
  const t = useTranslations("Tours");

  return (
    <div className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto flex-nowrap scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-1">
      {/* "All Tours" button */}
      <button
        type="button"
        onClick={() => onSelectType(null)}
        className={`shrink-0 rounded-[30px] px-5 py-2 md:px-6 md:py-2.5 text-sm transition-all duration-200 cursor-pointer ${
          selectedTypeId === null
            ? "bg-[#765438] text-white font-semibold border border-[#765438]"
            : "border border-[#888888] bg-white text-[#343B55] font-medium hover:border-[#765438]/60"
        }`}
      >
        {t("allTours")}
      </button>

      {/* Dynamic Trip Type buttons */}
      {tripTypes.map((type) => {
        const isActive = selectedTypeId === type.id;
        return (
          <button
            key={type.id}
            type="button"
            onClick={() => onSelectType(type.id)}
            className={`shrink-0 rounded-[30px] px-5 py-2 md:px-6 md:py-2.5 text-sm transition-all duration-200 cursor-pointer ${
              isActive
                ? "bg-[#765438] text-white font-semibold border border-[#765438]"
                : "border border-[#888888] bg-white text-[#343B55] font-medium hover:border-[#765438]/60"
            }`}
          >
            {type.name}
          </button>
        );
      })}
    </div>
  );
}
