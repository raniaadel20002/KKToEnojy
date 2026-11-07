"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  MapPin,
  Search,
  SlidersHorizontal,
  Tag,
  X,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { useTripsQuery } from "@/src/features/tours/api/get-trips";
import { useDestinationsQuery } from "@/src/features/categories/api/get-destinations";
import { useTripTypesQuery } from "@/src/features/tours/api/get-trip-types";
import { TripsBreadcrumb } from "./trips-breadcrumb";
import { TripsGrid } from "./trips-grid";
import { TripsHero } from "./trips-hero";
import { TripsSidebar } from "./trips-sidebar";

export function TripsPage() {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const pricePopoverRef = useRef<HTMLDivElement>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams();
  const t = useTranslations("TripsPage");

  // Fetch options for desktop filters
  const { data: destinations } = useDestinationsQuery(false);
  const { data: tripTypes } = useTripTypesQuery();

  // Seed initial filters from URL query params
  const initialDestinationId = searchParams.get("destinationId")
    ? Number(searchParams.get("destinationId"))
    : undefined;

  const initialTypeId = searchParams.get("typeId")
    ? Number(searchParams.get("typeId"))
    : undefined;

  // Filter state
  const [filters, setFilters] = useState<{
    destinationId?: number;
    minPrice?: number;
    maxPrice?: number;
    typeId?: number;
    searchItem?: string;
  }>({ destinationId: initialDestinationId, typeId: initialTypeId });

  // Temporary price state for popover
  const [tempMinPrice, setTempMinPrice] = useState<string>("");
  const [tempMaxPrice, setTempMaxPrice] = useState<string>("");

  // Search input state with debouncing
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setFilters((prev) => ({ ...prev, searchItem: searchInput.trim() || undefined }));
    }, 400);
    return () => clearTimeout(handler);
  }, [searchInput]);

  // Sync destinationId and typeId from URL whenever they change
  useEffect(() => {
    const destId = searchParams.get("destinationId");
    const typeId = searchParams.get("typeId");
    setFilters((prev) => ({
      ...prev,
      destinationId: destId ? Number(destId) : undefined,
      typeId: typeId ? Number(typeId) : undefined,
    }));
  }, [searchParams]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Close price popover on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        pricePopoverRef.current &&
        !pricePopoverRef.current.contains(event.target as Node)
      ) {
        setIsPriceOpen(false);
      }
    }
    if (isPriceOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPriceOpen]);

  const {
    data,
    isLoading,
    error,
  } = useTripsQuery({
    destinationId: filters.destinationId,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    typeId: filters.typeId,
    searchItem: filters.searchItem,
    pageSize: 100,
  });

  // Sort all fetched trips by id ascending (lowest/oldest first) before paginating
  const trips = (data || []).slice().sort((a, b) => a.id - b.id);
  const totalPages = Math.ceil(trips.length / 9);
  const paginatedTrips = trips.slice((currentPage - 1) * 9, currentPage * 9);

  const clearFilters = () => {
    setFilters({});
    setSearchInput("");
    setTempMinPrice("");
    setTempMaxPrice("");
    setCurrentPage(1);
  };

  const handleApplyPrice = () => {
    setFilters((prev) => ({
      ...prev,
      minPrice: tempMinPrice ? Number(tempMinPrice) : undefined,
      maxPrice: tempMaxPrice ? Number(tempMaxPrice) : undefined,
    }));
    setIsPriceOpen(false);
  };

  const hasActiveFilters = Boolean(
    filters.destinationId ||
    filters.typeId ||
    filters.minPrice !== undefined ||
    filters.maxPrice !== undefined ||
    filters.searchItem ||
    searchInput
  );

  return (
    <>
      <TripsHero />

      <section className="w-full bg-[#FAF7F2] pb-20 pt-8 sm:pb-24 sm:pt-10 md:pb-28 md:pt-12">
        <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-8 lg:px-10">
          {/* Breadcrumb */}
          <TripsBreadcrumb />

          {/* Desktop Filters Bar (hidden on mobile) */}
          <div className="hidden lg:grid lg:grid-cols-4 lg:gap-5">
            {/* 1. Trip Type Filter */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Tag size={16} className="text-[#198399]" />
                <span className="font-[family-name:var(--font-dm-sans)] text-sm font-semibold text-[#343B55]">
                  {t("filters.tripType")}
                </span>
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
                className="flex h-[52px] w-full appearance-none items-center rounded-[12px] border border-[#E6E0D6] bg-white pl-4 pr-10 font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[#343B55] outline-none transition-colors hover:border-[#198399] focus:border-[#198399] cursor-pointer"
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
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#343B55]"
              />
            </div>
          </div>

          {/* 2. Destination Filter */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-[#198399]" />
              <span className="font-[family-name:var(--font-dm-sans)] text-sm font-semibold text-[#343B55]">
                {t("filters.destination")}
              </span>
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
                className="flex h-[52px] w-full appearance-none items-center rounded-[12px] border border-[#E6E0D6] bg-white pl-4 pr-10 font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[#343B55] outline-none transition-colors hover:border-[#198399] focus:border-[#198399] cursor-pointer"
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
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#343B55]"
              />
            </div>
          </div>

          {/* 3. Price Range Filter */}
          <div className="flex flex-col gap-2" ref={pricePopoverRef}>
            <div className="flex items-center gap-2">
              <span className="text-[#198399] font-bold text-base leading-none">$</span>
              <span className="font-[family-name:var(--font-dm-sans)] text-sm font-semibold text-[#343B55]">
                {t("filters.priceRange")}
              </span>
            </div>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsPriceOpen((prev) => !prev)}
                className={`flex h-[52px] w-full items-center justify-between rounded-[12px] bg-white px-4 font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[#343B55] transition-colors hover:border-[#198399] cursor-pointer border ${isPriceOpen || filters.minPrice !== undefined || filters.maxPrice !== undefined
                    ? "border-[#198399]"
                    : "border-[#E6E0D6]"
                  }`}
              >
                <span className="truncate">
                  {filters.minPrice !== undefined || filters.maxPrice !== undefined
                    ? `$${filters.minPrice ?? 0} - $${filters.maxPrice ?? "500+"}`
                    : t("filters.setBudget")}
                </span>
                {isPriceOpen ? (
                  <ChevronUp size={18} className="text-[#198399] shrink-0" />
                ) : (
                  <ChevronDown size={18} className="text-[#343B55] shrink-0" />
                )}
              </button>

              {/* Price Popover */}
              {isPriceOpen && (
                <div className="absolute left-0 top-[calc(100%+8px)] z-30 w-full min-w-[280px] rounded-[16px] border border-[#EDE7DC] bg-white p-5 shadow-[0px_14px_34px_0px_rgba(14,74,104,0.15)] animate-in fade-in zoom-in-95 duration-150">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="mb-1.5 block font-[family-name:var(--font-dm-sans)] text-xs font-semibold text-[#343B55]">
                        {t("filters.minPrice")}
                      </label>
                      <div className="flex h-11 items-center rounded-[12px] border border-[#E6E0D6] bg-[#FAF7F2] px-3 focus-within:border-[#198399]">
                        <span className="mr-1 text-sm font-medium text-[#5B6B73]">$</span>
                        <input
                          type="number"
                          min="0"
                          placeholder="0"
                          value={tempMinPrice}
                          onChange={(e) => setTempMinPrice(e.target.value)}
                          className="w-full bg-transparent text-sm font-medium text-[#343B55] outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block font-[family-name:var(--font-dm-sans)] text-xs font-semibold text-[#343B55]">
                        {t("filters.maxPrice")}
                      </label>
                      <div className="flex h-11 items-center rounded-[12px] border border-[#E6E0D6] bg-[#FAF7F2] px-3 focus-within:border-[#198399]">
                        <span className="mr-1 text-sm font-medium text-[#5B6B73]">$</span>
                        <input
                          type="number"
                          min="0"
                          placeholder="500"
                          value={tempMaxPrice}
                          onChange={(e) => setTempMaxPrice(e.target.value)}
                          className="w-full bg-transparent text-sm font-medium text-[#343B55] outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleApplyPrice}
                    className="mt-4 flex h-[44px] w-full cursor-pointer items-center justify-center rounded-[30px] bg-[#765438] font-[family-name:var(--font-dm-sans)] text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#60432b]"
                  >
                    {t("filters.apply")}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* 4. Search Filter */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Search size={16} className="text-[#198399]" />
              <span className="font-[family-name:var(--font-dm-sans)] text-sm font-semibold text-[#343B55]">
                {t("filters.search")}
              </span>
            </div>
            <div className="flex h-[52px] w-full items-center rounded-[12px] border border-[#E6E0D6] bg-white px-4 transition-colors focus-within:border-[#198399]">
              <input
                type="text"
                placeholder={t("filters.searchPlaceholder")}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full bg-transparent font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[#343B55] placeholder:text-[#888888] outline-none"
              />
            </div>
          </div>
        </div>

        {/* Mobile Filter Button (< lg) */}
        <div className="lg:hidden">
          <button
            type="button"
            onClick={() => setIsMobileFiltersOpen(true)}
            className="flex h-[54px] w-full items-center gap-3 rounded-[12px] border border-[#E6E0D6] bg-white px-5 shadow-sm font-[family-name:var(--font-dm-sans)] text-sm font-semibold text-[#343B55] transition-colors hover:border-[#198399] cursor-pointer"
          >
            <SlidersHorizontal size={18} className="text-[#198399]" />
            <span>{t("filters.filterButton")}</span>
          </button>
        </div>

        {/* Result Count and Clear Filters row */}
        <div className="mt-6 mb-8 flex items-center justify-between">
          <span className="font-[family-name:var(--font-dm-sans)] text-sm font-normal text-[#5B6B73]">
            {t("filters.showingCount", {
              shown: paginatedTrips.length,
              total: trips.length,
            })}
          </span>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="font-[family-name:var(--font-dm-sans)] text-sm font-semibold text-[#198399] transition-colors hover:text-[#126576] hover:underline cursor-pointer"
            >
              {t("filters.clearAll")}
            </button>
          )}
        </div>

        {/* Cards Grid */}
        <TripsGrid trips={paginatedTrips} isLoading={isLoading} error={error} />

        {/* Pagination */}
        {!isLoading && !error && trips.length > 0 && totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2.5 sm:mt-16 sm:gap-3">
            {/* Prev Button */}
            <button
              type="button"
              onClick={() => {
                setCurrentPage((p) => Math.max(1, p - 1));
                window.scrollTo({ top: 380, behavior: "smooth" });
              }}
              disabled={currentPage === 1}
              aria-label="Previous page"
              className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-[#EDE7DC] bg-white text-[#343B55] transition-all hover:bg-[#FAF7F2] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-sm"
            >
              <ChevronLeft size={16} />
            </button>

            {/* Page Number Buttons */}
            {Array.from({ length: totalPages }).map((_, i) => {
              const page = i + 1;
              const isActive = currentPage === page;
              return (
                <button
                  key={page}
                  type="button"
                  onClick={() => {
                    setCurrentPage(page);
                    window.scrollTo({ top: 380, behavior: "smooth" });
                  }}
                  className={`flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full font-[family-name:var(--font-dm-sans)] text-sm font-semibold transition-colors cursor-pointer shadow-sm ${isActive
                      ? "bg-[#343B55] text-white"
                      : "border border-[#EDE7DC] bg-white text-[#343B55] hover:bg-[#FAF7F2]"
                    }`}
                >
                  {page}
                </button>
              );
            })}

            {/* Next Button */}
            <button
              type="button"
              onClick={() => {
                setCurrentPage((p) => Math.min(totalPages, p + 1));
                window.scrollTo({ top: 380, behavior: "smooth" });
              }}
              disabled={currentPage === totalPages}
              aria-label="Next page"
              className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-[#EDE7DC] bg-white text-[#343B55] transition-all hover:bg-[#FAF7F2] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-sm"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </section >

      {/* Mobile Filters Drawer Overlay */ }
  {
    isMobileFiltersOpen && (
      <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm lg:hidden animate-in fade-in duration-200">
        <div className="flex h-full w-[85%] max-w-sm flex-col justify-between overflow-y-auto bg-white p-6 shadow-2xl animate-in slide-in-from-right duration-250">
          <div>
            <div className="mb-6 flex items-center justify-between pb-4 border-b border-[#EDE7DC]">
              <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-[#343B55]">
                {t("mobileFilters.title")}
              </h2>
              <button
                type="button"
                onClick={() => setIsMobileFiltersOpen(false)}
                className="rounded-full bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-gray-200 cursor-pointer"
                aria-label="Close filters"
              >
                <X size={18} />
              </button>
            </div>

            {/* Mobile Search input */}
            <div className="mb-6 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Search size={16} className="text-[#198399]" />
                <span className="font-[family-name:var(--font-dm-sans)] text-sm font-semibold text-[#343B55]">
                  {t("filters.search")}
                </span>
              </div>
              <div className="flex h-[48px] w-full items-center rounded-[12px] border border-[#E6E0D6] bg-white px-4">
                <input
                  type="text"
                  placeholder={t("filters.searchPlaceholder")}
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full bg-transparent font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[#343B55] outline-none"
                />
              </div>
            </div>

            <TripsSidebar
              filters={filters}
              setFilters={setFilters}
              onClearFilters={clearFilters}
            />
          </div>

          <div className="mt-8 pt-4 border-t border-[#EDE7DC]">
            <button
              type="button"
              onClick={() => setIsMobileFiltersOpen(false)}
              className="w-full rounded-[30px] bg-[#343B55] py-3 text-center font-[family-name:var(--font-dm-sans)] text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#262c40] cursor-pointer"
            >
              {t("mobileFilters.applyButton")}
            </button>
          </div>
        </div>
      </div>
    )
  }
    </>
  );
}
