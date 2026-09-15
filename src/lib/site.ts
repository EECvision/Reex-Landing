import brand from "../../seo/brand.json";

export const siteConfig = {
  name: brand.sites.marketing.name,
  title: `${brand.searchName} | The React Framework for API Integration`,
  description:
    `${brand.searchName} is ${brand.positioning.replace(/^The /, "the ")}. Turn OpenAPI and Postman collections into TypeScript clients, TanStack Query hooks, and authentication code.`,
  marketingUrl: brand.origins.marketing,
  studioUrl: brand.origins.studio,
  docsUrl: brand.origins.docs,
  githubUrl: brand.package.repository,
  ogImage: `${brand.origins.marketing}/og-image.png`,
  twitterCreator: "@eecvision",
};
