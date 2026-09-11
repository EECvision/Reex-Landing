import { Footer } from "@/components/layout/Footer/Footer";
import { Navbar } from "@/components/layout/Navbar/Navbar";
import { Container } from "@/components/ui/Container/Container";
import { SubPageNav } from "@/components/ui/SubPageNav/SubPageNav";
import { siteConfig } from "@/lib/site";
import type { Metadata } from "next";
import styles from "./ReactQueryGenerator.module.css";

export const metadata: Metadata = {
  title: "Open-Source React Query Hook Generator | Reex API",
  description:
    "Instantly generate type-safe, production-ready TanStack React Query hooks from any REST API schema. Stop writing fetch boilerplate and start consuming APIs.",
  alternates: {
    canonical: `${siteConfig.marketingUrl}/react-query-generator`,
  },
};

export default function ReactQueryGeneratorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteConfig.marketingUrl}/react-query-generator/#webpage`,
    url: `${siteConfig.marketingUrl}/react-query-generator`,
    name: "Open-Source React Query Hook Generator",
    description:
      "Instantly generate type-safe, production-ready TanStack React Query hooks from any REST API schema.",
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
