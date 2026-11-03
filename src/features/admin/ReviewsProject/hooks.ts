"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createReviewsProject,
  deleteReviewsProject,
  getReviewsProject,
  getReviewsProjectById,
} from "./api";
import type {
  ReviewsProjectFormValues,
  ReviewsProjectListParams,
} from "./types";

const reviewsProjectQueryKey = ["admin", "reviews-project"] as const;

export function useReviewsProjectQuery(params: ReviewsProjectListParams) {
  return useQuery({
    queryKey: [...reviewsProjectQueryKey, params],
    queryFn: () => getReviewsProject(params),
  });
}

export function useReviewsProjectByIdQuery(id: number | null) {
  return useQuery({
    enabled: Boolean(id),
    queryKey: [...reviewsProjectQueryKey, "detail", id],
    queryFn: () => getReviewsProjectById(id as number),
  });
}

export function useCreateReviewsProjectMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: ReviewsProjectFormValues) =>
      createReviewsProject(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reviewsProjectQueryKey });
    },
  });
}

export function useDeleteReviewsProjectMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteReviewsProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reviewsProjectQueryKey });
    },
  });
}

