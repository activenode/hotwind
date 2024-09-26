import build from "@hono/vite-build/cloudflare-pages";
import devServer from "@hono/vite-dev-server";
import adapter from "@hono/vite-dev-server/cloudflare";
import { defineConfig } from "vite";
import honoTailwind from "./vite-plugin-hono-tailwind";

export default defineConfig({
  plugins: [
    build(),
    devServer({
      adapter,
      entry: "src/index.tsx",
    }),
    honoTailwind(),
  ],
});
