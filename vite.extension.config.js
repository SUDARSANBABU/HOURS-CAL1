import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    build: {
        lib: {
            entry: "src/extension.jsx",
            name: "HoursCalculatorExtension",
            formats: ["iife"],
            fileName: () => "hours-calculator.js",
        },
        cssCodeSplit: false,
        emptyOutDir: false,
        rollupOptions: {
            output: {
                inlineDynamicImports: true,
            },
        },
    },
});
