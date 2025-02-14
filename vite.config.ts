import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
	// This proxy has been created to resolve the CORS issue.
	plugins: [react(), tailwindcss()],
	server: {
		port: 3000,
		proxy: {
			"/api/": {
				target: "https://api.bitpin.org/",
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ""),
			},
		},
	},
});
