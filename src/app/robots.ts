import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { INDEXING_ENABLED } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    // Leave noindex pages crawlable so their directives can be read.
    ...(INDEXING_ENABLED ? { sitemap: `${siteConfig.marketingUrl}/sitemap.xml` } : {}),
  };
}
