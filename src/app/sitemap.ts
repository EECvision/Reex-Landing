import type { MetadataRoute } from "next";
import { INDEXING_ENABLED, PUBLIC_PATHS, siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  // Navigation-only pages stay excluded until they have substantive content.
  // Omit lastModified until a real content-change date is available.
  return INDEXING_ENABLED ? PUBLIC_PATHS.map((path) => ({ url: siteUrl(path) })) : [];
}
