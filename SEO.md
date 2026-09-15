# Reex marketing SEO

The marketing site is the primary brand destination for Reex API, the React framework for API integration. Its canonical origin is `https://www.reex-api.dev`.

`seo/brand.json` contains the shared identity used in all four repositories. `src/lib/site.ts` consumes the identity, and `src/lib/seo.ts` owns complete per-page metadata, indexing guards, and homepage JSON-LD. Keep the contract synchronized with Studio, docs, and CLI; run Studio's `npm run check:seo:workspace` to check all four projects together.

## Public routes

| Route | Indexing | Canonical | Sitemap |
| --- | --- | --- | --- |
| `/` | Index in production | `https://www.reex-api.dev/` | Yes |
| `/index` | Permanent redirect to `/` | Destination handles it | No |
| `/react-query-generator` | Noindex, follow | None | No |
| `/openapi-react-query` | Noindex, follow | None | No |
| `/postman-to-react-query` | Noindex, follow | None | No |
| `/guides/getting-started` | Noindex, follow | None | No |

The four excluded routes currently render only navigation. Their UI remains available, while their unsupported article/content schema is removed. Restore indexing only after substantive content is added under a separate content change. Each has its own social title and URL; no homepage metadata is inherited accidentally.

The sitemap lists only the homepage. It has no artificial build-time modification dates. Robots permits crawling of noindex pages and blocks only API routes.

The homepage has one WebSite and one SoftwareApplication graph linked by a common product ID. Site-name alternatives include Reex and the actual domain. The graph references the Studio application and documentation without treating them as duplicate pages.

The formerly missing `public/og-image.png` is an unchanged copy of the existing 1200 by 630 Reex logo image already used by Studio/docs. No new artwork or page UI was introduced.

## Build and checks

Set `SEO_NOINDEX=true` for nonpublic deployments. Vercel preview/development and development builds automatically disable indexing. Guards run at build time: page directives become noindex, the sitemap becomes empty, and robots omits the sitemap advertisement. An optional `GOOGLE_SITE_VERIFICATION` must be a real token supplied before building.

Run `npm run lint`, `npm run build`, and `npm run test:seo`. The SEO test configuration starts a fresh production server on port 3211. Set `PLAYWRIGHT_CHANNEL=chrome` to use installed Chrome or `PLAYWRIGHT_BASE_URL` to inspect an existing server.

To check a preview build, build with `VERCEL_ENV=preview`, then run the SEO tests with `SEO_EXPECT_NOINDEX=true`. Build again without the preview variables afterward.

Run `npm run test:responsive` for the existing responsive suite; use `PLAYWRIGHT_PRODUCTION=1` to test the built site. The production configuration never reuses a development server.

## Deployment checks

The hosting configuration already redirects `https://reex-api.dev/` to `https://www.reex-api.dev/`. Preserve this and verify that nested paths and query strings are retained. The app's `/index` redirect must also work in the deployment without looping through a host rewrite. Do not redirect unrelated missing paths to the homepage.

Confirm that homepage canonical, Open Graph URL, JSON-LD, sitemap, and npm homepage agree on the `www` origin. Check social-image availability and hosting indexing headers. Submit `https://www.reex-api.dev/sitemap.xml` in the existing verified Search Console Domain property, then inspect the root and duplicate `/index` URL.

Site-name schema is checked with Schema Markup Validator; Google's Rich Results Test does not validate site names. Search Console is required to see Google's selected canonical and indexing decisions. Correct metadata does not guarantee a spelling-correction or ranking outcome.

