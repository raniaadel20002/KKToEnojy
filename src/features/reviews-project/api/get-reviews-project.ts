import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";

import { getApiUrl, getLanguageHeaders } from "@/src/shared/config/api";
import type { AppLocale } from "@/src/i18n/locales";
import type {
  ReviewProjectApiResponse,
  ReviewProjectItem,
} from "../types/review-project";

export interface UseReviewsProjectQueryOptions {
  pageSize?: number;
  pageNumber?: number;
}

export async function fetchReviewsProject({
  options,
  locale,
}: {
  options: UseReviewsProjectQueryOptions;
  locale: AppLocale;
}): Promise<ReviewProjectItem[]> {
  const { pageSize = 3, pageNumber = 1 } = options;
  const params = new URLSearchParams();
  if (pageSize) params.append("pageSize", pageSize.toString());
  if (pageNumber) params.append("pageNumber", pageNumber.toString());

  const url = getApiUrl(
    `/api/ReviewsProject?${params.toString()}`,
  );

  const response = await fetch(url, {
    headers: getLanguageHeaders(locale),
  });

  if (!response.ok) throw new Error("Failed to fetch reviews");

  const json: ReviewProjectApiResponse<ReviewProjectItem[]> =
    await response.json();
  if (!json.success) throw new Error(json.message || "Failed to load reviews");

  return json.data || [];
}

export function useReviewsProjectQuery(
  options: UseReviewsProjectQueryOptions = {},
) {
  const locale = useLocale() as AppLocale;

  return useQuery({
    queryKey: ["reviews-project", locale, options.pageSize, options.pageNumber],
    queryFn: () => fetchReviewsProject({ options, locale }),
    staleTime: 1000 * 60 * 2,
  });
}

export function useReviewsProjectPagination() {
  const locale = useLocale() as AppLocale;

  const [displayedReviews, setDisplayedReviews] = useState<ReviewProjectItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [nextBatch, setNextBatch] = useState<ReviewProjectItem[] | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Initial query: fetch page 1 (size 3) and check if more than 3 reviews exist
  const initialQuery = useQuery({
    queryKey: ["reviews-project", locale, "paginated-batch"],
    queryFn: async () => {
      const p1 = await fetchReviewsProject({
        options: { pageNumber: 1, pageSize: 3 },
        locale,
      });

      let more = false;
      let cachedNext: ReviewProjectItem[] | null = null;

      if (p1.length === 3) {
        // Check if page 2 has any reviews
        const p2 = await fetchReviewsProject({
          options: { pageNumber: 2, pageSize: 3 },
          locale,
        });
        if (p2.length > 0) {
          more = true;
          cachedNext = p2;
        }
      }

      return {
        reviews: p1,
        hasMore: more,
        nextBatch: cachedNext,
      };
    },
    staleTime: 1000 * 60 * 2,
  });

  useEffect(() => {
    if (initialQuery.data) {
      setDisplayedReviews(initialQuery.data.reviews);
      setHasMore(initialQuery.data.hasMore);
      setNextBatch(initialQuery.data.nextBatch);
      setCurrentPage(1);
    }
  }, [initialQuery.data]);

const loadMore = async () => {
  if (isLoadingMore || !hasMore) return;

  setIsLoadingMore(true);

  try {
    const targetPage = currentPage + 1;

    const batchToAdd =
      nextBatch ??
      (await fetchReviewsProject({
        options: { pageNumber: targetPage, pageSize: 3 },
        locale,
      }));

    const existingIds = new Set(displayedReviews.map((r) => r.id));
    const filteredNew = batchToAdd.filter((r) => !existingIds.has(r.id));

    if (filteredNew.length > 0) {
      setDisplayedReviews((prev) => [...prev, ...filteredNew]);
    }

    setCurrentPage(targetPage);

    const subsequentPage = await fetchReviewsProject({
      options: { pageNumber: targetPage + 1, pageSize: 3 },
      locale,
    });

    const allDisplayedIds = new Set([
      ...existingIds,
      ...filteredNew.map((r) => r.id),
    ]);

    const nextUniqueReviews = subsequentPage.filter(
      (r) => !allDisplayedIds.has(r.id)
    );

    setNextBatch(nextUniqueReviews.length > 0 ? nextUniqueReviews : null);
    setHasMore(nextUniqueReviews.length > 0);
  } catch {
    // Keep existing reviews on error
  } finally {
    setIsLoadingMore(false);
  }
};
  return {
    reviews: displayedReviews,
    isLoading: initialQuery.isLoading,
    isError: initialQuery.isError,
    error: initialQuery.error,
    hasMore,
    isLoadingMore,
    loadMore,
    refetch: initialQuery.refetch,
  };
}
