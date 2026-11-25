<script setup lang="ts">
import { currentRole, internships } from "./experience";
import RoleTimeline from "./RoleTimeline.vue";

const initial = [currentRole, ...internships.slice(0, 4)];
const next = internships.slice(4, 7);
const remaining = internships.slice(7);
const total = internships.length + 1;
const batch = ref<HTMLDetailsElement | null>(null);
const batchOpen = ref(false);
const archiveOpen = ref(false);
const visible = computed(
  () =>
    initial.length +
    (batchOpen.value ? next.length + (archiveOpen.value ? remaining.length : 0) : 0),
);
let previousY = 0;
let readingScroll = false;
let listeners: AbortController | undefined;

function stopWatching() {
  listeners?.abort();
}

function markReading() {
  readingScroll = true;
}

function revealOnScroll() {
  const y = window.scrollY;
  const down = y > previousY;
  previousY = y;
  if (
    !readingScroll ||
    !down ||
    !batch.value ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
    return;
  const top = batch.value.getBoundingClientRect().top;
  // Reveal once, while the reader is approaching the next batch from above.
  if (top < 80 || top > window.innerHeight - 72) return;
  stopWatching();
  batch.value.open = true;
}

function onBatchToggle(event: Event) {
  batchOpen.value = (event.currentTarget as HTMLDetailsElement).open;
  stopWatching();
}
onMounted(() => {
  // Follow reading gestures. Section links and restored scroll positions should land undisturbed.
  previousY = window.scrollY;
  listeners = new AbortController();
  const options = { passive: true, signal: listeners.signal };
  window.addEventListener("wheel", markReading, options);
  window.addEventListener("touchmove", markReading, options);
  window.addEventListener(
    "pointerdown",
    (event) => {
      readingScroll = event.clientX >= document.documentElement.clientWidth;
    },
    options,
  );
  window.addEventListener(
    "keydown",
    (event) => {
      readingScroll = ["ArrowDown", "PageDown", "End", " "].includes(event.key);
    },
    options,
  );
  window.addEventListener("scroll", revealOnScroll, options);
});
onBeforeUnmount(stopWatching);
</script>

<template>
  <div class="experience-heading">
    <h2 id="experience-heading">Experience</h2>
    <span class="role-count" role="status">{{ visible }} of {{ total }} roles</span>
  </div>
  <RoleTimeline :roles="initial" />
  <details v-if="next.length" ref="batch" class="role-batch" @toggle="onBatchToggle">
    <summary>
      <span class="closed-label">Show {{ next.length }} more internships</span>
      <span class="open-label">Back to the latest {{ initial.length }} roles</span>
    </summary>
    <RoleTimeline :roles="next" />
    <details
      v-if="remaining.length"
      @toggle="archiveOpen = ($event.currentTarget as HTMLDetailsElement).open"
    >
      <summary>
        <span class="closed-label">Show {{ remaining.length }} earlier internships</span
        ><span class="open-label">Hide earlier internships</span>
      </summary>
      <RoleTimeline :roles="remaining" />
    </details>
  </details>
</template>
