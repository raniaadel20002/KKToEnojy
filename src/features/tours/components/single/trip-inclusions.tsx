"use client";

import { CheckCircle2, XCircle } from "lucide-react";
import { useTranslations } from "next-intl";

interface TripInclusionsProps {
  includes: string[];
  excludes: string[];
}

export function TripInclusions({ includes, excludes }: TripInclusionsProps) {
  const t = useTranslations("TripDetails.inclusions");

  const parsedIncludes = includes
    .flatMap((item) => item.split("•"))
    .map((item) => item.trim())
    .filter(Boolean);

  const parsedExcludes = excludes
    .flatMap((item) => item.split("•"))
    .map((item) => item.trim())
    .filter(Boolean);

  if (parsedIncludes.length === 0 && parsedExcludes.length === 0) {
    return null;
  }

  return (
    <div className="rounded-[20px] bg-white p-6 shadow-[0px_8px_24px_0px_rgba(52,59,85,0.06)] border border-[#343B5510] sm:p-8">
      <h2 className="mb-6 font-[family-name:var(--font-playfair)] text-xl font-bold text-[#343B55] sm:text-2xl">
        {t("title")}
      </h2>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:gap-12">
        {/* Included */}
        {parsedIncludes.length > 0 && (
          <div>
            <h3 className="mb-4 font-[family-name:var(--font-dm-sans)] text-xs font-bold tracking-wider text-[#198399] uppercase">
              {t("included")}
            </h3>
            <ul className="flex flex-col gap-3 font-[family-name:var(--font-dm-sans)] text-sm text-[#5B6B73]">
              {parsedIncludes.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#198399]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Not Included */}
        {parsedExcludes.length > 0 && (
          <div>
            <h3 className="mb-4 font-[family-name:var(--font-dm-sans)] text-xs font-bold tracking-wider text-[#D94141] uppercase">
              {t("notIncluded")}
            </h3>
            <ul className="flex flex-col gap-3 font-[family-name:var(--font-dm-sans)] text-sm text-[#5B6B73]">
              {parsedExcludes.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <XCircle size={18} className="mt-0.5 shrink-0 text-[#D94141]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
