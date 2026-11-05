"use client";

import { ChevronDown, MapPin, Tag } from "lucide-react";
import { useTranslations } from "next-intl";

import { useDestinationsQuery } from "@/src/features/categories/api/get-destinations";
import { useTripTypesQuery } from "@/src/features/tours/api/get-trip-types";

interface TripsSidebarProps {
  filters: {
    destinationId?: number;
    minPrice?: number;
    maxPrice?: number;
    typeId?: number;
    searchItem?: string;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      destinationId?: number;
      minPrice?: number;
      maxPrice?: number;
      typeId?: number;
      searchItem?: string;
    }>
  >;
  onClearFilters: () => void;
}

export function TripsSidebar({
  filters,
  setFilters,
  onClearFilters,
}: TripsSidebarProps) {
  const { data: destinations } = useDestinationsQuery(false);
  const { data: tripTypes } = useTripTypesQuery();
  const t = useTranslations("TripsPage");

  return (
    <div className="flex w-full flex-col gap-6 font-[family-name:var(--font-dm-sans)]">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[#EDE7DC]">
        <h3 className="text-base font-semibold text-[#343B55]">
          {t("filters.filterButton")}
        </h3>
        <button
          onClick={onClearFilters}
          className="text-xs font-semibold text-[#198399] transition-colors hover:underline cursor-pointer"
        >
          {t("filters.clearAll")}
        </button>
      </div>

      {/* Trip Type */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#343B55]">
          <Tag size={16} className="text-[#198399]" />
          <span>{t("filters.tripType")}</span>
        </div>
        <div className="relative">
          <select
            value={filters.typeId || ""}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                typeId: e.target.value ? Number(e.target.value) : undefined,
              }))
            }
            className="w-full appearance-none rounded-[12px] border border-[#E6E0D6] bg-white py-3 pl-4 pr-10 text-sm font-medium text-[#343B55] outline-none transition-colors focus:border-[#198399] cursor-pointer"
          >
            <option value="">{t("filters.allTripTypes")}</option>
            {tripTypes?.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
          <ChevronDown
            size={18}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#343B55]"
          />
        </div>
      </div>

      {/* Destination */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#343B55]">
          <MapPin size={16} className="text-[#198399]" />
          <span>{t("filters.destination")}</span>
        </div>
        <div className="relative">
          <select
            value={filters.destinationId || ""}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                destinationId: e.target.value
                  ? Number(e.target.value)
                  : undefined,
              }))
            }
            className="w-full appearance-none rounded-[12px] border border-[#E6E0D6] bg-white py-3 pl-4 pr-10 text-sm font-medium text-[#343B55] outline-none transition-colors focus:border-[#198399] cursor-pointer"
          >
            <option value="">{t("filters.anyDestination")}</option>
            {destinations?.map((dest) => (
              <option key={dest.id} value={dest.id}>
                {dest.name}
              </option>
            ))}
          </select>
          <ChevronDown
            size={18}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#343B55]"
          />
        </div>
      </div>

      {/* Price Range */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#343B55]">
          <span className="text-[#198399] font-bold text-base leading-none">$</span>
          <span>{t("filters.priceRange")}</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-[#5B6B73] mb-1">
              {t("filters.minPrice")}
            </label>
            <div className="flex h-11 items-center rounded-[12px] bg-[#FAF7F2] px-3 border border-[#E6E0D6] focus-within:border-[#198399]">
              <span className="text-sm font-medium text-[#5B6B73] mr-1">$</span>
              <input
                type="number"
                min="0"
                placeholder="0"
                value={filters.minPrice ?? ""}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    minPrice: e.target.value ? Number(e.target.value) : undefined,
                  }))
                }
                className="w-full bg-transparent text-sm font-medium text-[#343B55] outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-[#5B6B73] mb-1">
              {t("filters.maxPrice")}
            </label>
            <div className="flex h-11 items-center rounded-[12px] bg-[#FAF7F2] px-3 border border-[#E6E0D6] focus-within:border-[#198399]">
              <span className="text-sm font-medium text-[#5B6B73] mr-1">$</span>
              <input
                type="number"
                min="0"
                placeholder="500"
                value={filters.maxPrice ?? ""}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    maxPrice: e.target.value ? Number(e.target.value) : undefined,
                  }))
                }
                className="w-full bg-transparent text-sm font-medium text-[#343B55] outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
