<script setup lang="ts">
// Start with the server-rendered HTML, including on a cold visit.
onPrehydrate(() => {
  const stage = document.querySelector<HTMLElement>(".greeting-intro");
  const header = document.querySelector<HTMLElement>(".profile-greeting");
  const card = stage?.querySelector<HTMLElement>(".intro-card");
  const openingHello = card?.querySelector<HTMLElement>(".intro-hello");
  const openingName = card?.querySelector<HTMLElement>(".intro-name");
  const hello = header?.querySelector<HTMLElement>(".hello-word");
  const name = header?.querySelector<HTMLElement>(".first-name");
  if (!stage || !header || !card || !openingHello || !openingName || !hello || !name) return;

  const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
  const centerY = (box: DOMRect) => box.top + box.height / 2;
  const fontSize = (element: HTMLElement) => parseFloat(getComputedStyle(element).fontSize);
  const align = () => {
    // Measure the centered layout and the resting header, independently of the moving layer.
    const frame = card.getBoundingClientRect();
    const fromHello = openingHello.getBoundingClientRect();
    const fromName = openingName.getBoundingClientRect();
    const to = header.getBoundingClientRect();
    const dx = fromHello.left - to.left - hello.offsetLeft;
    const dy = centerY(fromHello) - to.top - hello.offsetTop - hello.offsetHeight / 2;
    const style = header.style;
    style.setProperty("--start-x", `${dx}px`);
    style.setProperty("--start-y", `${dy}px`);
    style.setProperty("--hello-scale", String(fontSize(openingHello) / fontSize(hello)));
    style.setProperty("--name-scale", String(fontSize(openingName) / fontSize(name)));
    style.setProperty("--name-x", `${fromName.left - to.left - dx - name.offsetLeft}px`);
    style.setProperty(
      "--name-y",
      `${centerY(fromName) - to.top - dy - name.offsetTop - name.offsetHeight / 2}px`,
    );
    style.setProperty("--frame-left", `${frame.left - to.left - dx}px`);
    style.setProperty("--frame-top", `${frame.top - to.top - dy}px`);
    style.setProperty("--frame-width", `${frame.width}px`);
    style.setProperty("--frame-height", `${frame.height}px`);
  };
  const play = () => {
    const listeners = new AbortController();
    const options = { passive: true, signal: listeners.signal };
    const observer = new ResizeObserver(align);
    const finish = () => {
      delete stage.dataset.playing;
      observer.disconnect();
      listeners.abort();
    };
    const start = () => {
      stage.dataset.playing = "";
      if (motion.matches) {
        align();
        for (const element of [card, openingName, header, hello]) observer.observe(element);
        // The browser can restore a scroll position or follow a fragment after the intro starts.
        window.addEventListener("scroll", align, options);
        window.addEventListener("resize", align, options);
        document.fonts.addEventListener("loadingdone", align, options);
      }
      stage.addEventListener(
        "animationend",
        (event) => {
          if (event.target === stage) finish();
        },
        options,
      );
    };

    for (const event of ["pointerdown", "keydown", "wheel", "hashchange", "pagehide"]) {
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
  };

  // A cached history entry resumes this document without rerunning its initial HTML.
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) play();
  });
  play();
});
</script>

<template>
  <header class="profile-greeting">
    <div class="greeting-content space-y-2">
      <p class="greeting"><span class="hello-word">Hello👋</span></p>
      <h1 id="profile-name" class="profile-name">
        <span class="inline-block max-w-full"
          ><span class="first-name"
            ><span class="opening-prefix" aria-hidden="true">My name is&nbsp;</span
            ><span class="name-ink">Shion</span
            ><span class="opening-punctuation" aria-hidden="true">!!</span></span
          >
          {{ " " }}<span class="surname">Ichikawa</span></span
        >
        <span lang="ja" class="mt-2 block font-sans">市川 詩恩</span>
      </h1>
      <p class="profile-tagline text-lg text-slate-300">DevSecOps❤️ from 🇯🇵</p>
    </div>
  </header>
  <div class="greeting-intro" aria-hidden="true">
    <!-- Measure the opening layout here and show this card directly for reduced motion. -->
    <div class="intro-card">
      <p class="intro-hello">Hello👋</p>
      <p class="intro-line">My name is <span class="intro-name">Shion</span>!!</p>
    </div>
  </div>
</template>

