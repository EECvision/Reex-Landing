import { Footer } from "@/components/layout/Footer/Footer";
import { Navbar } from "@/components/layout/Navbar/Navbar";
import { Container } from "@/components/ui/Container/Container";
import { SubPageNav } from "@/components/ui/SubPageNav/SubPageNav";
import { siteConfig } from "@/lib/site";
import type { Metadata } from "next";
import styles from "./PostmanToReactQuery.module.css";

export const metadata: Metadata = {
  title: "Convert Postman Collection to React Query Hooks | Reex API",
  description:
    "Instantly convert Postman JSON exports into production-ready React Query hooks and type-safe Axios client definitions with Reex.",
  alternates: {
    canonical: `${siteConfig.marketingUrl}/postman-to-react-query`,
  },
};

export default function PostmanToReactQueryPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteConfig.marketingUrl}/postman-to-react-query/#webpage`,
    url: `${siteConfig.marketingUrl}/postman-to-react-query`,
    name: "Convert Postman Collection to React Query Hooks",
    description:
      "Instantly convert Postman JSON exports into production-ready React Query hooks and type-safe Axios client definitions.",
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
