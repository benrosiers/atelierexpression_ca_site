import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

const root = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  base: "/",
  build: {
    emptyOutDir: false,
    rollupOptions: {
      input: {
        main: `${root}index.html`,
        demo: `${root}demo/index.html`
      }
    }
  }
});
