import React from "react";
import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/Button/Button";
import { ArrowRight, Compass } from "lucide-react";
import styles from "./SubPageNav.module.css";

export const SubPageNav: React.FC = () => {
  return (
    <div className={styles.container}>
      <Button
        variant="glow"
        size="lg"
        href={siteConfig.studioUrl}
        external
        iconRight={<ArrowRight size={18} />}
      >
        Launch Studio
      </Button>
      <Button
        variant="outline"
        size="lg"
        href={siteConfig.marketingUrl}
        iconRight={<Compass size={18} />}
      >
        Visit Main Page
      </Button>
    </div>
  );
};
