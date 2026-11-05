"use client";

import { Check } from "lucide-react";
import { useTranslations } from "next-intl";

interface TripHighlightsProps {
  highlights: string[];
}

export function TripHighlights({ highlights }: TripHighlightsProps) {
  const t = useTranslations("TripDetails.highlights");

  const parsedHighlights = highlights
    .flatMap((item) => item.split("•"))
    .map((item) => item.trim())
    .filter(Boolean);

  if (parsedHighlights.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 sm:mt-10">
      <h2 className="mb-5 font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#343B55] sm:text-3xl">
        {t("title")}
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {parsedHighlights.map((highlight, index) => (
          <div
            key={index}
            className="flex items-center gap-3.5 rounded-[16px] bg-white px-5 py-4 shadow-[0px_4px_16px_0px_rgba(52,59,85,0.04)] border border-[#343B5510] sm:rounded-[20px]"
          >
            <div className="flex size-6 shrink-0 items-center justify-center rounded-full border border-[#198399] text-[#198399]">
              <Check size={13} strokeWidth={2.5} />
            </div>
            <span className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[#343B55] sm:text-base">
              {highlight}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
