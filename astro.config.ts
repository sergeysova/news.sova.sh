import { defineConfig } from "astro/config";
import compress from "astro-compress";
import image from "@astrojs/image";
import mdx from "@astrojs/mdx";
import prefetch from "@astrojs/prefetch";
import react from "@astrojs/react";
import robotsTxt from "astro-robots-txt";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import rehypeExternalLinks from "rehype-external-links";

// https://astro.build/config
export default defineConfig({
  site:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://news.sova.dev",
  output: "static",
  base: "/",
  build: {
    format: "directory",
    assets: "assets",
  },
  markdown: {
    syntaxHighlight: "prism",
    remarkPlugins: [],
    rehypePlugins: [
      [
        rehypeExternalLinks,
        { rel: ["nofollow", "noopener", "noreferrer"], target: ["_blank"] },
      ],
    ],
  },
  integrations: [
    sitemap({
      changefreq: "weekly",
      priority: 0.7,
    }),
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
    robotsTxt(),
    tailwind({ config: { path: "./tailwind.config.cjs" } }),
    react(),
    mdx(),
    prefetch(),
    compress(),
  ],
});
