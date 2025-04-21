import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    
    host: "::",
    port: 8080,
    proxy: {
      // any request from the UI to /benchmark → http://localhost:3001/benchmark
      '/benchmark': 'http://localhost:3001',
      '/results':  'http://localhost:3001',
    },
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
