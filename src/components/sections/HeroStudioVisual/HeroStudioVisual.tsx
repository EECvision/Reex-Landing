"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container/Container";
import styles from "./HeroStudioVisual.module.css";

export const HeroStudioVisual: React.FC = () => {
  return (
    <section className={styles.section} id="studio-preview">
      <Container>
        <div className={styles.videoPlaceholderWrapper}>
          <Image
            src="/images/studio-video-placeholder.jpg"
            alt="Reex Studio interface showing API projects and request configuration"
            width={1280}
            height={720}
            className={styles.videoImage}
            sizes="(max-width: 768px) 100vw, 1280px"
            priority
          />
          <div className={styles.playButtonOverlay}>
            <div className={styles.playIcon} />
          </div>
        </div>
      </Container>
    </section>
  );
};
