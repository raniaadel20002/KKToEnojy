import { FaqPage } from "@/src/features/faq/components/faq-page";
import { getApiUrl, getLanguageHeaders } from "@/src/shared/config/api";
import { SITE_CONTACT } from "@/src/shared/config/contact";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | KKToEnojy Egypt Tours",
  description:
    "Find answers to common questions about booking Egypt tours, payment options, cancellation policies, pickup points, and travel advice with KKToEnojy.",
  openGraph: {
    title: "FAQ | KKToEnojy Egypt Tours",
    description:
      "All your questions answered about booking Egypt tours, Red Sea excursions, and travel guides with KKToEnojy.",
    url: `${SITE_CONTACT.siteUrl}/faq`,
    siteName: SITE_CONTACT.brandName,
  },
};

interface Question {
  id: number;
  text: string;
  answer: string;
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale?: string }>;
}) {
  const { locale = "en" } = await params;

  let faqJsonLd = null;

  try {
    const res = await fetch(getApiUrl("/api/Questions?PageSize=50&PageNumber=1"), {
      headers: getLanguageHeaders(locale),
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const json = await res.json();
      const questions: Question[] = json.data || [];
      if (questions.length > 0) {
        faqJsonLd = {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: questions.map((q) => ({
            "@type": "Question",
            name: q.text,
            acceptedAnswer: {
              "@type": "Answer",
              text: q.answer.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
            },
          })),
        };
      }
    }
  } catch {
    // Graceful fallback
  }

  return (
    <>
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <FaqPage />
    </>
  );
}
