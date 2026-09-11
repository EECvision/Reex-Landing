import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/react-query-generator",
    "/openapi-react-query",
    "/postman-to-react-query",
    "/guides/getting-started",
  ];

  return routes.map((route) => ({
    url: `${siteConfig.marketingUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : route.startsWith("/guides") ? 0.7 : 0.8,
  }));
}
