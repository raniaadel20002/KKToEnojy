import type { MetadataRoute } from "next";
import { SITE_CONTACT } from "@/src/shared/config/contact";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/",
          "/*/cart",
          "/*/checkout",
          "/*/checkout/*",
          "/api/",
        ],
      },
    ],
    sitemap: `${SITE_CONTACT.siteUrl}/sitemap.xml`,
  };
}

