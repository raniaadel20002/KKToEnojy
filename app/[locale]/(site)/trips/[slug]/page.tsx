import { TripDetailsPage } from "@/src/features/tours/components/single/trip-details-page";
import { extractIdFromSlug } from "@/src/features/tours/utils/slugify";
import { getApiUrl, getImageUrl } from "@/src/shared/config/api";
import { SITE_CONTACT } from "@/src/shared/config/contact";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const id = extractIdFromSlug(slug);

  if (!id) {
    return { title: "Trip Not Found | KKToEnojy" };
  }

  try {
    const response = await fetch(getApiUrl(`/api/Trips/${id}`), {
      headers: { "Accept-Language": locale },
      next: { revalidate: 3600 },
    });

    if (!response.ok) throw new Error("Failed to fetch trip");

    const trip = await response.json();
    const cleanDescription = (trip.data.description || "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .substring(0, 160);

    const title = `${trip.data.name} | Egypt Tours | KKToEnojy`;
    const imageUrl = trip.data.images?.[0]
      ? getImageUrl(trip.data.images[0].imageUrl)
      : `${SITE_CONTACT.siteUrl}/og-image.jpg`;

    return {
      title,
      description: cleanDescription,
      alternates: {
        canonical: `/${locale}/trips/${slug}`,
      },
      openGraph: {
        title,
        description: cleanDescription,
        url: `${SITE_CONTACT.siteUrl}/${locale}/trips/${slug}`,
        siteName: SITE_CONTACT.brandName,
        images: [{ url: imageUrl, alt: `${trip.data.name} - KKToEnojy Tour` }],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description: cleanDescription,
        images: [imageUrl],
      },
    };
  } catch {
    return {
      title: "Egypt Tour & Adventure | KKToEnojy",
      description:
        "Explore this amazing Egypt tour with KKToEnojy. Book your Egyptian adventure today and create memories together.",
    };
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; locale?: string }>;
}) {
  const { slug, locale = "en" } = await params;
  const id = extractIdFromSlug(slug);

  let tripJsonLd = null;

  if (id) {
    try {
      const response = await fetch(getApiUrl(`/api/Trips/${id}`), {
        headers: { "Accept-Language": locale },
        next: { revalidate: 3600 },
      });

      if (response.ok) {
        const json = await response.json();
        const trip = json.data;
        if (trip) {
          const images = (trip.images || []).map((img: { imageUrl: string }) =>
            getImageUrl(img.imageUrl),
          );

          tripJsonLd = {
            "@context": "https://schema.org",
            "@type": ["TouristTrip", "Product"],
            name: trip.name,
            description: (trip.description || "")
              .replace(/<[^>]+>/g, " ")
              .replace(/\s+/g, " ")
              .trim(),
            image: images.length > 0 ? images : [`${SITE_CONTACT.siteUrl}/og-image.jpg`],
            provider: {
              "@type": "TravelAgency",
              name: SITE_CONTACT.brandName,
              url: SITE_CONTACT.siteUrl,
              telephone: SITE_CONTACT.phone,
              email: SITE_CONTACT.email,
            },
            offers: {
              "@type": "Offer",
              price: trip.adultPrice || 0,
              priceCurrency: trip.currencyName || "EUR",
              availability: "https://schema.org/InStock",
              url: `${SITE_CONTACT.siteUrl}/${locale}/trips/${slug}`,
            },
            touristType: ["AdventureTourist", "CulturalTourist"],
            itinerary: {
              "@type": "TouristDestination",
              name: trip.destination || "Egypt",
            },
          };
        }
      }
    } catch {
      // Graceful fallback without breaking page render
    }
  }

  return (
    <>
      {tripJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(tripJsonLd) }}
        />
      )}
      <TripDetailsPage slug={slug} />
    </>
  );
}
