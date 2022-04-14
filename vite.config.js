import { defineConfig } from "vite";
import vueJsx from "@vitejs/plugin-vue-jsx";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vueJsx(), vue()],
	resolve: {
		alias: {
			vue: "vue/dist/vue.esm-bundler.js",
			"~": path.resolve(__dirname, "./"),
			"@": path.resolve(__dirname, "src"),
		},
	},
});
