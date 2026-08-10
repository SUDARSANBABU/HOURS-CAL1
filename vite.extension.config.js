import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],

    build: {
        outDir: "dist",

        emptyOutDir: false,

        lib: {
            entry: "src/extension.jsx",
            name: "HoursCalculator",
            formats: ["iife"],
            fileName: () => "hours-calculator.js",
        },

        cssCodeSplit: false,

        rollupOptions: {
            output: {
                inlineDynamicImports: true,
            },
        },
    },
});