import type { Metadata } from "next";
import brand from "../../seo/brand.json";
import { siteConfig } from "./site";

// Metadata routes are generated at build time. Set these before building.
export const INDEXING_ENABLED =
  process.env.SEO_NOINDEX !== "true" &&
  process.env.NODE_ENV === "production" &&
  (!process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production");

export const PUBLIC_PATHS = ["/"] as const;

export function siteUrl(path: string) {
  return new URL(path, siteConfig.marketingUrl).href;
}

export function pageMetadata({
  title,
  description,
  path,
  index = true,
}: {
  title: string;
  description: string;
  path: string;
  index?: boolean;
}): Metadata {
  const canIndex = INDEXING_ENABLED && index;
  const image = {
    url: siteConfig.ogImage,
    width: 1200,
    height: 630,
    alt: "Reex API logo",
  };

  return {
    title: { absolute: title },
    description,
    ...(index ? { alternates: { canonical: siteUrl(path) } } : {}),
    openGraph: {
      title,
      description,
      url: siteUrl(path),
      siteName: siteConfig.name,
      locale: "en_US",
      type: "website",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: siteConfig.twitterCreator,
    },
    robots: {
      index: canIndex,
      follow: true,
      googleBot: {
        index: canIndex,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": brand.entities.marketingWebsite,
      name: siteConfig.name,
      alternateName: brand.sites.marketing.alternateNames,
      url: siteUrl("/"),
      inLanguage: "en",
      about: { "@id": brand.entities.product },
    },
    {
      "@type": "SoftwareApplication",
      "@id": brand.entities.product,
      name: brand.searchName,
      alternateName: [brand.productName, "Reex API Builder"],
      description: siteConfig.description,
      url: siteUrl("/"),
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Windows, macOS, Linux",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      author: {
        "@type": "Person",
        name: "Ezeka Emmanuel",
        url: "https://github.com/EECvision",
      },
      hasPart: { "@id": brand.entities.studioApplication },
      subjectOf: { "@id": brand.entities.docsWebsite },
    },
  ],
};
