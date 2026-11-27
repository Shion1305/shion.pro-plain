<script setup lang="ts">
import { describeTenure, type Role } from "./experience";
const props = defineProps<{ roles: Role[] }>();
const currentMonth = useState("tenure-month", () => new Date().toISOString().slice(0, 7));
const entries = computed(() =>
  props.roles.map((role) => ({ ...role, ...describeTenure(role, currentMonth.value) })),
);
</script>

<template>
  <ol class="role-timeline">
    <li v-for="entry in entries" :key="entry.company + entry.start">
      <span class="company-logo" :data-surface="entry.logoSurface"
        ><img :src="entry.logo" alt="" width="38" height="38"
      /></span>
      <div>
        <h3>{{ entry.company }}</h3>
        <p>{{ entry.role }}</p>
        <small
          >{{ entry.period }} <span class="tenure">· {{ entry.duration }}</span></small
        >
      </div>
    </li>
  </ol>
</template>
