<script setup lang="ts">
defineProps<{ showLabel: string; hideLabel: string }>();

const details = ref<HTMLDetailsElement | null>(null);
const summary = ref<HTMLElement | null>(null);
const content = ref<HTMLElement | null>(null);
const contentId = useId();
const enhanced = ref(false);
onMounted(() => {
  enhanced.value = true;
});

function focusInView(target: HTMLElement | null) {
  if (!target) return;
  target.focus({ preventScroll: true });
  const top = target.getBoundingClientRect().top;
  if (top < parseFloat(getComputedStyle(target).scrollMarginTop) || top >= window.innerHeight) {
    target.scrollIntoView({ block: "start" });
  }
}

function openFromSummary() {
  // Let the native summary open the list before moving focus to the new entries.
  requestAnimationFrame(() => {
    if (details.value?.open) focusInView(content.value);
  });
}

function collapse() {
  if (!details.value) return;
  details.value.open = false;
  focusInView(summary.value);
}
</script>

<template>
  <details ref="details" class="inline-disclosure" :class="{ enhanced }">
    <summary ref="summary" @click="openFromSummary">
      <span class="closed-label">{{ showLabel }}</span>
      <span class="open-label">{{ hideLabel }}</span>
    </summary>
    <div :id="contentId" ref="content" tabindex="-1" class="additional-entries"><slot /></div>
    <button
      v-if="enhanced"
      type="button"
      class="collapse-entries"
      aria-expanded="true"
      :aria-controls="contentId"
      @click="collapse"
    >
      {{ hideLabel }}
    </button>
  </details>
</template>
