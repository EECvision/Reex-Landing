import { Footer } from "@/components/layout/Footer/Footer";
import { Navbar } from "@/components/layout/Navbar/Navbar";
import { Container } from "@/components/ui/Container/Container";
import { SubPageNav } from "@/components/ui/SubPageNav/SubPageNav";
import { pageMetadata } from "@/lib/seo";
import styles from "./OpenApiReactQuery.module.css";

export const metadata = pageMetadata({
  title: "OpenAPI to React Query | Reex API",
  description: "Open Reex API Studio or return to the Reex API homepage.",
  path: "/openapi-react-query",
  index: false,
});

export default function OpenApiReactQueryPage() {
  return (
    <div className={styles.pageWrapper}>
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
