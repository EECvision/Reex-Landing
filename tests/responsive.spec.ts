import { expect, test, type Page } from "@playwright/test";

async function expectContentToFit(page: Page) {
  const overflow = await page.evaluate(() => {
    const viewportWidth = document.documentElement.clientWidth;
    const problems: string[] = [];
    if (document.documentElement.scrollWidth > viewportWidth + 1) problems.push("document");
    const elements = document.querySelectorAll<HTMLElement>(
      "main section, main section > div, header, footer > div, main a, main button, main p, main h1, main h2, main h3",
    );
    for (const element of elements) {
      const bounds = element.getBoundingClientRect();
      if (!bounds.width || !bounds.height) continue;
      // Long code and file tabs belong to local scroll surfaces.
      let scrollsLocally = false;
      for (let parent = element.parentElement; parent && parent !== document.body; parent = parent.parentElement) {
        if (["auto", "scroll"].includes(getComputedStyle(parent).overflowX)) {
          scrollsLocally = true;
          break;
        }
      }
      if (scrollsLocally) continue;
      if (bounds.left < -1 || bounds.right > viewportWidth + 1 || element.scrollWidth > element.clientWidth + 1) {
        problems.push(`${element.tagName}: ${element.id || element.textContent?.trim().slice(0, 60)}`);
      }
    }
    return problems;
  });
  expect(overflow).toEqual([]);
}

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
});

test("content fits phones, tablets, desktops, and breakpoint boundaries", async ({ page }) => {
  for (const width of [320, 375, 390, 430, 639, 640, 641, 767, 768, 769, 859, 860, 861, 959, 960, 961, 1023, 1024, 1025, 1119, 1120, 1121, 1440]) {
    await test.step(`${width}px`, async () => {
      await page.setViewportSize({ width, height: 900 });
      await expectContentToFit(page);
    });
  }
});

test("mobile navigation supports keyboard, anchors, and desktop resize", async ({ page }) => {
  const toggle = page.getByRole("button", { name: /navigation menu/ });
  await toggle.focus();
  await page.keyboard.press("Enter");
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  for (const link of await page.getByRole("navigation", { name: "Mobile" }).getByRole("link").all()) {
    await page.keyboard.press("Tab");
    await expect(link).toBeFocused();
  }
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");

  for (const name of ["Features", "Code Engine", "Schema Diff", "How It Works", "Open Source", "FAQ"]) {
    await toggle.click();
    await page.getByRole("navigation", { name: "Mobile" }).getByRole("link", { name, exact: true }).click();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    const headingTop = await page.evaluate(() => document.querySelector(`${location.hash} h2`)!.getBoundingClientRect().top);
    expect(headingTop).toBeGreaterThanOrEqual(60);
  }
  await toggle.click();
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(page.getByRole("navigation", { name: "Primary" })).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
});

test("landscape menu keeps its final action reachable", async ({ page }) => {
  await page.getByRole("button", { name: "Open navigation menu" }).click();
  await page.setViewportSize({ width: 844, height: 390 });
  const menu = page.getByRole("navigation", { name: "Mobile" });
  const launch = menu.getByRole("link", { name: "Launch Studio Free" });
  await launch.scrollIntoViewIfNeeded();
  await expect(launch).toBeInViewport();
  expect((await menu.boundingBox())!.y + (await menu.boundingBox())!.height).toBeLessThanOrEqual(390);
  await expectContentToFit(page);
});

test("all generated samples remain accessible through tabs and explorer", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  const explorer = page.getByRole("button", { name: "Browse generated files" });
  await expect(explorer).toHaveAttribute("aria-expanded", "false");
  const tabs = page.getByRole("group", { name: "Generated code files" });
  for (const tab of await tabs.getByRole("button").all()) {
    await tab.click();
    await expect(tab).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator("#generated-code-preview")).not.toBeEmpty();
    await expectContentToFit(page);
  }
  await explorer.click();
  const treeFile = page.locator("#generated-file-explorer").getByRole("button", { name: /^definitions\// });
  await treeFile.focus();
  await page.keyboard.press("Enter");
  await expect(treeFile).toHaveAttribute("aria-pressed", "true");
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(treeFile).toHaveAttribute("aria-pressed", "true");
  await page.setViewportSize({ width: 320, height: 800 });
  await expect(tabs.getByRole("button", { name: "accountReports.ts", exact: true })).toHaveAttribute("aria-pressed", "true");
});

