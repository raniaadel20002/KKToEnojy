import type { MetadataRoute } from "next";
import { routing } from "@/src/i18n/routing";
import { SITE_CONTACT } from "@/src/shared/config/contact";
import { getApiUrl } from "@/src/shared/config/api";
import { generateSlug } from "@/src/features/tours/utils/slugify";

interface ApiTrip {
  id: number;
  name?: string;
  title?: string;
  updatedAt?: string;
}

interface ApiBlog {
  id: number;
  title: string;
  updatedAt?: string;
}

const staticRoutes = [
  { path: "", priority: 1.0, changeFrequency: "daily" as const },
  { path: "/trips", priority: 0.9, changeFrequency: "daily" as const },
  { path: "/Destinations", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/blogs", priority: 0.8, changeFrequency: "daily" as const },
  { path: "/gallery", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/About", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/faq", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/contact-us", priority: 0.6, changeFrequency: "monthly" as const },
];

async function getTripsForSitemap(): Promise<ApiTrip[]> {
  try {
    const res = await fetch(getApiUrl("/api/Trips?PageSize=100&PageNumber=1"), {
      next: { revalidate: 3600 },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch {
    return [];
  }
}

async function getBlogsForSitemap(): Promise<ApiBlog[]> {
  try {
    const res = await fetch(getApiUrl("/api/Blogs?PageSize=100&PageNumber=1"), {
      next: { revalidate: 3600 },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONTACT.siteUrl;
  const locales = routing.locales;
  const now = new Date();

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // 1. Static Pages for each locale
  for (const route of staticRoutes) {
    for (const locale of locales) {
      const localizedUrl = `${baseUrl}/${locale}${route.path}`;
      const languageAlternates: Record<string, string> = {};

      for (const altLocale of locales) {
        languageAlternates[altLocale] = `${baseUrl}/${altLocale}${route.path}`;
      }
      languageAlternates["x-default"] = `${baseUrl}/en${route.path}`;

      sitemapEntries.push({
        url: localizedUrl,
        lastModified: now,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: {
          languages: languageAlternates,
        },
      });
    }
  }

  // 2. Dynamic Trip Pages
  const trips = await getTripsForSitemap();
  for (const trip of trips) {
    const title = trip.name || trip.title || "trip";
    const slug = generateSlug(trip.id, title);

    for (const locale of locales) {
      const tripUrl = `${baseUrl}/${locale}/trips/${slug}`;
      const tripAlternates: Record<string, string> = {};

      for (const altLocale of locales) {
        tripAlternates[altLocale] = `${baseUrl}/${altLocale}/trips/${slug}`;
      }
      tripAlternates["x-default"] = `${baseUrl}/en/trips/${slug}`;

      sitemapEntries.push({
        url: tripUrl,
        lastModified: trip.updatedAt ? new Date(trip.updatedAt) : now,
        changeFrequency: "weekly",
        priority: 0.85,
        alternates: {
          languages: tripAlternates,
        },
      });
    }
  }

  // 3. Dynamic Blog Articles
  const blogs = await getBlogsForSitemap();
  for (const blog of blogs) {
    const slug = generateSlug(blog.id, blog.title || "article");

    for (const locale of locales) {
      const blogUrl = `${baseUrl}/${locale}/blogs/${slug}`;
      const blogAlternates: Record<string, string> = {};

      for (const altLocale of locales) {
        blogAlternates[altLocale] = `${baseUrl}/${altLocale}/blogs/${slug}`;
      }
      blogAlternates["x-default"] = `${baseUrl}/en/blogs/${slug}`;

      sitemapEntries.push({
        url: blogUrl,
        lastModified: blog.updatedAt ? new Date(blog.updatedAt) : now,
        changeFrequency: "weekly",
        priority: 0.75,
        alternates: {
          languages: blogAlternates,
        },
      });
    }
  }

  return sitemapEntries;
}

