<script setup lang="ts">
import { currentRole, internships } from "./experience";
import RoleTimeline from "./RoleTimeline.vue";
import InlineDisclosure from "./InlineDisclosure.vue";

const roles = [currentRole, ...internships];
const recent = roles.slice(0, 8);
const earlier = roles.slice(recent.length);
</script>

<template>
  <div class="experience-heading">
    <h2 id="experience-heading">Experience</h2>
    <span class="role-count">{{ roles.length }} roles</span>
  </div>
  <RoleTimeline :roles="recent" />
  <InlineDisclosure
    v-if="earlier.length"
    :show-label="`Show all ${roles.length} roles`"
    hide-label="Show fewer roles"
  >
    <RoleTimeline :roles="earlier" />
  </InlineDisclosure>
</template>
