"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import styles from "./ApiDiffShowcase.module.css";

/* ── Types ────────────────────────────────────────────── */
type EndpointStatus = "NEW" | "MODIFIED" | "REMOVED" | "UNCHANGED";

interface DiffLine {
  type: "added" | "removed" | "unchanged";
  text: string;
}

interface Endpoint {
  id: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  path: string;
  status: EndpointStatus;
  diffLines?: DiffLine[];
}

interface ApiModule {
  id: string;
  name: string;
  endpoints: Endpoint[];
}

/* ── Data ─────────────────────────────────────────────── */
const MODULES: ApiModule[] = [
  {
    id: "account-reports",
    name: "account-reports",
    endpoints: [
      {
        id: "post-account-reports",
        method: "POST",
        path: "/api/v1/account-reports",
        status: "MODIFIED",
        diffLines: [
          { type: "unchanged", text: "export interface AccountReport {" },
          { type: "unchanged", text: "  id: string;" },
          { type: "unchanged", text: "  reportName: string;" },
          { type: "removed",   text: "  status: string;" },
          { type: "added",     text: '  status: "PENDING" | "ACTIVE" | "ARCHIVED";' },
          { type: "added",     text: "  exportUrl?: string;" },
          { type: "removed",   text: "  legacy_download_token?: number;" },
          { type: "unchanged", text: "  createdAt: string;" },
          { type: "unchanged", text: "}" },
        ],
      },
      { id: "get-account-reports",   method: "GET", path: "/api/v1/account-reports",      status: "UNCHANGED" },
      { id: "get-account-report-id", method: "GET", path: "/api/v1/account-reports/{id}", status: "UNCHANGED" },
    ],
  },
  {
    id: "reports",
    name: "reports",
    endpoints: [
      {
        id: "post-reports-export",
        method: "POST",
        path: "/api/v1/reports/export",
        status: "NEW",
        diffLines: [
          { type: "added", text: "export const exportReport = {" },
          { type: "added", text: '  id: "export_report",' },
          { type: "added", text: '  path: "/api/v1/reports/export",' },
          { type: "added", text: '  method: "POST",' },
          { type: "added", text: "  isProtected: true," },
          { type: "added", text: "} satisfies ReexDefinition;" },
        ],
      },
      {
        id: "delete-reports-legacy",
        method: "DELETE",
        path: "/api/v1/reports/legacy-pdf",
        status: "REMOVED",
        diffLines: [
          { type: "removed", text: "export const legacyPdfExport = {" },
          { type: "removed", text: '  path: "/api/v1/reports/legacy-pdf",' },
          { type: "removed", text: "} satisfies ReexDefinition;" },
        ],
      },
    ],
  },
  {
    id: "auth",
    name: "auth",
    endpoints: [
      { id: "post-auth-login",   method: "POST", path: "/api/v1/auth/login",   status: "UNCHANGED" },
      { id: "post-auth-refresh", method: "POST", path: "/api/v1/auth/refresh", status: "UNCHANGED" },
    ],
  },
];

const ALL_ENDPOINTS = MODULES.flatMap((m) => m.endpoints);

const INITIAL_CHECKED = new Set(
  ALL_ENDPOINTS
    .filter((e) => e.status === "NEW" || e.status === "MODIFIED")
    .map((e) => e.id)
);

const METHOD_COLOR: Record<string, string> = {
  GET:    "var(--accent-cyan)",
  POST:   "var(--accent-emerald)",
  PUT:    "var(--accent-amber)",
  PATCH:  "var(--accent-amber)",
  DELETE: "#f87171",
};

const STATUS_CLASS: Record<EndpointStatus, string> = {
  NEW:       "badgeNew",
  MODIFIED:  "badgeMod",
  REMOVED:   "badgeDel",
  UNCHANGED: "badgeUnchanged",
};

