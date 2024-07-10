<script setup lang="ts">
import {definePageMeta} from "#imports";

useHead({
  title: "Shion's Website",
  meta: [
    {
      name: "description",
      content: "Hi👋 I'm Shion Ichikawa!!"
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1"
    }
  ]
});
</script>

<template>
  <div>
    <h1>Hello👋</h1>
    <h2>My name is Shion!!</h2>
    <p>
      I'm a first-year master's student at the Yokohama National University. I also work as a software engineer intern
      in Tokyo. My primary interests are in software engineering, DevOps, and security.
    </p>
    <ul>
      <li>
        <a href="https://linkedin.com/in/shion1305" target="_blank">LinkedIn</a>
      </li>
      <li>
        <a href="https://github.com/shion1305" target="_blank">GitHub</a>
      </li>
      <li>
        <a href="https://twitter.com/shion1305" target="_blank">Twitter</a>
      </li>
      <li>
        <a href="https://wantedly.com/id/shion1305" target="_blank">Wantedly</a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
h1, h2 {
  font-family: "Playwrite GB J", cursive;
  font-optical-sizing: auto;
  font-weight: 400;
  font-size: 2em;
  font-style: normal;
}

* {
  font-size: 1.2rem;
  font-family: "Titillium Web", sans-serif;
  font-weight: 400;
  font-style: normal;
}
</style>
