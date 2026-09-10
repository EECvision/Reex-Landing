"use client";

import { CodeBlock } from "@/components/ui/CodeBlock/CodeBlock";
import { Container } from "@/components/ui/Container/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ChevronDown, SquareTerminal } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import styles from "./GeneratedCodeShowcase.module.css";

/* ── File tree node types ──────────────────────────────── */
type FileStatus = "editable" | "generated" | "locked";

interface TreeFile {
  key: string;
  name: string;
  status: FileStatus;
  clickable: boolean;
}

interface TreeFolder {
  name: string;
  status: FileStatus;
  children?: TreeFile[];
}

const TREE: TreeFolder[] = [
  {
    name: "api-services/",
    status: "editable",
    children: [
      { key: "config", name: ".reex/", status: "locked", clickable: false },
      {
        key: "auth",
        name: "auth-methods/",
        status: "locked",
        clickable: false,
      },
      {
        key: "definitions",
        name: "definitions/",
        status: "editable",
        clickable: true,
      },
      {
        key: "generated",
        name: "generated/",
        status: "generated",
        clickable: true,
      },
      { key: "hooks", name: "hooks/", status: "editable", clickable: false },
      {
        key: "providers",
        name: "providers/",
        status: "locked",
        clickable: false,
      },
      { key: "types", name: "types/", status: "generated", clickable: true },
      {
        key: "apiconfig",
        name: "api.config.ts",
        status: "editable",
        clickable: true,
      },
      { key: "core", name: "core.ts", status: "locked", clickable: false },
    ],
  },
];

/* ── Code content ─────────────────────────────────────── */
const CODE_FILES: Record<
  string,
  { tab: string; filename: string; code: string }
> = {
  definitions: {
    tab: "definitions/accountReports.ts",
    filename: "src/api-services/definitions/accountReports.ts",
    code: `import { apiClient } from "../core";
import { type ReexDefinition } from "../.reex/config";
import { type get_accountReports } from "../types/accountReports/get_accountReports";
import { type post_accountReports } from "../types/accountReports/post_accountReports";

export interface CreateAccountReportPayload {
  reportName: string;
  period: string;
  format: "pdf" | "csv" | "xlsx";
  includePending?: boolean;
}

export const accountReportsApi = {
  /** @description Retrieve all account reports @auth */
  get_accountReports: (): Promise<get_accountReports> =>
    apiClient.get(\`/api/v1/account-reports\`),

  /** @description Create a new account report @auth */
  post_accountReports: (
    payload: CreateAccountReportPayload
  ): Promise<post_accountReports> =>
    apiClient.post(\`/api/v1/account-reports\`, payload),
} satisfies ReexDefinition;`,
  },
  generated: {
    tab: "generated/useAccountReportsQueries.ts",
    filename: "src/api-services/generated/useAccountReportsQueries.ts",
    code: `/* eslint-disable @typescript-eslint/no-explicit-any */
// Generated file - DO NOT EDIT
import {
  useQueryClient,
  type UseMutationOptions,
  type UseQueryOptions,
} from "@tanstack/react-query";
import { accountReportsApi } from "../definitions/accountReports";
import { useApiQuery, useApiMutation } from "./query.config";

type ApiData<T extends (...args: any) => any> = Awaited<ReturnType<T>>;
type ApiVars<T extends (...args: any) => any> = Parameters<T>[0];

export const accountReportsKeys = {
  all: ["accountReports"] as const,
  get_accountReports: (params?: ApiVars<typeof accountReportsApi.get_accountReports>) =>
    [...accountReportsKeys.all, "get_accountReports", params] as const,
};

export const useGetAccountReportsQuery = <
  TData = ApiData<typeof accountReportsApi.get_accountReports>
>(
  options?: Omit<
    UseQueryOptions<ApiData<typeof accountReportsApi.get_accountReports>, Error, TData>,
    "queryKey" | "queryFn"
  >
) =>
  useApiQuery(
    accountReportsKeys.get_accountReports(),
    () => accountReportsApi.get_accountReports(),
    options
  );

export const usePostAccountReportsMutation = (
  options?: Omit<
    UseMutationOptions<
      ApiData<typeof accountReportsApi.post_accountReports>,
      Error,
      ApiVars<typeof accountReportsApi.post_accountReports>
    >,
    "mutationFn"
  > & { invalidate?: boolean }
) => {
  const queryClient = useQueryClient();

  return useApiMutation(accountReportsApi.post_accountReports, {
    ...options,
    onSuccess: (data, variables, context) => {
      if (options?.invalidate !== false) {
        queryClient.invalidateQueries({ queryKey: accountReportsKeys.all });
      }
      (options?.onSuccess as any)?.(data, variables, context);
    },
  });
};`,
  },
  types: {
    tab: "types/accountReports/get_accountReports.ts",
    filename: "src/api-services/types/accountReports/get_accountReports.ts",
    code: `// Generated from live response — DO NOT EDIT
// Re-run this endpoint in Reex Studio and click "Save Interface" to update.

export interface AccountReport {
  id: string;
  reportName: string;
  period: string;
  totalTransactions: number;
  settledVolumeUsd: number;
  status: "PENDING" | "ACTIVE" | "ARCHIVED";
  exportUrl?: string;
  createdAt: string;
}

export type get_accountReports = AccountReport[];`,
  },
  apiconfig: {
    tab: "api.config.ts",
    filename: "src/api-services/api.config.ts",
    code: `// @user-config — Update routes, keys, and endpoints to match your backend.
import axios from "axios";
import { type ReexConfig } from "./.reex/config";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.example.com";

export const apiConfig: ReexConfig = {
  baseURL: BASE_URL,

  // Set to true if your API wraps responses in a top-level \`data\` property.
  unwrapResponseData: false,

  // Enable request/response console logging (development only).
  enableApiLogging: process.env.NODE_ENV === "development",

  auth: {
    loginRoute: "/login",
    refreshEndpoint: \`\${BASE_URL}/auth/refresh\`,

    refreshWithToken: async (storedRefreshToken) =>
      axios.post(apiConfig.auth.refreshEndpoint, {
        refreshToken: storedRefreshToken,
      }),

    extractTokens: (responseBody) => ({
      accessToken: responseBody?.accessToken as string | undefined,
      refreshToken: responseBody?.refreshToken as string | undefined,
    }),

    accessTokenKey: "access_token",
    refreshTokenKey: "refresh_token",

    refreshWithCookie: async () =>
      axios.post(apiConfig.auth.refreshEndpoint, undefined, {
        withCredentials: true,
      }),
  },
};`,
  },
};

