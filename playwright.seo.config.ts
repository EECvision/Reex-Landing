import { defineConfig } from "@playwright/test";
import config from "./playwright.config";

export default defineConfig({
  ...config,
  testMatch: "seo.spec.ts",
  projects: config.projects?.filter((project) => project.name === "chromium"),
  use: {
    ...config.use,
    baseURL: process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:3211",
    channel: process.env.PLAYWRIGHT_CHANNEL || "chrome",
  },
  webServer: process.env.PLAYWRIGHT_BASE_URL ? undefined : {
    command: "node node_modules/next/dist/bin/next start --hostname 127.0.0.1 --port 3211",
    url: "http://127.0.0.1:3211",
    reuseExistingServer: false,
    timeout: 120000,
  },
});
