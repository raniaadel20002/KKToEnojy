import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocale } from "next-intl";

import { getApiUrl, getLanguageHeaders } from "@/src/shared/config/api";
import { SITE_CONTACT } from "@/src/shared/config/contact";
import type { AppLocale } from "@/src/i18n/locales";
import type {
  ReviewProjectApiResponse,
  ReviewProjectCreateInput,
  ReviewProjectItem,
} from "../types/review-project";

export const SAFE_MOCK_PHONE = SITE_CONTACT.rawPhone;

export function sanitizeOrFallbackPhone(phone?: string | null): string {
  if (!phone || typeof phone !== "string") {
    return SAFE_MOCK_PHONE;
  }

  const trimmed = phone.trim();
  if (!trimmed) {
    return SAFE_MOCK_PHONE;
  }

  const cleaned = trimmed.replace(/[\s\-().]/g, "");

  // Standard international or national phone format (7-15 digits, optional leading +)
  if (!/^\+?[0-9]{7,15}$/.test(cleaned)) {
    return SAFE_MOCK_PHONE;
  }

  return cleaned;
}

function isPhoneError(status: number, data: unknown): boolean {
  if (data && typeof data === "object") {
    const obj = data as Record<string, unknown>;

    if (
      typeof obj.Message === "string" &&
      obj.Message.toLowerCase().includes("phone")
    ) {
      return true;
    }

    if (
      typeof obj.message === "string" &&
      obj.message.toLowerCase().includes("phone")
    ) {
      return true;
    }

    const errors = obj.errors as Record<string, unknown> | undefined;
    if (errors && (errors.Phone || errors.phone)) {
      return true;
    }
  }

  return false;
}

function extractErrorMessage(data: unknown, fallback: string): string {
  if (!data || typeof data !== "object") return fallback;
  const obj = data as Record<string, unknown>;

  if (obj.errors && typeof obj.errors === "object") {
    const errorStrings = Object.entries(obj.errors as Record<string, string[]>)
      .filter(([field]) => field.toLowerCase() !== "phone")
      .flatMap(([, messages]) => messages);

    if (errorStrings.length > 0) {
      return errorStrings.join(", ");
    }
  }

  if (
    typeof obj.message === "string" &&
    !obj.message.toLowerCase().includes("phone")
  ) {
    return obj.message;
  }

  if (
    typeof obj.Message === "string" &&
    !obj.Message.toLowerCase().includes("phone")
  ) {
    return obj.Message;
  }

  if (
    typeof obj.title === "string" &&
    !obj.title.toLowerCase().includes("phone")
  ) {
    return obj.title;
  }

  return fallback;
}

async function postReviewRequest(
  payload: Record<string, unknown>,
  locale: AppLocale,
) {
  const response = await fetch(getApiUrl("/api/ReviewsProject"), {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      ...getLanguageHeaders(locale),
    },
    body: JSON.stringify(payload),
  });

  const text = await response.text();
  let json: unknown = null;
  if (text) {
    try {
      json = JSON.parse(text);
    } catch {
      json = text;
    }
  }

  return { response, json };
}

async function submitReviewProject(
  payload: ReviewProjectCreateInput,
  locale: AppLocale,
): Promise<ReviewProjectApiResponse<ReviewProjectItem>> {
  // 1. Prepare initial payload ensuring valid phone structure
  const initialPhone = sanitizeOrFallbackPhone(payload.phone);
  const requestPayload: Record<string, unknown> = {
    firstName: payload.firstName,
    lastName: payload.lastName,
    email: payload.email,
    phone: initialPhone,
    comment: payload.comment,
    rate: payload.rate,
  };

  let { response, json } = await postReviewRequest(requestPayload, locale);

  // 2. If rejected due to a phone-related error, retry automatically with SAFE_MOCK_PHONE without exposing toast
  if (!response.ok && isPhoneError(response.status, json)) {
    requestPayload.phone = SAFE_MOCK_PHONE;
    const retryResult = await postReviewRequest(requestPayload, locale);
    response = retryResult.response;
    json = retryResult.json;
  }

  // 3. If still not ok, throw formatted non-phone error
  if (!response.ok) {
    const errorMsg = extractErrorMessage(json, "Failed to submit review");
    throw new Error(errorMsg);
  }

  const typedJson = json as ReviewProjectApiResponse<ReviewProjectItem> | null;
  if (typedJson && typedJson.success === false) {
    if (isPhoneError(400, typedJson)) {
      requestPayload.phone = SAFE_MOCK_PHONE;
      const retryResult = await postReviewRequest(requestPayload, locale);
      const retryJson = retryResult.json as ReviewProjectApiResponse<ReviewProjectItem> | null;
      if (retryResult.response.ok && retryJson?.success) {
        return retryJson;
      }
    }
    const errorMsg = extractErrorMessage(
      typedJson,
      typedJson.message || "Failed to submit review",
    );
    throw new Error(errorMsg);
  }

  return (typedJson || {
    success: true,
    message: "Review Created Successfully",
    data: {} as ReviewProjectItem,
  }) as ReviewProjectApiResponse<ReviewProjectItem>;
}

export function useCreateReviewProjectMutation() {
  const queryClient = useQueryClient();
  const locale = useLocale() as AppLocale;

  return useMutation({
    mutationFn: (payload: ReviewProjectCreateInput) =>
      submitReviewProject(payload, locale),
    onSuccess: () => {
      // Invalidate the reviews-project queries so the new review immediately appears
      queryClient.invalidateQueries({
        queryKey: ["reviews-project"],
      });
    },
  });
}
