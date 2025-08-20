// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  modules: ["@nuxt/eslint"],
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  devtools: { enabled: true },
  compatibilityDate: "2025-07-15",

  imports: {
    dirs: ["composables/ui", "shared/weather"],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
