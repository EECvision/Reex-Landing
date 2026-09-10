"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import styles from "./Faq.module.css";

interface FaqItem {
  question: string;
  answer: React.ReactNode;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Is Reex really 100% open source and free?",
    answer: (
      <p>
        Yes, absolutely. Reex is released under the permissive <code>MIT License</code>. All core
        visual studio features, the <code>reex-cli</code> bridge, the OpenAPI/Postman parsers,
        and the AST generator are completely free with zero feature gating, limits, or recurring
        subscriptions.
      </p>
    ),
  },
  {
    question: "How does the web app test my localhost without CORS or security issues?",
    answer: (
      <p>
        Reex implements the modern W3C <strong>Private Network Access (PNA)</strong> standard. The
        browser communicates directly with your local server (e.g. <code>http://localhost:8000</code>)
        via secure preflight requests, eliminating the need for CORS browser extensions, security
        vulnerabilities, or public proxy tunnels.
      </p>
    ),
  },
  {
    question: "Will Reex overwrite my custom TypeScript code when I re-sync?",
    answer: (
      <p>
        No. The code generator uses <code>ts-morph</code> to inspect and modify abstract syntax
        trees (AST). It safely adds new endpoints, synchronizes updated types, and updates query
        keys without clobbering your custom interceptors, manual query options, or helper logic.
      </p>
    ),
  },
  {
    question: "Which frontend frameworks and libraries does Reex support?",
    answer: (
      <p>
        Reex generates standard <strong>TanStack React Query v5</strong> hooks and idiomatic
        Axios clients. It works seamlessly with Next.js (both App Router and Pages Router), Vite,
        Remix, Astro, and standard React Single Page Apps.
      </p>
    ),
  },
  {
    question: "Do I have to run the CLI, or can I use Reex as a standalone web client?",
    answer: (
      <p>
        You can use Reex purely in the browser as a lightweight Postman alternative to test and
        debug your endpoints. Running <code>reex start</code> is only needed when you want
        to sync endpoints and generate code directly into your local repository.
      </p>
    ),
  },
  {
    question: "Can my organization self-host the studio in our private cloud?",
    answer: (
      <p>
        Yes. A pre-built Docker image is available on GitHub Container Registry (
        <code>ghcr.io/eecvision/reex-api-builder</code>). You can host it behind your private VPN or
        run it locally without ever connecting to external servers.
      </p>
    ),
  },
];

export const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className={styles.section} id="faq">
      <Container>
        <SectionHeader
          tag="Frequently Asked Questions"
          title="Everything you need to know."
          description="Have questions about security, AST generation, or local setup? Here are the answers."
        />

        <div className={styles.list}>
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`${styles.item} ${isOpen ? styles.itemOpen : ""}`}
              >
                <button
                  type="button"
                  className={styles.trigger}
                  onClick={() => toggleItem(idx)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                >
                  <span className={styles.question}>{item.question}</span>
                  <span className={`${styles.toggle} ${isOpen ? styles.toggleOpen : ""}`}>
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <div id={`faq-answer-${idx}`} className={styles.content}>{item.answer}</div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
