import React from "react";
import { Navbar } from "@/components/layout/Navbar/Navbar";
import { Footer } from "@/components/layout/Footer/Footer";
import { Container } from "@/components/ui/Container/Container";
import { pageMetadata, siteUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import {
  FileJson,
  Layers,
  Sparkles,
  ArrowRight,
  BookOpen,
  RefreshCw,
  Sliders,
  CheckCircle2,
  Terminal,
} from "lucide-react";
import styles from "./PostmanToReactQuery.module.css";

export const metadata = pageMetadata({
  title: "Postman to React Query | Convert Collections to Hooks | Reex API",
  description:
    "Convert Postman v2.1 collections directly into type-safe TanStack React Query v5 hooks and TypeScript API clients. Eliminate API drift with automatic type inference.",
  path: "/postman-to-react-query",
  index: true,
});

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": siteUrl("/postman-to-react-query#webpage"),
      url: siteUrl("/postman-to-react-query"),
      name: "Postman to React Query Generator | Reex API",
      description:
        "Turn Postman v2.1 collections into production-ready TanStack React Query hooks and TypeScript API services.",
      isPartOf: { "@id": `${siteConfig.marketingUrl}/#website` },
      about: { "@id": `${siteConfig.marketingUrl}/#software` },
    },
    {
      "@type": "SoftwareApplication",
      "@id": siteUrl("/postman-to-react-query#software"),
      name: "Reex Postman to React Query Generator",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Windows, macOS, Linux, Web",
      url: siteUrl("/postman-to-react-query"),
      description:
        "Automated tool to transform Postman collections into typed React Query hooks, query key factories, and API services.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
  ],
};

const samplePostmanCode = `// 1. Postman Collection v2.1 Item
{
  "name": "Create Invoice",
  "request": {
    "method": "POST",
    "url": { "raw": "{{baseUrl}}/api/v1/invoices" },
    "body": {
      "mode": "raw",
      "raw": "{\\n  \\"customer\\": \\"cust_99\\",\\n  \\"amount\\": 450.00\\n}"
    }
  }
}

// 2. Reex Generated Output (written to src/api-services/)
export interface CreateInvoicePayload {
  customer: string;
  amount: number;
}

export const useCreateInvoiceMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateInvoicePayload) => invoicesApi.createInvoice(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: invoicesQueryKeys.all });
    },
  });
};`;

export default function PostmanToReactQueryPage() {
  return (
    <div className={styles.pageWrapper}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <Navbar />
      <main className={styles.mainSection}>
        <Container>
          {/* Hero Section */}
          <div className={styles.heroContainer}>
            <div className={styles.badge}>
              <Sparkles size={14} />
              <span>Postman Collection v2.1 Compatible</span>
            </div>
            <h1 className={styles.title}>
              Postman Collections to Production React Query Hooks
            </h1>
            <p className={styles.description}>
              Stop manually converting Postman requests into handwritten Axios calls. Reex imports
              your Postman collections, infers TypeScript types from live responses, and generates
              idiomatic TanStack Query v5 hooks.
            </p>
            <div className={styles.ctaGroup}>
              <a
                href={siteConfig.studioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaPrimary}
              >
                <span>Import Postman Collection</span>
                <ArrowRight size={16} />
              </a>
              <a
                href={siteConfig.docsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaSecondary}
              >
                <BookOpen size={16} />
                <span>Read Postman Guide</span>
              </a>
            </div>
          </div>

          {/* Features Grid */}
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIconWrapper}>
                <FileJson size={20} />
              </div>
              <h2 className={styles.featureTitle}>Drop-in Collection Import</h2>
              <p className={styles.featureText}>
                Export your Postman collection as JSON (v2.1) and drop it directly into Reex Studio.
                Folder structures, environment variables, headers, and request bodies are preserved.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIconWrapper}>
                <Sliders size={20} />
              </div>
              <h2 className={styles.featureTitle}>Auto Type Inference</h2>
              <p className={styles.featureText}>
                Reex inspects recorded Postman response examples or runs live endpoint tests to infer
                exact TypeScript interfaces for request payloads and response bodies automatically.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIconWrapper}>
                <Layers size={20} />
              </div>
              <h2 className={styles.featureTitle}>Standardized Query Keys</h2>
              <p className={styles.featureText}>
                Creates clean, modular query key factories for every Postman folder module,
                preventing cache collisions and making cache management predictable.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIconWrapper}>
                <CheckCircle2 size={20} />
              </div>
              <h2 className={styles.featureTitle}>Automatic Invalidation</h2>
              <p className={styles.featureText}>
                Generated <code>useMutation</code> hooks automatically trigger <code>invalidateQueries</code>{" "}
                on matching read queries upon successful completion, keeping your UI in sync.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIconWrapper}>
                <RefreshCw size={20} />
              </div>
              <h2 className={styles.featureTitle}>Collection Diff & Sync</h2>
              <p className={styles.featureText}>
                When backend engineers send an updated Postman collection, Reex detects added,
                modified, and removed endpoints without overwriting your existing code.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIconWrapper}>
                <Terminal size={20} />
              </div>
              <h2 className={styles.featureTitle}>Direct File Writing</h2>
              <p className={styles.featureText}>
                With <code>reex-cli</code> running locally, files are scaffolded directly into your
                local <code>src/api-services/</code> folder. Fully editable TypeScript, ready for commit.
              </p>
            </div>
          </div>

          {/* Code Preview */}
          <div className={styles.previewBlock}>
            <h2 className={styles.previewTitle}>
              Turn Postman Requests into Type-Safe React Hooks
            </h2>
            <p className={styles.previewDesc}>
              No more guesswork on response structures. Reex analyzes your collection and produces
              clean, idiomatic TanStack Query code.
            </p>
            <pre className={styles.codePre}>
              <code>{samplePostmanCode}</code>
            </pre>
          </div>

          {/* Step-by-Step Instructions */}
          <div className={styles.instructionsContainer}>
            <h2 className={styles.instructionsTitle}>3 Steps to Migrate from Postman</h2>
            <div className={styles.instructionsList}>
              <div className={styles.instructionItem}>
                <span className={styles.instructionStepNumber}>1</span>
                <div>
                  <h3 className={styles.instructionHeading}>
                    Export Postman Collection
                  </h3>
                  <p className={styles.instructionDesc}>
                    In Postman, click on your collection options and choose <strong>Export</strong>.
                    Select <strong>Collection v2.1</strong> and save the JSON file to your machine.
                  </p>
                </div>
              </div>

              <div className={styles.instructionItem}>
                <span className={styles.instructionStepNumber}>2</span>
                <div>
                  <h3 className={styles.instructionHeading}>
                    Drop into Reex Studio
                  </h3>
                  <p className={styles.instructionDesc}>
                    Open{" "}
                    <a href={siteConfig.studioUrl} target="_blank" rel="noopener noreferrer" className={styles.codeInline}>
                      Reex API Studio
                    </a>{" "}
                    and drag your collection file onto the workspace. Review endpoints, organize modules,
                    and verify environment variables like <span className={styles.codeInline}>{"{{baseUrl}}"}</span>.
                  </p>
                </div>
              </div>

              <div className={styles.instructionItem}>
                <span className={styles.instructionStepNumber}>3</span>
                <div>
                  <h3 className={styles.instructionHeading}>
                    Sync Code with Your IDE
                  </h3>
                  <p className={styles.instructionDesc}>
                    Run <span className={styles.codeInline}>reex start</span> in your terminal. All definitions,
                    TypeScript interfaces, and React Query hooks are generated directly into your codebase.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