/* ── Component ────────────────────────────────────────── */
export const ApiDiffShowcase: React.FC = () => {
  const [expanded, setExpanded]         = useState(new Set(["account-reports", "reports"]));
  const [checked, setChecked]           = useState(new Set(INITIAL_CHECKED));
  const [activeDiffId, setActiveDiffId] = useState<string | null>("post-account-reports");
  const [applied, setApplied]           = useState(false);

  const toggleExpand = (id: string) =>
    setExpanded((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const toggleCheck = (id: string) =>
    setChecked((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  /* dynamic apply button label */
  const addCount    = ALL_ENDPOINTS.filter((e) => e.status === "NEW"      && checked.has(e.id)).length;
  const updateCount = ALL_ENDPOINTS.filter((e) => e.status === "MODIFIED" && checked.has(e.id)).length;
  const removeCount = ALL_ENDPOINTS.filter((e) => e.status === "REMOVED"  && checked.has(e.id)).length;
  const segments    = [
    addCount    > 0 && `Add ${addCount}`,
    updateCount > 0 && `Update ${updateCount}`,
    removeCount > 0 && `Remove ${removeCount}`,
  ].filter(Boolean) as string[];
  const applyLabel = segments.length > 0 ? segments.join(" · ") : "Select changes";
  const canApply   = segments.length > 0 && !applied;

  const activeDiffEp = activeDiffId ? ALL_ENDPOINTS.find((e) => e.id === activeDiffId) : null;

  return (
    <section className={styles.section} id="diff-engine">
      <Container>
        <SectionHeader
          tag="Smart API Diffing"
          title="Re-import without fear. Review every change, accept what you want."
          description="Reex compares the new collection against your existing definitions. New fields, removed endpoints, payload mutations — all surfaced before a single line of code is touched."
        />

        {/* ── Modal Window ── */}
        <div className={styles.modalWindow}>

          {/* Title Bar */}
          <div className={styles.titleBar}>
            <span className={styles.modalTitle}>Review Changes</span>
            <button className={styles.closeBtn} aria-label="Close">✕</button>
          </div>

          {/* Summary strip */}
          <div className={styles.summaryStrip}>
            <span className={styles.sumNew}>+2 Added</span>
            <span className={styles.sumSep}>·</span>
            <span className={styles.sumMod}>~1 Modified</span>
            <span className={styles.sumSep}>·</span>
            <span className={styles.sumDel}>-1 Removed</span>
            <span className={styles.sumSep}>·</span>
            <span className={styles.sumUnchanged}>4 Unchanged</span>
          </div>

          {/* Module list + diff panel */}
          <div className={styles.reviewBody}>

            {/* Left: modules */}
            <div className={styles.moduleList}>
              {MODULES.map((mod) => {
                const isExpanded   = expanded.has(mod.id);
                const checkedCount = mod.endpoints.filter((e) => checked.has(e.id)).length;

                return (
                  <div key={mod.id} className={styles.moduleGroup}>
                    <div className={styles.moduleHeader} onClick={() => toggleExpand(mod.id)}>
                      <span className={styles.chevron}>{isExpanded ? "▾" : "▸"}</span>
                      <span className={styles.moduleName}>{mod.name}</span>
                      <span className={styles.moduleCount}>{checkedCount}/{mod.endpoints.length}</span>
                    </div>

                    {isExpanded && (
                      <div className={styles.endpointList}>
                        {mod.endpoints.map((ep) => (
                          <div
                            key={ep.id}
                            className={`${styles.endpointRow} ${activeDiffId === ep.id ? styles.endpointRowActive : ""}`}
                          >
                            <input
                              type="checkbox"
                              className={styles.epCheck}
                              checked={checked.has(ep.id)}
                              onChange={() => toggleCheck(ep.id)}
                            />
                            <span className={styles.epMethod} style={{ color: METHOD_COLOR[ep.method] }}>
                              {ep.method}
                            </span>
                            <span className={styles.epPath}>{ep.path}</span>
                            <span className={`${styles.epBadge} ${styles[STATUS_CLASS[ep.status]]}`}>
                              {ep.status}
                            </span>
                            {ep.diffLines && (
                              <button
                                className={`${styles.viewBtn} ${activeDiffId === ep.id ? styles.viewBtnActive : ""}`}
                                onClick={() => setActiveDiffId(activeDiffId === ep.id ? null : ep.id)}
                              >
                                {activeDiffId === ep.id ? "Hide" : "Diff"}
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right: inline diff panel */}
            {activeDiffEp?.diffLines && (
              <div className={styles.diffPanel}>
                <div className={styles.diffPanelHeader}>
                  <span className={styles.diffPanelMethod} style={{ color: METHOD_COLOR[activeDiffEp.method] }}>
                    {activeDiffEp.method}
                  </span>
                  <span className={styles.diffPanelPath}>{activeDiffEp.path}</span>
                </div>
                <div className={styles.diffLines}>
                  {activeDiffEp.diffLines.map((line, i) => (
                    <div
                      key={i}
                      className={`${styles.diffLine} ${
                        line.type === "added"   ? styles.lineAdded   :
                        line.type === "removed" ? styles.lineRemoved :
                                                  styles.lineUnchanged
                      }`}
                    >
                      <span className={styles.linePrefix}>
                        {line.type === "added" ? "+" : line.type === "removed" ? "−" : " "}
                      </span>
                      <code className={styles.lineText}>{line.text}</code>
                    </div>
                  ))}
                </div>
                <div className={styles.diffPanelFootnote}>
                  AST-safe: custom overrides in your repo are preserved.
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className={styles.modalFooter}>
            <button
              className={`${styles.primaryBtn} ${applied ? styles.appliedBtn : ""}`}
              disabled={!canApply}
              onClick={() => setApplied(true)}
            >
              {applied ? "✓ Applied to codebase" : applyLabel}
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};
