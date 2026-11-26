<script setup lang="ts">
import SectionNavigation from "~/components/portfolio/SectionNavigation.vue";
import ExperienceTimeline from "~/components/portfolio/ExperienceTimeline.vue";
import InlineDisclosure from "~/components/portfolio/InlineDisclosure.vue";
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
    <section id="overview" aria-label="Experience and achievements">
      <section id="experience" aria-labelledby="experience-heading"><ExperienceTimeline /></section>
      <div id="achievements">
        <section aria-labelledby="achievements-heading">
          <h2 id="achievements-heading">Achievements</h2>
          <article v-for="entry in featuredAchievements" :key="entry.event" class="award">
            <p class="category">
              {{ entry.category === "CTF" ? "Capture the flag" : entry.category }} ·
              {{ entry.year }}
            </p>
            <h3>
              <a :href="entry.source">{{ entry.headline ?? entry.result }}</a>
            </h3>
            <p>{{ entry.event }}</p>
            <p class="entry-meta">
              {{ entry.team
              }}<template v-if="entry.awardDetail"> · {{ entry.awardDetail }}</template>
            </p>
          </article>
        </section>
        <section id="results" aria-labelledby="results-heading">
          <h2 id="results-heading">Competition results</h2>
          <ResultList :results="recentResults" />
          <InlineDisclosure
            v-if="earlierResults.length"
            :show-label="`Show ${earlierResults.length} more results`"
            hide-label="Show fewer results"
          >
            <ResultList :results="earlierResults" />
          </InlineDisclosure>
        </section>
      </div>
    </section>
  </main>
</template>
