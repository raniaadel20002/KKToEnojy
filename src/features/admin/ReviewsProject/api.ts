import { adminFetch, parseApiResponse } from "@/src/features/admin/auth/api";
import { sanitizeOrFallbackPhone } from "@/src/features/reviews-project/api/create-review-project";

import type {
  ApiResponse,
  ReviewsProject,
  ReviewsProjectFormValues,
  ReviewsProjectListParams,
} from "./types";

function getJsonHeaders() {
  return {
    Accept: "application/json, text/plain, */*",
  };
}

export async function getReviewsProject(params: ReviewsProjectListParams) {
  const searchParams = new URLSearchParams();
  searchParams.set("pageNumber", String(params.pageNumber));
  searchParams.set("pageSize", String(params.pageSize));

  const response = await adminFetch(`/api/ReviewsProject?${searchParams}`, {
    headers: getJsonHeaders(),
  });

  return parseApiResponse<ApiResponse<ReviewsProject[]>>(
    response,
    "Unable to load reviews.",
  );
}

export async function getReviewsProjectById(id: number) {
  const response = await adminFetch(`/api/ReviewsProject/${id}`, {
    headers: getJsonHeaders(),
  });

  return parseApiResponse<ApiResponse<ReviewsProject>>(
    response,
    "Unable to load review details.",
  );
}

export async function createReviewsProject(values: ReviewsProjectFormValues) {
  const response = await adminFetch("/api/ReviewsProject", {
    method: "POST",
    headers: {
      ...getJsonHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      email: values.email.trim(),
      phone: sanitizeOrFallbackPhone(values.phone),
      comment: values.comment.trim(),
      rate: values.rate,
    }),
  });

  return parseApiResponse<ApiResponse<ReviewsProject>>(
    response,
    "Unable to create review.",
  );
}

export async function deleteReviewsProject(id: number) {
  const response = await adminFetch(`/api/ReviewsProject/${id}`, {
    method: "DELETE",
    headers: getJsonHeaders(),
  });

  return parseApiResponse<ApiResponse<string>>(
    response,
    "Unable to delete review.",
  );
}