test("diff selection, disclosure, and apply work on a phone", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  const diff = page.locator("#diff-engine");
  const reports = diff.getByRole("button", { name: /^reports/ });
  await reports.focus();
  await page.keyboard.press("Enter");
  await expect(reports).toHaveAttribute("aria-expanded", "false");
  await page.keyboard.press("Enter");
  await diff.getByRole("checkbox", { name: "Select DELETE /api/v1/reports/legacy-pdf", exact: true }).check();
  await diff.getByRole("button", { name: "View diff for DELETE /api/v1/reports/legacy-pdf", exact: true }).click();
  const preview = page.getByRole("region", { name: "Diff for DELETE /api/v1/reports/legacy-pdf", exact: true });
  await expect(preview).toBeFocused();
  await expect(preview).toBeInViewport();
  await expectContentToFit(page);
  await diff.getByRole("button", { name: "Hide diff for DELETE /api/v1/reports/legacy-pdf", exact: true }).click();
  await expect(preview).toHaveCount(0);
  await diff.getByRole("button", { name: /Add 1.*Update 1.*Remove 1/ }).click();
  await expect(diff.getByRole("button", { name: /Applied to codebase/ })).toBeDisabled();
});

test("long examples scroll locally and text enlargement preserves content", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  const example = page.getByRole("region", { name: "Import your collection example" });
  const canScroll = await example.evaluate(element => {
    element.scrollLeft = element.scrollWidth;
    return element.scrollLeft > 0;
  });
  expect(canScroll).toBe(true);
  await expectContentToFit(page);
  await page.setViewportSize({ width: 640, height: 900 });
  await page.addStyleTag({ content: "html { font-size: 200%; }" });
  await expectContentToFit(page);
});

test("FAQ expansion and feature filters keep content readable", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  for (const question of await page.locator("#faq").getByRole("button").all()) {
    if (await question.getAttribute("aria-expanded") !== "true") await question.click();
    await expect(question).toHaveAttribute("aria-expanded", "true");
    await expectContentToFit(page);
  }
  const features = page.locator("#features");
  for (const category of await features.getByRole("tab").all()) {
    await category.click();
    await expect(category).toHaveAttribute("aria-selected", "true");
    await expect(features.getByRole("tabpanel")).not.toBeEmpty();
    await expectContentToFit(page);
  }
});

test("copy controls preserve the complete commands", async ({ page, browserName, context }) => {
  test.skip(browserName !== "chromium", "Clipboard permissions differ across browser engines.");
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.getByRole("button", { name: "Copy CLI install command", exact: true }).click();
  await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toBe("npm i -g reex-cli");
  await page.locator("#quickstart").getByRole("button", { name: "Copy", exact: true }).click();
  await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toBe("reex start");
  await page.locator("#open-source").getByRole("button", { name: "Copy install command", exact: true }).click();
  await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toBe("npm i -g reex-cli");
});

test("phone touch targets support menu and showcase navigation", async ({ browser, browserName }) => {
  test.skip(browserName === "firefox", "Firefox does not support Playwright mobile emulation.");
  const context = await browser.newContext({
    viewport: { width: 320, height: 800 },
    isMobile: true,
    hasTouch: true,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3100");
  const toggle = page.getByRole("button", { name: "Open navigation menu" });
  const bounds = await toggle.boundingBox();
  expect(bounds!.width).toBeGreaterThanOrEqual(44);
  expect(bounds!.height).toBeGreaterThanOrEqual(44);
  await toggle.tap();
  await page.getByRole("navigation", { name: "Mobile" }).getByRole("link", { name: "Code Engine" }).tap();
  await page.getByRole("group", { name: "Generated code files" }).getByRole("button", { name: "api.config.ts", exact: true }).tap();
  await page.getByRole("button", { name: "View diff for POST /api/v1/reports/export", exact: true }).tap();
  await expect(page.getByRole("region", { name: "Diff for POST /api/v1/reports/export", exact: true })).toBeInViewport();
  await expectContentToFit(page);
  await context.close();
});
