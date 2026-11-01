import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

import {
  getApiUrl,
  getImageUrl,
  getLanguageHeaders,
} from "@/src/shared/config/api";
import type { AppLocale } from "@/src/i18n/locales";

export type ApiDestination = {
  id: number;
  name: string;
  imageUrl: string;
  isFeatured: boolean;
  tripsCount: number;
};

export type ApiDestinationsResponse = {
  success: boolean;
  message: string;
  data: ApiDestination[];
};

async function fetchPopularDestinations(
  locale: AppLocale,
): Promise<ApiDestination[]> {
  const response = await fetch(getApiUrl("/api/Destinations"), {
    headers: getLanguageHeaders(locale),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch popular destinations");
  }

  const result: ApiDestinationsResponse = await response.json();

  if (!result.success) {
    throw new Error(result.message || "Failed to fetch popular destinations");
  }

  // Filter featured and prepend base URL
  return result.data
    .filter((destination) => destination.isFeatured)
    .map((destination) => ({
      ...destination,
      imageUrl: getImageUrl(destination.imageUrl),
    }));
}

export function usePopularDestinationsQuery() {
  const locale = useLocale() as AppLocale;

  return useQuery({
    queryKey: ["popular-destinations", locale],
    queryFn: () => fetchPopularDestinations(locale),
  });
}
