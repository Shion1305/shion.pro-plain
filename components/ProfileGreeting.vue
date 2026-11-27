<script setup lang="ts">
// Run with the initial HTML so a cold bundle or font cache cannot delay the greeting.
onPrehydrate(() => {
  const stage = document.querySelector<HTMLElement>(".greeting-intro");
  const source = stage?.querySelector<HTMLElement>(".intro-name-slot");
  const target = document.querySelector<HTMLElement>("#profile-name .first-name");
  if (!stage || !source || !target) return;

  const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
  const navigation = performance.getEntriesByType("navigation")[0] as
    PerformanceNavigationTiming | undefined;
  if (!motion.matches || navigation?.type === "back_forward") return;

  const listeners = new AbortController();
  const options = { passive: true, signal: listeners.signal };
  // The slot stays in place while its text travels, even when a font swap changes its width.
  const alignName = () => {
    const from = source.getBoundingClientRect();
    const to = target.getBoundingClientRect();
    if (!from.width || !to.width) return;
    source.style.setProperty("--travel-x", `${to.left - from.left}px`);
    source.style.setProperty(
      "--travel-y",
      `${to.top + to.height / 2 - from.top - from.height / 2}px`,
    );
    source.style.setProperty("--name-scale", String(to.width / from.width));
  };
  const observer = new ResizeObserver(alignName);

  const finish = () => {
    delete stage.dataset.playing;
    observer.disconnect();
    listeners.abort();
  };

  const start = () => {
    if (!motion.matches || location.hash || window.scrollY > 1) {
      finish();
      return;
    }
    stage.dataset.playing = "";
    alignName();
    observer.observe(source);
    observer.observe(target);
    window.addEventListener("resize", alignName, options);
    stage.addEventListener(
      "animationend",
      (event) => {
        if (event.target === stage && !event.pseudoElement) finish();
      },
      options,
    );
  };

  for (const event of ["pointerdown", "keydown", "wheel", "scroll", "hashchange", "pagehide"]) {
    window.addEventListener(event, finish, options);
  }
  motion.addEventListener("change", finish, options);
  document.addEventListener(
    "visibilitychange",
    () => {
      if (!document.hidden) start();
      else if (stage.hasAttribute("data-playing")) finish();
    },
    options,
  );
  if (!document.hidden) start();
});
</script>

<template>
  <header class="space-y-2">
    <p class="greeting">Hello👋</p>
    <h1 id="profile-name" class="profile-name">
      <span
        class="inline-block max-w-full bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400"
        ><span class="first-name inline-block">Shion</span> Ichikawa</span
      >
      <span lang="ja" class="mt-2 block font-sans">市川 詩恩</span>
    </h1>
    <p class="text-lg text-slate-300">DevSecOps❤️ from 🇯🇵</p>
  </header>
  <div class="greeting-intro" aria-hidden="true">
    <div class="intro-card">
      <p class="intro-hello">Hello👋</p>
      <p class="intro-line">
        <span class="intro-prefix">My name is </span
        ><span class="intro-signature"
          ><span class="intro-name-slot"><span class="intro-name">Shion</span></span
          ><span class="intro-punctuation">!!</span></span
        >
      </p>
    </div>
  </div>
</template>

<style scoped>
.greeting-intro {
  display: none;
}

@media (prefers-reduced-motion: no-preference) {
  header:has(+ [data-playing]),
  .greeting-intro {
    --duration: 2200ms;
  }

  header:has(+ [data-playing]) {
    animation: reveal-heading var(--duration) ease-out both;
  }

  .greeting-intro[data-playing] {
    position: fixed;
    z-index: 10;
    inset: 0;
    display: grid;
    place-items: center;
    animation: finish-intro var(--duration) step-end forwards;
  }

  .greeting-intro::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #0d1424, #05070c 58%, #0b1220);
    animation: reveal-page var(--duration) ease-in-out both;
  }

  .intro-card {
    position: relative;
    isolation: isolate;
    width: min(38rem, calc(100% - 2rem));
    padding: clamp(1.5rem, 5vw, 3rem);
    color: #f1f5f9;
  }

  .intro-card::before {
    content: "";
    position: absolute;
    z-index: -1;
    inset: 0;
    border: 1px solid rgb(255 255 255 / 11%);
    border-radius: 1.5rem;
    background: linear-gradient(115deg, #151a26, #121317 75%, #101415);
    box-shadow: 0 1.5rem 3rem rgb(0 0 0 / 22%);
  }

  .intro-hello,
  .intro-line {
    font-family: "Playwrite GB J", cursive;
    line-height: 1.5;
  }

  .intro-hello {
    font-size: clamp(2.25rem, 6.8vw, 3rem);
    letter-spacing: -0.025em;
  }

  .intro-line {
    margin-block-start: 0.2rem;
    font-size: clamp(1.35rem, 5.4vw, 2.25rem);
  }

  .intro-signature {
    white-space: nowrap;
  }

  .intro-name-slot,
  .intro-name {
    display: inline-block;
  }

  .intro-name {
    color: transparent;
    background: linear-gradient(90deg, #34d399, #22d3ee);
    background-clip: text;
    transform-origin: left center;
    animation: settle var(--duration) cubic-bezier(0.35, 0, 0.18, 1) both;
  }

  .intro-punctuation {
    color: #22d3ee;
  }

  .intro-card::before,
  .intro-hello,
  .intro-prefix,
  .intro-punctuation {
    animation: dissolve var(--duration) ease-in-out both;
  }
}

@keyframes settle {
  0%,
  50% {
    transform: none;
    opacity: 1;
  }
  93%,
  100% {
    transform: translate(var(--travel-x), var(--travel-y)) scale(var(--name-scale));
  }
  93% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes dissolve {
  0%,
  50% {
    opacity: 1;
  }
  75%,
  100% {
    opacity: 0;
  }
}
@keyframes reveal-page {
  0%,
  57% {
    opacity: 1;
  }
  94%,
  100% {
    opacity: 0;
  }
}
@keyframes reveal-heading {
  0%,
  89% {
    opacity: 0;
  }
  99%,
  100% {
    opacity: 1;
  }
}
@keyframes finish-intro {
  to {
    visibility: hidden;
  }
}
</style>
