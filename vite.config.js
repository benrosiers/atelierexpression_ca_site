import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

const root = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  base: "/",
  server: {
    // allow LAN + tunnel hostnames (cloudflared trycloudflare.com etc.)
    // during local dev/preview; irrelevant to `vite build` output.
    allowedHosts: true
  },
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
