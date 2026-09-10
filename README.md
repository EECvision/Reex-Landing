This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Responsive checks

The mobile layout plan is in [MOBILE_RESPONSIVENESS_PLAN.md](./MOBILE_RESPONSIVENESS_PLAN.md).

Install the test browsers once, then run the browser checks:

```bash
npx playwright install
npm run test:responsive
```

The suite covers widths from 320px to 1440px and breakpoint boundaries, navigation and landscape menus, generated files, schema diffs, local code scrolling, enlarged text, FAQ and feature filters, clipboard actions, and phone touch input. It runs Chromium, WebKit, and Firefox. Clipboard checks run in Chromium; phone touch emulation runs in Chromium and WebKit.

Playwright starts a local server on port 3100 or reuses one already running there. Set `PLAYWRIGHT_PRODUCTION=1` after `npm run build` to start a production server for the checks; stop any development server on port 3100 first. If using an installed Chrome instead of Playwright's Chromium, set `PLAYWRIGHT_CHANNEL=chrome`.

On PowerShell, set these options with `$env:PLAYWRIGHT_PRODUCTION = '1'` or `$env:PLAYWRIGHT_CHANNEL = 'chrome'` before the test command. Screenshots and traces from failures are stored in the ignored `test-results/` directory. Real iOS and Android devices still need a final manual check.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
