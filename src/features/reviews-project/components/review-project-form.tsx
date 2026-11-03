"use client";

import { useState } from "react";
import { Star, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { useCreateReviewProjectMutation } from "../api/create-review-project";

export function ReviewProjectForm() {
  const t = useTranslations("ReviewsProject");
  const createMutation = useCreateReviewProjectMutation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [rate, setRate] = useState(5);
  const [hoverRate, setHoverRate] = useState<number | null>(null);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName.trim() || !lastName.trim() || !email.trim() || !comment.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      await createMutation.mutateAsync({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        comment: comment.trim(),
        rate,
      });

      toast.success(t("successMessage"));

      setFirstName("");
      setLastName("");
      setEmail("");
      setComment("");
      setRate(5);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error && error.message
          ? error.message
          : t("errorMessage");
      toast.error(errorMessage);
    }
  };

  const activeRate = hoverRate ?? rate;

  return (
    <div className="mx-auto w-full max-w-[760px] rounded-[20px] border border-[#EDE7DC] bg-white p-6 shadow-[0px_12px_32px_0px_rgba(14,74,104,0.1)] sm:p-10 lg:p-12">
      {/* Form Title & Subtitle */}
      <div className="mb-8 text-center">
        <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold leading-tight text-[#343B55] sm:text-3xl lg:text-[32px]">
          {t("formTitle")}
        </h3>
        <p className="mt-2 font-[family-name:var(--font-dm-sans)] text-sm font-normal text-[#5B6B73] sm:text-base">
          {t("formSubtitle")}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Row 1: First name & Last name */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          <div>
            <label
              htmlFor="review-first-name"
              className="mb-1.5 block font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[#343B55]"
            >
              {t("firstName")}
            </label>
            <input
              id="review-first-name"
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="h-12 w-full rounded-[12px] border border-[#EDE7DC] bg-[#FAF7F2] px-4 font-[family-name:var(--font-dm-sans)] text-sm text-[#343B55] outline-none transition-colors focus:border-[#198399]"
            />
          </div>

          <div>
            <label
              htmlFor="review-last-name"
              className="mb-1.5 block font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[#343B55]"
            >
              {t("lastName")}
            </label>
            <input
              id="review-last-name"
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="h-12 w-full rounded-[12px] border border-[#EDE7DC] bg-[#FAF7F2] px-4 font-[family-name:var(--font-dm-sans)] text-sm text-[#343B55] outline-none transition-colors focus:border-[#198399]"
            />
          </div>
        </div>

        {/* Row 2: Email */}
        <div>
          <label
            htmlFor="review-email"
            className="mb-1.5 block font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[#343B55]"
          >
            {t("email")}
          </label>
          <input
            id="review-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 w-full rounded-[12px] border border-[#EDE7DC] bg-[#FAF7F2] px-4 font-[family-name:var(--font-dm-sans)] text-sm text-[#343B55] outline-none transition-colors focus:border-[#198399]"
          />
        </div>

        {/* Row 3: Rating (Stars) */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[#343B55]">
            {t("rating")}
          </span>
          <div
            className="flex items-center gap-2 sm:gap-2.5"
            role="radiogroup"
            aria-label={t("rating")}
          >
            {[1, 2, 3, 4, 5].map((starValue) => {
              const isFilled = starValue <= activeRate;
              return (
                <button
                  key={starValue}
                  type="button"
                  role="radio"
                  aria-checked={rate === starValue}
                  aria-label={`${starValue} star${starValue > 1 ? "s" : ""}`}
                  onClick={() => setRate(starValue)}
                  onMouseEnter={() => setHoverRate(starValue)}
                  onMouseLeave={() => setHoverRate(null)}
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[#EDE7DC] bg-[#FAF7F2] transition-transform hover:scale-105 active:scale-95"
                >
                  <Star
                    size={18}
                    className={`transition-colors ${
                      isFilled
                        ? "fill-[#A95145] text-[#A95145]"
                        : "fill-transparent text-[#C4BAAB]"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 4: Comment */}
        <div>
          <label
            htmlFor="review-comment"
            className="mb-1.5 block font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[#343B55]"
          >
            {t("comment")}
          </label>
          <textarea
            id="review-comment"
            rows={4}
            required
            placeholder={t("commentPlaceholder")}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full resize-none rounded-[12px] border border-[#EDE7DC] bg-[#FAF7F2] p-4 font-[family-name:var(--font-dm-sans)] text-sm leading-relaxed text-[#343B55] outline-none transition-colors focus:border-[#198399]"
          />
        </div>

        {/* Row 5: Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={createMutation.isPending}
            className="flex h-12 w-full cursor-pointer items-center justify-center rounded-[30px] bg-[#343B55] px-6 font-[family-name:var(--font-dm-sans)] text-base font-semibold text-white shadow-sm transition-all hover:bg-[#252a3d] disabled:cursor-not-allowed disabled:opacity-70 sm:h-[52px]"
          >
            {createMutation.isPending ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 size={18} className="animate-spin" />
                <span>{t("submitting")}</span>
              </span>
            ) : (
              <span>{t("submitComment")}</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
