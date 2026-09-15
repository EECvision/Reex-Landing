import { Footer } from "@/components/layout/Footer/Footer";
import { Navbar } from "@/components/layout/Navbar/Navbar";
import { Container } from "@/components/ui/Container/Container";
import { SubPageNav } from "@/components/ui/SubPageNav/SubPageNav";
import { pageMetadata } from "@/lib/seo";
import styles from "./PostmanToReactQuery.module.css";

export const metadata = pageMetadata({
  title: "Postman to React Query | Reex API",
  description: "Open Reex API Studio or return to the Reex API homepage.",
  path: "/postman-to-react-query",
  index: false,
});

export default function PostmanToReactQueryPage() {
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
