import path from "node:path";
import { fileURLToPath } from "node:url";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Get the site URL from environment variables, or use the default value if not set
const siteUrl =
	import.meta.env.PUBLIC_SITE_URL || "https://aaaiportal.vercel.app/";

// https://astro.build/config
export default defineConfig({
	site: siteUrl,
	base: "/",
	envPrefix: "PUBLIC_",
	adapter: vercel(),
	vite: {
		plugins: [tailwindcss()],
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src"),
			},
		},
	},

	server: {
		port: 5200,
	},

	integrations: [mdx(), sitemap()],
});
