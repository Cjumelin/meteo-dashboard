// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  imports: {
    dirs: [
      "shared",
      "shared/weather",
      "shared/utils/temperature",
      "shared/utils/percentage",
    ],
  },

  vite: {
    plugins: [tailwindcss()],
  },
  modules: ["@nuxt/eslint"],
});
