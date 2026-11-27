<script setup lang="ts">
import type { Achievement } from "./achievements";
defineProps<{ results: Achievement[] }>();
</script>

<template>
  <ul class="result-list">
    <li v-for="entry in results" :key="entry.event">
      <p class="entry-meta">{{ entry.date }} {{ entry.year }} · {{ entry.team }}</p>
      <h3>
        <a :href="entry.source">{{ entry.event }}</a>
      </h3>
      <p>{{ entry.result }}</p>
    </li>
  </ul>
</template>
