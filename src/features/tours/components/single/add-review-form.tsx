"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCreateReviewMutation } from "@/src/features/tours/api/create-review";

interface AddReviewFormProps {
  tripId: number;
}

export function AddReviewForm({ tripId }: AddReviewFormProps) {
  const t = useTranslations("TripDetails.reviews");

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    comment: "",
  });

  const mutation = useCreateReviewMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (rating === 0) {
      setMessage({ type: "error", text: "Please select a star rating before submitting." });
      return;
    }

    const phoneToSubmit = formData.phone.trim() || "+201000000000";

    mutation.mutate(
      {
        ...formData,
        phone: phoneToSubmit,
        tripId,
        rate: rating,
      },
      {
        onSuccess: () => {
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            comment: "",
          });
          setRating(0);
          setMessage({ type: "success", text: t("success") });
        },
        onError: (error) => {
          setMessage({ type: "error", text: error.message || t("error") });
        },
      },
    );
  };

  return (
    <div className="mt-8 rounded-[20px] bg-white p-6 shadow-[0px_8px_24px_0px_rgba(52,59,85,0.06)] border border-[#343B5510] sm:p-8 lg:p-10">
      <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#343B55] sm:text-3xl">
        {t("addReview")}
      </h3>
      <p className="mt-2 font-[family-name:var(--font-dm-sans)] text-xs text-[#5B6B73]">
        {t("subtext")}
      </p>

      {message && (
        <div
          className={`mt-4 rounded-xl p-4 text-sm font-[family-name:var(--font-dm-sans)] ${
            message.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-6">
        {/* Star Rating */}
        <div>
          <span className="block font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[#343B55]">
            {t("yourRating")}
          </span>
          <div className="mt-2 flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  size={24}
                  className={
                    star <= (hoverRating || rating)
                      ? "fill-[#765438] text-[#765438]"
                      : "text-gray-300 stroke-1"
                  }
                />
              </button>
            ))}
          </div>
        </div>

        {/* First & Last Name */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="block font-[family-name:var(--font-dm-sans)] text-xs font-semibold text-[#343B55] mb-2">
              {t("firstName")}
            </label>
            <input
              type="text"
              required
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="w-full rounded-[12px] bg-[#FAF7F2] border border-transparent px-4 py-3.5 font-[family-name:var(--font-dm-sans)] text-sm text-[#343B55] outline-none transition-all focus:border-[#0E4A68] focus:bg-white"
            />
          </div>

          <div>
            <label className="block font-[family-name:var(--font-dm-sans)] text-xs font-semibold text-[#343B55] mb-2">
              {t("lastName")}
            </label>
            <input
              type="text"
              required
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="w-full rounded-[12px] bg-[#FAF7F2] border border-transparent px-4 py-3.5 font-[family-name:var(--font-dm-sans)] text-sm text-[#343B55] outline-none transition-all focus:border-[#0E4A68] focus:bg-white"
            />
          </div>
        </div>

        {/* Email & Phone */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="block font-[family-name:var(--font-dm-sans)] text-xs font-semibold text-[#343B55] mb-2">
              {t("email")}
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-[12px] bg-[#FAF7F2] border border-transparent px-4 py-3.5 font-[family-name:var(--font-dm-sans)] text-sm text-[#343B55] outline-none transition-all focus:border-[#0E4A68] focus:bg-white"
            />
          </div>

          <div>
            <label className="block font-[family-name:var(--font-dm-sans)] text-xs font-semibold text-[#343B55] mb-2">
              {t("phone")}
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+20..."
              className="w-full rounded-[12px] bg-[#FAF7F2] border border-transparent px-4 py-3.5 font-[family-name:var(--font-dm-sans)] text-sm text-[#343B55] outline-none transition-all focus:border-[#0E4A68] focus:bg-white"
            />
          </div>
        </div>

        {/* Comment */}
        <div>
          <label className="block font-[family-name:var(--font-dm-sans)] text-xs font-semibold text-[#343B55] mb-2">
            {t("comment")}
          </label>
          <textarea
            required
            rows={4}
            value={formData.comment}
            onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
            placeholder={t("placeholder")}
            className="w-full resize-y rounded-[12px] bg-[#FAF7F2] border border-transparent p-4 font-[family-name:var(--font-dm-sans)] text-sm text-[#343B55] outline-none transition-all focus:border-[#0E4A68] focus:bg-white"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={mutation.isPending}
            className="rounded-full bg-[#343B55] px-9 py-3.5 font-[family-name:var(--font-dm-sans)] text-sm font-bold text-white transition-all hover:bg-[#0E4A68] hover:shadow-md disabled:opacity-50"
          >
            {mutation.isPending ? t("submitting") : t("submit")}
          </button>
        </div>
      </form>
    </div>
  );
}
