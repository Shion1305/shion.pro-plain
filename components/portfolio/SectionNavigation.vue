<script setup lang="ts">
const navigation = ref<HTMLElement | null>(null);
const active = ref("profile");
let animationFrame = 0;
let observer: ResizeObserver | undefined;

function syncSection() {
  animationFrame = 0;
  if (!navigation.value) return;
  const compact = window.matchMedia("(max-width: 767px)").matches;
  const last = compact ? "achievements" : "results";
  const sections = ["profile", "overview", last];
  const readingLine = navigation.value.offsetHeight + 2;
  const atPageEnd =
    window.scrollY > 0 &&
    window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
  let current = "profile";
  for (const id of sections) {
    const bounds = document.getElementById(id)?.getBoundingClientRect();
    if (!bounds || bounds.bottom <= readingLine) continue;
    if (bounds.top <= readingLine || (id === last && atPageEnd && bounds.top < window.innerHeight))
      current = id;
  }
  active.value = current;
}

function scheduleSync() {
  if (!animationFrame) animationFrame = requestAnimationFrame(syncSection);
}

onMounted(() => {
  syncSection();
  window.addEventListener("scroll", scheduleSync, { passive: true });
  window.addEventListener("resize", scheduleSync);
  observer = new ResizeObserver(scheduleSync);
  observer.observe(document.body);
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", scheduleSync);
  window.removeEventListener("resize", scheduleSync);
  cancelAnimationFrame(animationFrame);
  observer?.disconnect();
});
</script>

<template>
  <nav ref="navigation" class="section-navigation" aria-label="Page sections">
    <a href="#profile" :aria-current="active === 'profile' ? 'location' : undefined">Profile</a>
    <a href="#overview" :aria-current="active === 'overview' ? 'location' : undefined">
      <span class="hidden md:inline">Overview</span><span class="md:hidden">Experience</span>
    </a>
    <a
      class="hidden md:flex"
      href="#results"
      :aria-current="active === 'results' ? 'location' : undefined"
      >Results</a
    >
    <a
      class="flex md:hidden"
      href="#achievements"
      :aria-current="active === 'achievements' ? 'location' : undefined"
      >Achievements</a
    >
  </nav>
</template>
