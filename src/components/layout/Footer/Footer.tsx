import Image from "next/image";
import { Container } from "@/components/ui/Container/Container";
import { GithubIcon } from "@/components/ui/icons/GithubIcon";
import { Terminal } from "lucide-react";
import logoDark from "@/assets/logo-dark.svg";
import React from "react";
import styles from "./Footer.module.css";

export const Footer: React.FC<{ cliVersion?: string }> = ({ cliVersion = "v7.3.2" }) => {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.grid}>
          {/* Brand Col */}
          <div className={styles.brandCol}>
            <a href="#" className={styles.logoRow} aria-label="Reex API - Scroll to top">
              <Image src={logoDark} alt="Reex API" width={100} height={30} />
            </a>
            <p className={styles.tagline}>
              The open-source visual API client and AST code generator. Turn
              your REST & OpenAPI schemas into type-safe TanStack Query hooks
              without writing integration boilerplate.
            </p>
          </div>

          {/* Product Column */}
          <div>
            <h4 className={styles.colTitle}>Product</h4>
            <ul className={styles.linkList}>
              <li className={styles.linkItem}>
                <a
                  href="https://docs.reex-api.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Documentation
                </a>
              </li>
              <li className={styles.linkItem}>
                <a
                  href="https://studio.reex-api.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Launch Studio App
                </a>
              </li>
              <li className={styles.linkItem}>
                <a
                  href="https://www.npmjs.com/package/reex-cli"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Terminal size={12} /> reex-cli (npm)
                </a>
              </li>
              <li className={styles.linkItem}>
                <a href="#code-gen">TanStack Query Hooks</a>
              </li>
              <li className={styles.linkItem}>
                <a href="#diff-engine">AST Diff Engine</a>
              </li>
              <li className={styles.linkItem}>
                <a href="#features">Private Network Access</a>
              </li>
            </ul>
          </div>

          {/* Open Source Column */}
          <div>
            <h4 className={styles.colTitle}>Open Source</h4>
            <ul className={styles.linkList}>
              <li className={styles.linkItem}>
                <a
                  href="https://github.com/EECvision/reex-client"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GithubIcon size={12} /> Web Client Repo
                </a>
              </li>
              <li className={styles.linkItem}>
                <a
                  href="https://github.com/EECvision/reex-cli"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GithubIcon size={12} /> CLI Repo
                </a>
              </li>
              <li className={styles.linkItem}>
                <a
                  href="https://github.com/EECvision/reex-cli/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Report an Issue
                </a>
              </li>
              <li className={styles.linkItem}>
                <a
                  href="https://github.com/EECvision/reex-cli/blob/main/LICENSE"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  MIT License
                </a>
              </li>
            </ul>
          </div>

          {/* Architecture Column */}
          <div>
            <h4 className={styles.colTitle}>Tech Stack</h4>
            <ul className={styles.linkList}>
              <li className={styles.linkItem}>
                <a
                  href="https://tanstack.com/query"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  TanStack React Query
                </a>
              </li>
              <li className={styles.linkItem}>
                <a
                  href="https://ts-morph.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ts-morph AST Engine
                </a>
              </li>
              <li className={styles.linkItem}>
                <a
                  href="https://developer.chrome.com/docs/privacy-sandbox/private-network-access"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  W3C Private Network Access
                </a>
              </li>
              <li className={styles.linkItem}>
                <a
                  href="https://nextjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Next.js App Router
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div>
            © {new Date().getFullYear()} Reex API. Built by Ezeka Emmanuel under
            the{" "}
            <a
              href="https://opensource.org/licenses/MIT"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mitLink}
            >
              MIT License
            </a>
            .
          </div>

          <div className={styles.statusPill}>
            <span className={styles.statusDot} />
            <span>reex-cli {cliVersion}</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};
