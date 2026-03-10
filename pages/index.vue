<script setup lang="ts">
useHead({
  title: "Shion's Website",
  meta: [
    {
      name: "description",
      content: "Hi👋 I'm Shion Ichikawa!!",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
  ],
});

const socialLinks = [
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/shion1305",
    icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
  },
  {
    name: "GitHub",
    url: "https://github.com/shion1305",
    icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z",
  },
  {
    name: "X",
    url: "https://x.com/shion1305",
    icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    name: "Wantedly",
    url: "https://wantedly.com/id/shion1305",
    icon: "M18.453 14.555c-.171-.111-.658-.764-2.006-3.982a9.192 9.192 0 0 0-.237-.526l-.274-.664-2.362-5.702H8.85l2.362 5.702 2.362 5.706 2.181 5.267a.196.196 0 0 0 .362 0l2.373-5.682a.1.1 0 0 0-.037-.119zm-8.85 0c-.171-.111-.658-.764-2.006-3.982a8.971 8.971 0 0 0-.236-.525l-.276-.665-2.36-5.702H0l2.362 5.702 2.362 5.706 2.181 5.267a.196.196 0 0 0 .362 0l2.374-5.682a.098.098 0 0 0-.038-.119ZM24 6.375a2.851 2.851 0 0 1-2.851 2.852 2.851 2.851 0 0 1-2.852-2.852 2.851 2.851 0 0 1 2.852-2.851A2.851 2.851 0 0 1 24 6.375Z",
  },
];
</script>

<template>
  <main class="w-full max-w-2xl animate-fade-in-up">
    <!-- Glassmorphic Card -->
    <div
      class="relative overflow-hidden rounded-3xl bg-white/5 p-8 sm:p-12 shadow-2xl backdrop-blur-xl border border-white/10 group"
    >
      <!-- Decorative gradient blobs -->
      <div
        class="absolute -top-32 -right-32 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-700 pointer-events-none"
      ></div>
      <div
        class="absolute -bottom-32 -left-32 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-700 pointer-events-none"
      ></div>

      <div class="relative z-10 space-y-8">
        <!-- Header -->
        <header class="space-y-2">
          <h1 class="text-4xl sm:text-5xl font-playwrite tracking-tight">Hello👋</h1>
          <h2 class="text-3xl sm:text-4xl font-playwrite mt-4 mb-2 leading-snug">
            My name is
            <span
              class="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 whitespace-nowrap"
              >Shion!!</span
            >
          </h2>
        </header>

        <!-- Bio -->
        <p class="text-lg sm:text-xl text-slate-300 font-titillium leading-relaxed">
          I'm a second-year master's student at the Yokohama National University. I also work as a
          software engineer intern in Tokyo. My primary interests are in software engineering,
          DevOps, and security.
        </p>

        <!-- Social Links -->
        <div class="pt-6">
          <h3
            class="text-sm font-semibold tracking-wider text-slate-400 uppercase mb-4 font-titillium"
          >
            Connect with me
          </h3>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <template v-for="link in socialLinks" :key="link.name">
              <a
                :href="link.url"
                target="_blank"
                :aria-label="link.name"
                class="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 transition-all duration-300 group/link"
              >
                <svg
                  class="w-7 h-7 fill-slate-400 group-hover/link:fill-emerald-400 transition-colors duration-300"
                  viewBox="0 0 24 24"
                >
                  <path :d="link.icon" />
                </svg>
                <span
                  class="mt-3 text-sm font-medium text-slate-300 group-hover/link:text-emerald-400 transition-colors duration-300 font-titillium"
                  >{{ link.name }}</span
                >
              </a>
            </template>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.font-playwrite {
  font-family: "Playwrite GB J", cursive;
  font-optical-sizing: auto;
  font-style: normal;
}

.font-titillium {
  font-family: "Titillium Web", sans-serif;
  font-style: normal;
}

/* Custom animation for subtle entrance */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>
