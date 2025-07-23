// @ts-check
import { defineConfig, envField } from "astro/config";
import vercel from "@astrojs/vercel";
import icon from "astro-icon";

import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  integrations: [icon()],
  output: "server",
  adapter: vercel(),
  // site: process.env.VERCEL_PROJECT_PRODUCTION_URL || "http://localhost:4321",
  env: {
    schema: {
      RESEND_API_KEY: envField.string({ context: "server", access: "secret" }),
      RESEND_AUDIENCE_ID: envField.string({
        context: "server",
        access: "secret",
      }),
      REQUIRE_CONFIRMATION: envField.boolean({
        context: "server",
        access: "public",
        default: true,
      }),
      EMAIL_FROM: envField.string({ context: "server", access: "public" }),
      EMAIL_REPLY_TO: envField.string({
        context: "server",
        access: "public",
        optional: true,
      }),
      PUBLIC_TWITTER_URL: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
      PUBLIC_GITHUB_URL: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
      PUBLIC_LINKEDIN_URL: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
