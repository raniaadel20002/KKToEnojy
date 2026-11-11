import { hasLocale } from "next-intl";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

import { routing } from "@/src/i18n/routing";
import { SITE_CONTACT } from "@/src/shared/config/contact";

const localizedMeta: Record<
  string,
  { title: string; description: string; ogLocale: string }
> = {
  en: {
    title: "KKToEnojy - Create Memories Together | Egypt Travel & Tourism",
    description:
      "Create Memories Together with KKToEnojy. Explore Egypt's best destinations, tours, and travel experiences. Book your Egyptian adventure today with expert guides and unforgettable journeys.",
    ogLocale: "en_US",
  },
  de: {
    title: "KKToEnojy - Gemeinsam Erinnerungen schaffen | Ägypten Reisen & Tourismus",
    description:
      "Schaffen Sie gemeinsam mit KKToEnojy Erinnerungen. Entdecken Sie die besten Reiseziele, Touren und Erlebnisse Ägyptens. Buchen Sie noch heute Ihr Ägypten-Abenteuer mit fachkundigen Führern.",
    ogLocale: "de_DE",
  },
  fr: {
    title: "KKToEnojy - Créer des souvenirs ensemble | Voyages et tourisme en Égypte",
    description:
      "Créez des souvenirs inoubliables avec KKToEnojy. Découvrez les meilleures destinations, excursions et circuits en Égypte avec des guides experts et des voyages sur mesure.",
    ogLocale: "fr_FR",
  },
  pl: {
    title: "KKToEnojy - Twórzmy razem wspomnienia | Wycieczki i turystyka w Egipcie",
    description:
      "Twórz niezapomniane wspomnienia z KKToEnojy. Odkryj najlepsze miejsca, wycieczki i atrakcje w Egipcie. Zarezerwuj swoją egipską przygodę już dziś z doświadczonymi przewodnikami.",
    ogLocale: "pl_PL",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const currentMeta = localizedMeta[locale] || localizedMeta.en;

  const alternateLanguages: Record<string, string> = {
    en: "/en",
    de: "/de",
    fr: "/fr",
    pl: "/pl",
    "x-default": "/en",
  };

  return {
    metadataBase: new URL(SITE_CONTACT.siteUrl),
    title: {
      default: currentMeta.title,
      template: "%s | KKToEnojy",
    },
    description: currentMeta.description,
    keywords: [
      "KKToEnojy",
      "KK To Enjoy",
      "KKTOENJOY",
      "KKToEnojy Tours",
      "KKToEnojy Egypt",
      "Egypt tours",
      "Egypt travel",
      "Egyptian tourism",
      "Red Sea tours",
      "Pyramids tours",
      "Luxor trips",
      "Cairo tours",
      "Egypt vacation packages",
      "desert safari Egypt",
      "Nile cruise",
      "Hurghada tours",
      "Sharm El Sheikh",
      "Egypt travel guide",
      "Egyptian adventures",
    ],
    authors: [{ name: SITE_CONTACT.brandName, url: SITE_CONTACT.siteUrl }],
    creator: SITE_CONTACT.brandName,
    publisher: SITE_CONTACT.brandName,
    alternates: {
      canonical: `/${locale}`,
      languages: alternateLanguages,
    },
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: "website",
      locale: currentMeta.ogLocale,
      alternateLocale: ["en_US", "de_DE", "fr_FR", "pl_PL"].filter(
        (loc) => loc !== currentMeta.ogLocale,
      ),
      url: `${SITE_CONTACT.siteUrl}/${locale}`,
      siteName: SITE_CONTACT.brandName,
      title: currentMeta.title,
      description: currentMeta.description,
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "KKToEnojy - Egypt Travel & Tourism",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: currentMeta.title,
      description: currentMeta.description,
      images: ["/og-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  // Schema.org TravelAgency JSON-LD for rich brand search results
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": `${SITE_CONTACT.siteUrl}/#organization`,
    name: SITE_CONTACT.brandName,
    alternateName: Array.from(SITE_CONTACT.brandAliases),
    url: SITE_CONTACT.siteUrl,
    logo: `${SITE_CONTACT.siteUrl}/Hero/logo.png`,
    image: `${SITE_CONTACT.siteUrl}/og-image.jpg`,
    description:
      "KKToEnojy is a premier Egyptian tour operator offering guided excursions, desert safaris, Red Sea water sports, and historical tours across Cairo, Luxor, and Hurghada.",
    telephone: SITE_CONTACT.phone,
    email: SITE_CONTACT.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE_CONTACT.addressLocality,
      addressCountry: SITE_CONTACT.addressCountry,
    },
    sameAs: [
      SITE_CONTACT.socials.facebook,
      SITE_CONTACT.socials.instagram,
      `https://wa.me/${SITE_CONTACT.whatsappPhone}`,
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <NextIntlClientProvider>{children}</NextIntlClientProvider>
    </>
  );
}
