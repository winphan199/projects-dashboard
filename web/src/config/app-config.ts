import packageJson from "../../package.json";

const currentYear = new Date().getFullYear();

export const APP_CONFIG = {
  name: "Projects Dashboard",
  version: packageJson.version,
  copyright: `© ${currentYear}, Projects Dashboard.`,
  meta: {
    title: "Projects Dashboard - Modern Next.js Dashboard Starter Template",
    description:
      "Projects Dashboard is a modern, open-source dashboard starter template built with Next.js 15, Tailwind CSS v4, and shadcn/ui. Perfect for SaaS apps, admin panels, and internal tools—fully customizable and production-ready.",
  },
};
