import { defineConfig } from "vite";

export default defineConfig({
  // Works on user.github.io/repo-name/ and on a custom domain.
  base: "./",
  build: {
    outDir: "dist",
    emptyOutDir: true
  }
});
