import { expect, test } from "@playwright/test";
import brand from "../seo/brand.json";

const origin = brand.origins.marketing;
const indexable = process.env.SEO_EXPECT_NOINDEX !== "true";
const indexedSubPages = [
  {
    path: "/openapi-react-query",
    title: "OpenAPI to React Query | Generate Type-Safe Hooks | Reex API",
    heading: "OpenAPI to Type-Safe React Query Hooks",
  },
  {
    path: "/postman-to-react-query",
    title: "Postman to React Query | Convert Collections to Hooks | Reex API",
    heading: "Postman Collections to Production React Query Hooks",
  },
  {
    path: "/react-query-generator",
    title: "React Query Generator | TanStack Query Code Generator | Reex API",
    heading: "The Intelligent React Query Generator for Modern Web Apps",
  },
];
const excluded = ["/guides/getting-started"];

test.describe("rendered SEO", () => {
  test.use({ javaScriptEnabled: false });

  test("homepage declares its canonical identity and preserves visible content", async ({ page }) => {
    const response = await page.goto("/?utm_source=seo-check");
    expect(response?.status()).toBe(200);
    if (indexable) expect(response?.headers()["x-robots-tag"] || "").not.toContain("noindex");
    const title = "Reex API | The React Framework for API Integration";
    await expect(page).toHaveTitle(title);
    await expect(page.locator("head title")).toHaveCount(1);
    const canonical = page.locator('head link[rel="canonical"]');
    await expect(canonical).toHaveCount(1);
    expect(new URL((await canonical.getAttribute("href"))!).href).toBe(`${origin}/`);
    await expect(page.locator('head meta[name="robots"]')).toHaveAttribute("content", indexable ? "index, follow" : "noindex, follow");
    const description = page.locator('head meta[name="description"]');
    await expect(description).toHaveCount(1);
    await expect(description).toHaveAttribute("content", /Reex API is the React framework for API integration/);
    await expect(page.locator('head meta[property="og:title"]')).toHaveAttribute("content", title);
    await expect(page.locator('head meta[property="og:site_name"]')).toHaveAttribute("content", brand.sites.marketing.name);
    expect(new URL((await page.locator('head meta[property="og:url"]').getAttribute("content"))!).href).toBe(`${origin}/`);
    await expect(page.locator('head meta[name="twitter:title"]')).toHaveAttribute("content", title);
    await expect(page.locator('head meta[name="twitter:description"]')).toHaveAttribute("content", (await description.getAttribute("content"))!);

    const schema = JSON.parse(await page.locator('script[type="application/ld+json"]').innerText());
    const website = schema["@graph"].find((node: { "@type": string }) => node["@type"] === "WebSite");
    const product = schema["@graph"].find((node: { "@type": string }) => node["@type"] === "SoftwareApplication");
    expect(website["@id"]).toBe(brand.entities.marketingWebsite);
    expect(website.alternateName).toEqual(brand.sites.marketing.alternateNames);
    expect(website.about["@id"]).toBe(product["@id"]);
    expect(product["@id"]).toBe(brand.entities.product);
    expect(product.hasPart["@id"]).toBe(brand.entities.studioApplication);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("From API Schema to Type-Safe React Query in Seconds.");
  });

  for (const subPage of indexedSubPages) {
    test(`${subPage.path} is indexed with full content, canonical URL, and schema`, async ({ page }) => {
      const response = await page.goto(subPage.path);
      expect(response?.status()).toBe(200);
      await expect(page).toHaveTitle(subPage.title);
      const canonical = page.locator('head link[rel="canonical"]');
      await expect(canonical).toHaveCount(1);
      expect(new URL((await canonical.getAttribute("href"))!).href).toBe(`${origin}${subPage.path}`);
      await expect(page.locator('head meta[name="robots"]')).toHaveAttribute(
        "content",
        indexable ? "index, follow" : "noindex, follow"
      );
      const schema = JSON.parse(await page.locator('script[type="application/ld+json"]').innerText());
      expect(schema["@graph"].length).toBeGreaterThan(0);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(subPage.heading);
    });
  }

  for (const path of excluded) {
    test(`${path} stays available but is excluded from search`, async ({ page }) => {
      expect((await page.goto(path))?.status()).toBe(200);
      await expect(page.locator('head meta[name="robots"]')).toHaveAttribute("content", "noindex, follow");
      await expect(page.locator('head meta[name="googlebot"]')).toHaveAttribute("content", /^noindex, follow/);
      await expect(page.locator('head link[rel="canonical"]')).toHaveCount(0);
      await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(0);
      await expect(page.locator('head meta[property="og:url"]')).toHaveAttribute("content", `${origin}${path}`);
      await expect(page.locator('head meta[property="og:title"]')).toHaveAttribute("content", await page.title());
      await expect(page.locator('head meta[name="twitter:title"]')).toHaveAttribute("content", await page.title());
      await expect(page.getByRole("main")).toHaveText("Launch StudioVisit Main Page");
    });
  }
});

test("sitemap, robots, redirects, images and errors agree", async ({ request }) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  const xml = await sitemap.text();
  expect([...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1])).toEqual(
    indexable
      ? [
          `${origin}/`,
          `${origin}/openapi-react-query`,
          `${origin}/postman-to-react-query`,
          `${origin}/react-query-generator`,
        ]
      : []
  );
  expect(xml).not.toContain("<lastmod>");
  const robots = await request.get("/robots.txt");
  const rules = await robots.text();
  expect(rules.includes(`Sitemap: ${origin}/sitemap.xml`)).toBe(indexable);
  expect(rules).toContain("Allow: /");
  expect(rules).not.toMatch(/Disallow: \/(?:react-query-generator|openapi-react-query|postman-to-react-query|guides|_next)/);
  const alias = await request.get("/index?utm_source=old", { maxRedirects: 0 });
  expect(alias.status()).toBe(308);
  const target = new URL(alias.headers().location, "http://localhost");
  expect(target.pathname).toBe("/");
  expect(target.search).toBe("?utm_source=old");
  expect((await request.get("/index")).status()).toBe(200);
  expect((await request.get("/", { maxRedirects: 0 })).status()).toBe(200);
  const missing = await request.get("/seo-check-missing-page");
  expect(missing.status()).toBe(404);
  expect(await missing.text()).toContain('name="robots" content="noindex"');
  const image = await request.get("/og-image.png");
  expect(image.status()).toBe(200);
  expect(image.headers()["content-type"]).toContain("image/png");
  const png = await image.body();
  expect([png.readUInt32BE(16), png.readUInt32BE(20)]).toEqual([1200, 630]);
  expect((await request.get("/favicon.svg")).status()).toBe(200);
});