<style scoped>
.profile-greeting,
.greeting-intro {
  --duration: 2500ms;
  --glide: cubic-bezier(0.45, 0, 0.16, 1);
}
.greeting-content {
  position: relative;
}
.hello-word,
.first-name,
.intro-name,
.surname {
  display: inline-block;
}
.first-name {
  position: relative;
}
.name-ink,
.surname {
  color: transparent;
  background: linear-gradient(100deg, #34d399, #2dd4bf);
  background-clip: text;
}
.surname {
  background-image: linear-gradient(100deg, #2dd4bf, #22d3ee);
}
.greeting-intro,
.opening-prefix,
.opening-punctuation {
  display: none;
}

.greeting-intro[data-playing] {
  position: fixed;
  inset: 0;
  z-index: 10;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #0d1424, #05070c 58%, #0b1220);
  animation: reveal-page var(--duration) ease-in-out both;
}
.intro-card {
  width: min(38rem, calc(100% - 2rem));
  padding: clamp(1.5rem, 5vw, 3rem);
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

@media (prefers-reduced-motion: reduce) {
  .greeting-intro[data-playing] {
    animation: reduced-intro 150ms ease-out 800ms both;
  }
  .intro-card {
    border: 1px solid rgb(255 255 255 / 12%);
    border-radius: 1.5rem;
    background: linear-gradient(112deg, #171d2a, #131519 70%, #101816);
    color: #f1f5f9;
  }
  .intro-name {
    color: #34d399;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .intro-card {
    visibility: hidden;
  }

  .profile-greeting:has(+ [data-playing]) {
    position: relative;
    z-index: 11;
    pointer-events: none;

    .greeting-content {
      isolation: isolate;
      animation: settle-card var(--duration) var(--glide) both;
    }
    .greeting-content::before {
      content: "";
      position: absolute;
      z-index: -1;
      border: 1px solid transparent;
      border-radius: 1.5rem;
      background:
        linear-gradient(112deg, #171d2a, #131519 70%, #101816) padding-box,
        linear-gradient(128deg, #47525e, #262932 52%, #23423e) border-box;
      box-shadow: 0 1.25rem 3.5rem rgb(0 0 0 / 26%);
      animation:
        shape-frame var(--duration) var(--glide) both,
        fade-frame var(--duration) ease-in-out both;
    }
    .hello-word,
    .first-name {
      transform-origin: left center;
    }
    .hello-word {
      animation: settle-hello var(--duration) var(--glide) both;
    }
    .first-name {
      animation: settle-name var(--duration) var(--glide) both;
    }
    .opening-prefix,
    .opening-punctuation {
      position: absolute;
      display: block;
      top: 0;
      white-space: pre;
      color: #f1f5f9;
      animation: dissolve var(--duration) ease-in-out both;
    }
    .opening-prefix {
      right: 100%;
    }
    .opening-punctuation {
      left: 100%;
      color: #22d3ee;
    }
    .surname {
      animation: reveal-surname var(--duration) ease-out both;
    }
    [lang="ja"] {
      animation: reveal-detail var(--duration) ease-out both;
    }
    .profile-tagline {
      animation: reveal-tagline var(--duration) ease-out both;
    }
  }
}

@keyframes settle-card {
  0%,
  33% {
    transform: translate(var(--start-x), var(--start-y));
  }
  90%,
  100% {
    transform: none;
  }
}
@keyframes shape-frame {
  0%,
  33% {
    left: var(--frame-left);
    top: var(--frame-top);
    width: var(--frame-width);
    height: var(--frame-height);
  }
  90%,
  100% {
    left: -1rem;
    top: -1rem;
    width: calc(100% + 2rem);
    height: calc(100% + 2rem);
  }
}
@keyframes fade-frame {
  0%,
  57% {
    opacity: 1;
  }
  96%,
  100% {
    opacity: 0;
  }
}
@keyframes settle-hello {
  0%,
  36% {
    transform: scale(var(--hello-scale));
    color: #f1f5f9;
  }
  87%,
  100% {
    transform: none;
    color: #d8e3ef;
  }
}
@keyframes settle-name {
  0%,
  41% {
    transform: translate(var(--name-x), var(--name-y)) scale(var(--name-scale));
  }
  86%,
  100% {
    transform: none;
  }
}
@keyframes dissolve {
  0%,
  35% {
    opacity: 1;
  }
  60%,
  100% {
    opacity: 0;
  }
}
@keyframes reveal-surname {
  0%,
  73% {
    opacity: 0;
    clip-path: inset(-20% 100% -20% -0.15em);
  }
  92%,
  100% {
    opacity: 1;
    clip-path: inset(-20% -0.15em);
  }
}
@keyframes reveal-detail {
  0%,
  73% {
    opacity: 0;
    transform: translateY(0.35rem);
  }
  94%,
  100% {
    opacity: 1;
    transform: none;
  }
}
@keyframes reveal-tagline {
  0%,
  79% {
    opacity: 0;
    transform: translateY(0.3rem);
  }
  98%,
  100% {
    opacity: 1;
    transform: none;
  }
}
@keyframes reduced-intro {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
@keyframes reveal-page {
  0%,
  37% {
    opacity: 1;
  }
  90%,
  100% {
    opacity: 0;
  }
}
</style>
