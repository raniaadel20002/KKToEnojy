"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import type { ReviewProjectItem } from "../types/review-project";

interface ReviewProjectCardProps {
  review: ReviewProjectItem;
}

export function maskEmail(email: string): string {
  if (!email || !email.includes("@")) return email || "";
  const [localPart, domain] = email.split("@");
  if (!localPart || localPart.length === 0) return email;
  const firstChar = localPart.charAt(0);
  return `${firstChar}***@${domain}`;
}

export function formatReviewDate(dateStr: string, locale = "en"): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(d);
}

export function ReviewProjectCard({ review }: ReviewProjectCardProps) {
  const locale = useLocale();
  const t = useTranslations("ReviewsProject");

  const fullName = [review.firstName, review.lastName].filter(Boolean).join(" ");
  const maskedEmail = maskEmail(review.email);
  const formattedDate = formatReviewDate(review.createdAt, locale);

  const cleanComment = (review.comment || "").trim();
  const displayComment =
    cleanComment.startsWith('"') && cleanComment.endsWith('"')
      ? cleanComment
      : `"${cleanComment}"`;

  const starCount = Math.min(5, Math.max(1, review.rate || 5));

  return (
    <article className="flex h-full flex-col justify-between rounded-[20px] border border-[#EDE7DC] bg-white p-6 shadow-[0px_12px_32px_0px_rgba(14,74,104,0.1)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-7">
      <div>
        {/* Top Header: Badge + Quote Icon */}
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-[#E2F3F6] px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#198399]">
            {t("travellerBadge")}
          </span>
          <Image
            src="/review/review-quote-icon-2.svg"
            alt=""
            width={28}
            height={28}
            className="h-7 w-7 select-none opacity-90"
            aria-hidden="true"
          />
        </div>

        {/* Traveller Name */}
        <h3 className="mt-4 font-[family-name:var(--font-dm-sans)] text-[20px] font-bold leading-snug text-[#343B55] sm:text-[22px]">
          {fullName}
        </h3>

        {/* Masked Email */}
        {maskedEmail && (
          <p className="mt-1 font-[family-name:var(--font-dm-sans)] text-sm font-normal text-[#5B6B73]">
            {maskedEmail}
          </p>
        )}

        {/* Date */}
        {formattedDate && (
          <p className="mt-2 font-[family-name:var(--font-dm-sans)] text-xs font-medium text-[#343B55] sm:text-sm">
            {formattedDate}
          </p>
        )}

        {/* Star Rating */}
        <div
          className="mt-2.5 flex items-center gap-1"
          aria-label={`${starCount} out of 5 stars`}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={16}
              className={
                i < starCount
                  ? "fill-[#A95145] text-[#A95145]"
                  : "fill-transparent text-[#EDE7DC]"
              }
            />
          ))}
        </div>

        {/* Review Comment */}
        <p className="mt-4 break-words font-[family-name:var(--font-dm-sans)] text-[15px] font-normal leading-[1.65] text-[#5B6B73] sm:text-[16px]">
          {displayComment}
        </p>
      </div>
    </article>
  );
}

