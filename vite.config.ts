import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(
    Boolean
  ),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          "react-vendor": ["react", "react-dom"],
          router: ["react-router-dom"],
          "ui-radix": [
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-toast",
            "@radix-ui/react-tooltip",
            "@radix-ui/react-popover",
            "@radix-ui/react-accordion",
            "@radix-ui/react-tabs",
            "@radix-ui/react-select",
            "@radix-ui/react-navigation-menu",
          ],
          "ui-radix-forms": [
            "@radix-ui/react-checkbox",
            "@radix-ui/react-radio-group",
            "@radix-ui/react-switch",
            "@radix-ui/react-slider",
            "@radix-ui/react-label",
          ],
          forms: ["react-hook-form", "@hookform/resolvers", "zod"],
          icons: ["lucide-react", "react-icons"],
          utils: ["clsx", "tailwind-merge", "class-variance-authority"],
          charts: ["recharts"],
          carousel: ["embla-carousel-react"],
          dates: ["date-fns", "react-day-picker"],
        },
      },
    },
    // Increase chunk size warning limit to 1000kB to reduce noise
    chunkSizeWarningLimit: 1000,
  },
}));
