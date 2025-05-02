import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

const isLibMode = process.env.BUILD === "true";

export default defineConfig({
  plugins: [react(), svgr()],
  root: isLibMode ? undefined : "playground", // serve playground in dev
  build: isLibMode
    ? {
        lib: {
          entry: path.resolve(__dirname, "src/index.ts"),
          name: "ChatComponent",
          fileName: (format) => `chat-component.${format}.js`,
          formats: ["es", "umd"],
        },
        rollupOptions: {
          external: ["react", "react-dom", "react/jsx-runtime"],
          output: {
            globals: {
              react: "React",
              "react-dom": "ReactDOM",
            },
          },
        },
      }
    : undefined,
});
