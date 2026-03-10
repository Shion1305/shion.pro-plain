<script setup lang="ts"></script>

<template>
  <div
    class="min-h-screen w-full bg-slate-950 bg-gradient-to-br from-slate-900 via-black to-slate-900 text-slate-100 flex items-center justify-center p-4 sm:p-8 selection:bg-emerald-500/30"
  >
    <slot />
  </div>
</template>

<style>
body {
  margin: 0;
  background-color: #020617; /* Slate 950 */
}
</style>
