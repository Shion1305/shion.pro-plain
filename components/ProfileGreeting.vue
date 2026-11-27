<script setup lang="ts">
const firstName = ref<HTMLElement | null>(null);
const visible = ref(true);
const stage = ref<HTMLElement | null>(null);
const disc = ref<HTMLElement | null>(null);
const name = ref<HTMLElement | null>(null);
let listeners: AbortController | undefined;

function finish() {
  visible.value = false;
  listeners?.abort();
}

onMounted(async () => {
  const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
  const navigation = performance.getEntriesByType("navigation")[0] as
    PerformanceNavigationTiming | undefined;
  if (
    !motion.matches ||
    location.hash ||
    window.scrollY > 1 ||
    navigation?.type === "back_forward" ||
    document.hidden
  ) {
    finish();
    return;
  }

  listeners = new AbortController();
  const options = { signal: listeners.signal, passive: true };
  for (const event of [
    "pointerdown",
    "keydown",
    "scroll",
    "wheel",
    "resize",
    "hashchange",
    "pagehide",
  ]) {
    window.addEventListener(event, finish, options);
  }
  motion.addEventListener("change", finish, options);
  document.addEventListener("visibilitychange", finish, options);

  await document.fonts.ready;
  if (
    !visible.value ||
    !stage.value ||
    !disc.value ||
    !name.value ||
    !firstName.value ||
    getComputedStyle(stage.value).visibility === "hidden"
  ) {
    finish();
    return;
  }

  // Move the greeting around the center of the word so the two first names coincide.
  const from = name.value.getBoundingClientRect();
  const to = firstName.value.getBoundingClientRect();
  if (!from.width || !to.width) {
    finish();
    return;
  }
  const box = disc.value.getBoundingClientRect();
  const x = from.left + from.width / 2;
  const y = from.top + from.height / 2;
  disc.value.style.transformOrigin = `${x - box.left}px ${y - box.top}px`;
  disc.value.style.setProperty("--travel-x", `${to.left + to.width / 2 - x}px`);
  disc.value.style.setProperty("--travel-y", `${to.top + to.height / 2 - y}px`);
  disc.value.style.setProperty("--name-scale", String(to.width / from.width));
  stage.value.classList.add("is-playing");
});
onBeforeUnmount(finish);
</script>

<template>
  <header class="space-y-2">
    <p class="greeting">Hello👋</p>
    <h1 id="profile-name" class="profile-name">
      <span
        class="inline-block max-w-full bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400"
        ><span ref="firstName" class="first-name inline-block">Shion</span> Ichikawa</span
      >
      <span lang="ja" class="mt-2 block font-sans">市川 詩恩</span>
    </h1>
    <p class="text-lg text-slate-300">DevSecOps❤️ from 🇯🇵</p>
  </header>
  <div
    v-if="visible"
    ref="stage"
    class="greeting-intro"
    aria-hidden="true"
    @animationend.self="finish"
  >
    <div ref="disc" class="intro-disc" @animationend.self="finish">
      <span class="intro-hello">Hello, I’m</span>
      <span ref="name" class="intro-name">Shion</span>
    </div>
  </div>
</template>

<style scoped>
.greeting-intro {
  display: none;
}

@media (scripting: enabled) and (prefers-reduced-motion: no-preference) {
  header:has(+ .greeting-intro.is-playing),
  .greeting-intro {
    --duration: 1800ms;
  }

  header:has(+ .greeting-intro.is-playing) {
    animation: reveal-heading var(--duration) ease-out both;
  }

  :root:not(:has(:target)) .greeting-intro {
    position: fixed;
    inset: 0;
    z-index: 10;
    display: grid;
    place-items: center;
    /* Reveal the page even if hydration or font loading stalls. */
    animation: expire 0s 2.4s forwards;
  }

  :root:not(:has(:target)) .greeting-intro.is-playing {
    animation: none;
  }

  .greeting-intro::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 50% 45%, #10252b, #080e19 64%, #070c15);
  }

  .intro-disc {
    position: relative;
    isolation: isolate;
    display: grid;
    place-content: center;
    justify-items: center;
    width: min(21rem, 72vmin);
    aspect-ratio: 1;
    font-family: "Playwrite GB J", cursive;
    line-height: 1.42;
  }

  .intro-disc::before {
    content: "";
    position: absolute;
    z-index: -1;
    inset: 0;
    border: 1px solid rgb(94 234 212 / 50%);
    border-radius: 50%;
    background: radial-gradient(ellipse at 28% 18%, #193a3e, #0d1a26 70%);
    box-shadow:
      inset 0 1px 1px rgb(214 255 241 / 16%),
      0 1.5rem 5rem rgb(0 0 0 / 26%);
  }

  .intro-hello {
    color: #d8e3ef;
    font-size: clamp(1rem, 3.6vmin, 1.4rem);
  }

  .intro-name {
    margin-top: 0.3rem;
    font-size: clamp(2.6rem, 9.8vmin, 4.4rem);
    letter-spacing: -0.055em;
    background: linear-gradient(90deg, #34d399, #2dd4bf);
    background-clip: text;
    color: transparent;
  }

  .is-playing .intro-disc {
    animation: settle var(--duration) cubic-bezier(0.35, 0, 0.18, 1) both;
  }

  .is-playing::before {
    animation: reveal-page var(--duration) ease-in-out both;
  }

  .is-playing .intro-disc::before,
  .is-playing .intro-hello {
    animation: dissolve var(--duration) ease-in-out both;
  }

  .is-playing .intro-name {
    animation: handoff var(--duration) ease-out both;
  }
}

@keyframes settle {
  0%,
  44% {
    transform: none;
  }
  94%,
  100% {
    transform: translate(var(--travel-x), var(--travel-y)) scale(var(--name-scale));
  }
}
@keyframes dissolve {
  0%,
  44% {
    opacity: 1;
  }
  76%,
  100% {
    opacity: 0;
  }
}
@keyframes handoff {
  0%,
  92% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes reveal-page {
  0%,
  58% {
    opacity: 1;
  }
  94%,
  100% {
    opacity: 0;
  }
}
@keyframes reveal-heading {
  0%,
  88% {
    opacity: 0;
  }
  98%,
  100% {
    opacity: 1;
  }
}
@keyframes expire {
  to {
    visibility: hidden;
  }
}
</style>
