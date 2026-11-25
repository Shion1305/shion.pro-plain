export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxtjs/google-fonts", "@nuxtjs/tailwindcss", "@nuxt/eslint"],
  googleFonts: {
    families: {
      "DM Sans": [400, 500, 600, 700],
      "Instrument Serif": { wght: [400], ital: [400] },
    },
    display: "swap",
  },
});
