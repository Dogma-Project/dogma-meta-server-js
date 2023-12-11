import { defineConfig, searchForWorkspaceRoot } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __VITE_PORT__: `"${process.env.VITE_PORT}"`,
  },
  plugins: [react()],
  root: "./interface",
  build: {
    outDir: "../dist/public",
  },
  server: {
    fs: {
      allow: [searchForWorkspaceRoot(process.cwd())],
    },
  },
});
