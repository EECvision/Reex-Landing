import { Footer } from "@/components/layout/Footer/Footer";
import { Navbar } from "@/components/layout/Navbar/Navbar";
import { Container } from "@/components/ui/Container/Container";
import { SubPageNav } from "@/components/ui/SubPageNav/SubPageNav";
import { siteConfig } from "@/lib/site";
import type { Metadata } from "next";
import styles from "./OpenApiReactQuery.module.css";

export const metadata: Metadata = {
  title: "OpenAPI to TanStack React Query Code Generator | Reex API",
  description:
    "Instantly convert OpenAPI (Swagger) specs into fully typed TanStack React Query hooks. Automate endpoint configuration and focus on building your app.",
  alternates: {
    canonical: `${siteConfig.marketingUrl}/openapi-react-query`,
  },
};

export default function OpenApiReactQueryPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteConfig.marketingUrl}/openapi-react-query/#webpage`,
    url: `${siteConfig.marketingUrl}/openapi-react-query`,
    name: "OpenAPI to TanStack React Query Code Generator",
    description:
      "Instantly convert OpenAPI (Swagger) specs into fully typed TanStack React Query hooks.",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${siteConfig.marketingUrl}/#website`,
      url: siteConfig.marketingUrl,
      name: "Reex API",
    },
  };

  return (
    <div className={styles.pageWrapper}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className={styles.mainSection}>
        <Container>
          <SubPageNav />
        </Container>
      </main>
      <Footer />
    </div>
  );
}
