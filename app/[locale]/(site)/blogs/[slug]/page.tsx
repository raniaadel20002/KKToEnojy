import { BlogDetailPage } from "@/src/features/blogs/components/blog-detail-page";
import { extractIdFromSlug } from "@/src/features/tours/utils/slugify";
import { getApiUrl, getImageUrl, getLanguageHeaders } from "@/src/shared/config/api";
import { SITE_CONTACT } from "@/src/shared/config/contact";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale?: string }>;
}): Promise<Metadata> {
  const { slug, locale = "en" } = await params;
  const id = extractIdFromSlug(slug);

  if (!id) {
    return { title: "Blog Post | KKToEnojy" };
  }

  try {
    const res = await fetch(getApiUrl(`/api/Blogs/${id}`), {
      headers: getLanguageHeaders(locale),
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error("Failed to fetch blog");

    const json = await res.json();
    const blog = json.data;
    const cleanDescription = (blog.content || "")
      .replace(/<[^>]+>/g, " ")
      .replace(/[*#_`~\[\]]/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .substring(0, 160);

    const title = `${blog.title} | KKToEnojy Egypt Travel Blog`;
    const imageUrl = blog.imageUrl
      ? getImageUrl(blog.imageUrl)
      : `${SITE_CONTACT.siteUrl}/og-image.jpg`;

    return {
      title,
      description: cleanDescription,
      alternates: {
        canonical: `/${locale}/blogs/${slug}`,
      },
      openGraph: {
        title,
        description: cleanDescription,
        url: `${SITE_CONTACT.siteUrl}/${locale}/blogs/${slug}`,
        siteName: SITE_CONTACT.brandName,
        type: "article",
        images: [{ url: imageUrl, alt: blog.title }],
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
      title: "Egypt Travel Guide & Stories | KKToEnojy Blog",
      description:
        "Read expert Egypt travel tips, destination guides, and authentic holiday stories from KKToEnojy.",
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

  let blogJsonLd = null;

  if (id) {
    try {
      const res = await fetch(getApiUrl(`/api/Blogs/${id}`), {
        headers: getLanguageHeaders(locale),
        next: { revalidate: 3600 },
      });

      if (res.ok) {
        const json = await res.json();
        const blog = json.data;
        if (blog) {
          const imageUrl = blog.imageUrl
            ? getImageUrl(blog.imageUrl)
            : `${SITE_CONTACT.siteUrl}/og-image.jpg`;

          blogJsonLd = {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: blog.title,
            description: (blog.content || "")
              .replace(/<[^>]+>/g, " ")
              .replace(/[*#_`~\[\]]/g, "")
              .replace(/\s+/g, " ")
              .trim()
              .substring(0, 200),
            image: [imageUrl],
            datePublished: blog.createdAt || new Date().toISOString(),
            dateModified: blog.updatedAt || blog.createdAt || new Date().toISOString(),
            author: {
              "@type": "Organization",
              name: SITE_CONTACT.brandName,
              url: SITE_CONTACT.siteUrl,
            },
            publisher: {
              "@type": "Organization",
              name: SITE_CONTACT.brandName,
              url: SITE_CONTACT.siteUrl,
              logo: {
                "@type": "ImageObject",
                url: `${SITE_CONTACT.siteUrl}/Hero/logo.png`,
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `${SITE_CONTACT.siteUrl}/${locale}/blogs/${slug}`,
            },
          };
        }
      }
    } catch {
      // Graceful fallback
    }
  }

  return (
    <>
      {blogJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
        />
      )}
      <BlogDetailPage slug={slug} />
    </>
  );
}
