import { Plugin } from "vite";
import { readFileSync } from "fs";
import { resolve } from "path";
import postcss from "postcss";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default function honoTailwind(): Plugin {
  let css: string = "";
  const cssModules: Set<string> = new Set();

  return {
    name: "hono-tailwind",
    async buildStart() {
      // Initial CSS file
      const initialCssFile = resolve(__dirname, "src/styles.css");
      cssModules.add(initialCssFile);
    },
    async transform(code: string, id: string) {
      if (id.endsWith(".css")) {
        cssModules.add(id);
        return code;
      }
    },
    async load(id: string) {
      if (id.endsWith("src/renderer.tsx")) {
        let allCss = "";
        for (const cssFile of cssModules) {
          const rawCss = readFileSync(cssFile, "utf-8");
          allCss += rawCss + "\n";
        }

        // Process all collected CSS with PostCSS, Tailwind, and Autoprefixer
        const result = await postcss([tailwindcss, autoprefixer]).process(
          allCss,
          { from: undefined }
        );

        css = result.css;

        const content = readFileSync(id, "utf-8");
        // Inject the processed CSS into the head as a valid JSX element
        return content.replace(
          "<head>",
          `<head>
            <style dangerouslySetInnerHTML={{ __html: ${JSON.stringify(
              css
            )} }} />`
        );
      }
    },
  };
}
