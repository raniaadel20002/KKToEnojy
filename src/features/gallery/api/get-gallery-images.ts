import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

import type {
  GalleryImage,
  GalleryResponse,
} from "@/src/features/gallery/types/gallery";
import {
  getApiUrl,
  getImageUrl,
  getLanguageHeaders,
} from "@/src/shared/config/api";
import type { AppLocale } from "@/src/i18n/locales";

async function fetchGalleryImages(
  locale: AppLocale,
  featured?: boolean,
): Promise<GalleryImage[]> {
  const response = await fetch(getApiUrl("/api/Gallery/GetAllImages"), {
    headers: getLanguageHeaders(locale),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch gallery images");
  }

  const result: GalleryResponse = await response.json();

  if (!result.success) {
    throw new Error(result.message || "Failed to fetch gallery images");
  }

  // Prepend base URL to image paths
  const imagesWithFullUrl = result.data.map((image) => ({
    ...image,
    imageUrl: getImageUrl(image.imageUrl),
  }));

  // Filter by featured if specified
  if (featured !== undefined) {
    return imagesWithFullUrl.filter((image) => image.isFeatured === featured);
  }

  return imagesWithFullUrl;
}

export function useGalleryImagesQuery(featured?: boolean) {
  const locale = useLocale() as AppLocale;

  return useQuery({
    queryKey: ["gallery-images", locale, featured],
    queryFn: () => fetchGalleryImages(locale, featured),
  });
}