const STATUS_DOT: Record<FileStatus, string> = {
  editable: styles.dotAmber,
  generated: styles.dotCyan,
  locked: styles.dotDim,
};

const STATUS_LABEL: Record<FileStatus, string> = {
  editable: "editable",
  generated: "auto-gen",
  locked: "internal",
};

type TabKey = keyof typeof CODE_FILES;

const FLOW_STEPS = [
  {
    step: "01",
    title: "You import",
    desc: "Drop in an OpenAPI 3.x spec or Postman v2.1 collection via file or URL.",
  },
  {
    step: "02",
    title: "Reex writes",
    desc: "definitions/, generated/, and types/ are scaffolded to your src/api-services/ folder.",
  },
  {
    step: "03",
    title: "You consume",
    desc: "Call useGetAccountReportsQuery() or usePostAccountReportsMutation() directly in your component.",
  },
];

export const GeneratedCodeShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("definitions");
  const [explorerOpen, setExplorerOpen] = useState(false);
  const tabBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = tabBarRef.current;
    if (!bar) return;
    const revealActiveTab = () => {
      const tab = bar.querySelector<HTMLButtonElement>('[aria-pressed="true"]');
      if (!tab) return;
      const bounds = bar.getBoundingClientRect();
      const selected = tab.getBoundingClientRect();
      if (selected.left < bounds.left) bar.scrollLeft += selected.left - bounds.left;
      else if (selected.right > bounds.right) bar.scrollLeft += selected.right - bounds.right;
    };
    revealActiveTab();
    const observer = new ResizeObserver(revealActiveTab);
    observer.observe(bar);
    return () => observer.disconnect();
  }, [activeTab]);

  const current = CODE_FILES[activeTab];

  return (
    <section className={styles.section} id="code-gen">
      <Container>
        <SectionHeader
          tag="Real Generated Output"
          title="Your entire API layer. Written to disk, not a black box."
          description="Reex writes real, editable TypeScript files to your src/api-services/ directory — definitions you can modify, hooks that stay in sync."
        />

        {/* IDE Window */}
        <div className={styles.showcaseWindow}>
          {/* Window Chrome */}
          <div className={styles.windowChrome}>
            <div className={styles.trafficLights}>
              <span className={styles.dot} style={{ background: "#ff5f57" }} />
              <span className={styles.dot} style={{ background: "#ffbd2e" }} />
              <span className={styles.dot} style={{ background: "#28c840" }} />
            </div>
            <span className={styles.chromePath}>src / api-services /</span>
            <span className={styles.chromeRight}>
              <SquareTerminal
                size={15}
                strokeWidth={1.75}
                className={styles.chromeIcon}
              />
            </span>
          </div>

          {/* Body: Tree + Editor */}
          <div className={styles.windowBody}>
            <button
              type="button"
              className={styles.explorerToggle}
              aria-expanded={explorerOpen}
              aria-controls="generated-file-explorer"
              onClick={() => setExplorerOpen((open) => !open)}
            >
              Browse generated files
              <ChevronDown size={16} aria-hidden="true" />
            </button>
            {/* Left File Tree */}
            <div id="generated-file-explorer" className={styles.fileTreePane} data-open={explorerOpen}>
              <div className={styles.treeHeader}>Explorer</div>

              {TREE.map((folder) => (
                <div key={folder.name}>
                  <div className={styles.treeRoot}>
                    <span className={styles.treeRootName}>{folder.name}</span>
                  </div>

                  <div className={styles.treeList}>
                    {folder.children?.map((file) => (
                      <button
                        type="button"
                        key={file.key}
                        disabled={!file.clickable}
                        aria-pressed={file.clickable ? activeTab === file.key : undefined}
                        className={`${styles.treeItem} ${
                          !file.clickable ? styles.treeItemLocked : ""
                        } ${activeTab === file.key ? styles.treeItemActive : ""}`}
                        onClick={() =>
                          file.clickable && setActiveTab(file.key as TabKey)
                        }
                        title={STATUS_LABEL[file.status]}
                      >
                        <span
                          className={`${styles.statusDot} ${STATUS_DOT[file.status]}`}
                        />
                        <span className={styles.treeFileName}>{file.name}</span>
                        {file.status !== "locked" && (
                          <span className={styles.treeTag}>
                            {STATUS_LABEL[file.status]}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {/* Legend */}
              <div className={styles.treeLegend}>
                <span>
                  <span className={`${styles.statusDot} ${styles.dotAmber}`} />
                  editable
                </span>
                <span>
                  <span className={`${styles.statusDot} ${styles.dotCyan}`} />
                  auto-gen
                </span>
                <span>
                  <span className={`${styles.statusDot} ${styles.dotDim}`} />
                  internal
                </span>
              </div>
            </div>

            {/* Right Editor Pane */}
            <div className={styles.editorPane}>
              {/* Tab Bar */}
              <div ref={tabBarRef} className={styles.tabBar} role="group" aria-label="Generated code files">
                {(Object.keys(CODE_FILES) as TabKey[]).map((key) => (
                  <button
                    type="button"
                    key={key}
                    aria-pressed={activeTab === key}
                    aria-controls="generated-code-preview"
                    className={`${styles.editorTab} ${
                      activeTab === key ? styles.editorTabActive : ""
                    }`}
                    onClick={() => setActiveTab(key)}
                  >
                    {CODE_FILES[key].tab.split("/").pop()}
                  </button>
                ))}
              </div>

              {/* Breadcrumb */}
              <div className={styles.editorBreadcrumb}>
                {current.filename.split("/").map((segment, index, segments) => (
                  <React.Fragment key={index}>
                    {segment}{index < segments.length - 1 && <>/<wbr /></>}
                  </React.Fragment>
                ))}
              </div>

              <div id="generated-code-preview" className={styles.codePreview}>
                <CodeBlock
                  language="typescript"
                  code={current.code}
                  showLineNumbers={true}
                  copyable={false}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Generation Flow Strip */}
        <div className={styles.flowStrip}>
          {FLOW_STEPS.map((step, i) => (
            <React.Fragment key={step.step}>
              <div className={styles.flowCard}>
                <span className={styles.flowStep}>{step.step}</span>
                <span className={styles.flowTitle}>{step.title}</span>
                <span className={styles.flowDesc}>{step.desc}</span>
              </div>
              {i < FLOW_STEPS.length - 1 && (
                <span className={styles.flowArrow}>→</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </Container>
    </section>
  );
};
