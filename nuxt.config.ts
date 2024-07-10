// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: {enabled: true},
    modules: ["@nuxtjs/google-fonts"],
    googleFonts: {
        families: {
            "Playwrite+GB+J": [100, 400],
            "Titillium+Web": true,
        }
    }
})
