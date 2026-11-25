<script setup lang="ts">
import SectionNavigation from "~/components/portfolio/SectionNavigation.vue";
import ScrollExperience from "~/components/portfolio/ScrollExperience.vue";
import ResultList from "~/components/portfolio/ResultList.vue";
import { achievements, featuredAchievements } from "~/components/portfolio/achievements";
import "~/assets/portfolio.css";

const archive = achievements.filter((entry) => !featuredAchievements.includes(entry));
const recentResults = archive.slice(0, 3);
const earlierResults = archive.slice(3);

useHead({
  htmlAttrs: { lang: "en" },
  title: "Shion Ichikawa / 市川 詩恩",
  meta: [
    {
      name: "description",
      content:
        "Shion Ichikawa works in software and platform engineering on the Market Data Engineering team at Goldman Sachs, with an interest in DevSecOps.",
    },
  ],
});
</script>

<template>
  <main class="portfolio">
    <section id="profile" aria-labelledby="profile-name">
      <ProfileIntro />
      <ProfileLinks />
    </section>
    <SectionNavigation />
    <section id="overview" aria-label="Experience and achievement highlights">
      <section aria-labelledby="experience-heading"><ScrollExperience /></section>
      <section id="achievements" aria-labelledby="achievements-heading">
        <h2 id="achievements-heading">Achievements</h2>
        <article v-for="entry in featuredAchievements" :key="entry.event" class="award">
          <p class="category">
            {{ entry.category === "CTF" ? "Capture the flag" : entry.category }} · {{ entry.year }}
          </p>
          <h3>
            <a :href="entry.source">{{ entry.headline ?? entry.result }}</a>
          </h3>
          <p>{{ entry.event }}</p>
          <p class="entry-meta">
            {{ entry.team }}<template v-if="entry.awardDetail"> · {{ entry.awardDetail }}</template>
          </p>
        </article>
      </section>
    </section>
    <section id="results" aria-labelledby="results-heading">
      <h2 id="results-heading">More competition results</h2>
      <ResultList :results="recentResults" />
      <details v-if="earlierResults.length">
        <summary>
          <span class="closed-label">Show {{ earlierResults.length }} more results</span>
          <span class="open-label">Hide additional results</span>
        </summary>
        <ResultList :results="earlierResults" />
      </details>
    </section>
  </main>
</template>
