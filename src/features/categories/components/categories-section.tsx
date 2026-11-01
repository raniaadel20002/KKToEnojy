"use client";

import { useRef, useState, useMemo } from "react";
import { useTranslations } from "next-intl";

import { useTripTypesQuery } from "@/src/features/categories/api/get-trip-types";
import { CategoryCard } from "@/src/features/categories/components/category-card";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function CategoriesSection() {
  const { data: rawTripTypes, isLoading, error } = useTripTypesQuery();

  const tripTypes = useMemo(() => {
    if (!rawTripTypes) return null;
    return rawTripTypes;
  }, [rawTripTypes]);
  const t = useTranslations("Categories");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Drag to scroll state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setDragDistance(0);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // scroll speed multiplier
    scrollRef.current.scrollLeft = scrollLeftState - walk;
    setDragDistance(Math.abs(x - startX));
  };

  const handleClickCapture = (e: React.MouseEvent) => {
    // If user dragged more than 10 pixels, consider it a drag and prevent click
    if (dragDistance > 10) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  if (isLoading) {
    return (
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-[1280px] px-5 text-center">
          <p className="text-[var(--color-muted)]">{t("loading")}</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-[1280px] px-5 text-center">
          <p className="text-red-600">{t("error")}</p>
        </div>
      </section>
    );
  }

  if (!tripTypes || tripTypes.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-16 md:py-20 lg:py-24">
      <div className="mx-auto w-full px-5 md:px-8 lg:max-w-[1400px] lg:px-10">
        {/* Header */}
        <div className="mb-10 text-center md:mb-14">
          <p className="font-[family-name:var(--font-montez)] text-[28px] leading-[160%] text-[#69DD84] md:text-[36px]">
            {t("subtitle")}
          </p>
          <h2 className="mt-1 font-sans text-[32px] font-semibold leading-[160%] text-[var(--color-ocean)] md:text-[40px]">
            {t("title")}
          </h2>
          <div className="mx-auto mt-2 h-2 w-[117px] bg-[#69DD84]" />
        </div>

        {/* Horizontal scroll for all devices */}
        <div className="relative">
          {/* Scroll Buttons (Mobile Only) */}
          <button
            onClick={() => scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" })}
            className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[var(--color-ocean)] shadow-md md:hidden"
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" })}
            className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[var(--color-ocean)] shadow-md md:hidden"
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </button>

          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onClickCapture={handleClickCapture}
            className={`flex h-[368px] md:h-[428px] gap-8 overflow-x-auto select-none overflow-y-hidden py-6 px-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
          >
            {tripTypes.map((tripType, index) => (
              <div
                key={tripType.id}
                className="w-[280px] md:w-[320px] shrink-0"
              >
                <CategoryCard
                  tripType={tripType}
                  index={index}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
