<script setup lang="ts">
const description =
  "Shion Ichikawa works in software and platform engineering on the Market Data Engineering team at Goldman Sachs. Explore his open-source projects and interests in DevSecOps.";

useHead({ htmlAttrs: { lang: "en" } });
useSeoMeta({
  title: "Shion Ichikawa — Software & Platform Engineering",
  description,
  ogTitle: "Shion Ichikawa — Engineering Portfolio",
  ogDescription: description,
  ogType: "website",
});

const projects = [
  {
    name: "Cloudflare Worker Deploy",
    field: "Developer tooling",
    description:
      "A GitHub Action that generates a Wrangler configuration and deploys a Cloudflare Worker from a release workflow. It powers this site’s deployments.",
    url: "https://github.com/Shion1305/cloudflare-worker-deploy",
  },
  {
    name: "Seiryo Festival",
    field: "Web development",
    description:
      "The 2023 website for Yokohama National University’s Seiryo Festival, built with the student festival engineering team.",
    url: "https://github.com/YNUFes-tech/ynufes-seiryo23",
  },
];
const profiles = [
  { name: "GitHub", url: "https://github.com/Shion1305" },
  { name: "LinkedIn", url: "https://linkedin.com/in/shion1305" },
  { name: "X", url: "https://x.com/shion1305" },
  { name: "Wantedly", url: "https://wantedly.com/id/shion1305" },
];
</script>

<template>
  <div id="top">
    <a class="skip-link" href="#main">Skip to content</a>
    <header class="masthead wrap">
      <a href="#top" class="identity" aria-label="Shion Ichikawa, back to top">
        <span class="monogram" aria-hidden="true">si</span>
        <span>Shion Ichikawa</span>
      </a>
      <nav aria-label="Main navigation">
        <a href="#experience">Experience</a>
        <a href="#projects">Projects</a>
        <a href="#connect">Connect</a>
      </nav>
    </header>
    <main id="main">
      <section class="hero wrap" aria-labelledby="name">
        <div class="intro">
          <p class="kicker"><span class="rule" aria-hidden="true"></span> Engineering portfolio</p>
          <h1 id="name">Shion <em>Ichikawa</em></h1>
          <p class="intro-text">
            I work in software and platform engineering, with a particular interest in how teams
            build and operate secure systems together.
          </p>
          <a class="work-link" href="#projects"
            >Explore my projects <span aria-hidden="true">↓</span></a
          >
        </div>
        <figure class="portrait">
          <div class="photo">
            <img
              src="/shion-ichikawa.webp"
              width="567"
              height="710"
              alt="Shion Ichikawa smiling"
              fetchpriority="high"
            />
          </div>
          <figcaption><span aria-hidden="true">⌖</span> From Yokohama, Japan</figcaption>
        </figure>
      </section>
      <section id="experience" class="experience" aria-labelledby="experience-heading">
        <div class="experience-inner wrap">
          <div>
            <p class="kicker">Current role</p>
            <h2 id="experience-heading">Experience</h2>
          </div>
          <div class="role">
            <img src="/goldman-sachs.png" width="84" height="84" alt="" />
            <div>
              <h3>Goldman Sachs</h3>
              <p>Market Data Engineering</p>
            </div>
          </div>
          <p class="role-description">
            I work on the Market Data Engineering team. I’m interested in DevSecOps and how teams
            build a culture of secure, sustainable engineering as the business evolves.
          </p>
        </div>
      </section>
      <section id="projects" class="projects wrap" aria-labelledby="projects-heading">
        <div class="section-heading">
          <h2 id="projects-heading">Selected <em>projects</em></h2>
          <a class="text-link" href="https://github.com/Shion1305"
            >All on GitHub <span aria-hidden="true">↗</span></a
          >
        </div>
        <ul>
          <li v-for="project in projects" :key="project.url">
            <a :href="project.url" class="project">
              <div>
                <p class="kicker">{{ project.field }}</p>
                <h3>{{ project.name }}</h3>
              </div>
              <p class="project-description">{{ project.description }}</p>
              <span class="arrow" aria-hidden="true">↗</span>
            </a>
          </li>
        </ul>
      </section>
    </main>
    <footer id="connect">
      <div class="footer-inner wrap">
        <h2>Connect</h2>
        <nav aria-label="Social profiles">
          <a v-for="profile in profiles" :key="profile.name" :href="profile.url"
            >{{ profile.name }} <span aria-hidden="true">↗</span></a
          >
        </nav>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.wrap {
  width: min(1120px, calc(100% - 8rem));
  margin-inline: auto;
}
.masthead,
.identity,
.masthead nav,
.kicker,
.work-link,
.section-heading,
.text-link,
.footer-inner,
.footer-inner nav {
  display: flex;
  align-items: center;
}
.masthead {
  min-height: 80px;
  justify-content: space-between;
  border-bottom: 1px solid var(--line);
}
.identity {
  gap: 0.8rem;
  font-size: 0.97rem;
  font-weight: 650;
  letter-spacing: -0.025em;
}
.monogram {
  display: grid;
  place-content: center;
  height: 36px;
  width: 36px;
  background: var(--blue);
  color: white;
  font: italic 30px/0.9 var(--serif);
  padding-right: 3px;
}
.masthead nav {
  gap: clamp(1rem, 3vw, 2.5rem);
  font-size: 0.87rem;
  font-weight: 550;
}
.masthead nav a:hover,
.text-link:hover,
.footer-inner a:hover {
  text-decoration: underline;
  text-underline-offset: 0.35em;
}
.skip-link {
  position: absolute;
  top: 0;
  left: 1rem;
  transform: translateY(-140%);
  padding: 0.75rem 1rem;
  background: var(--ink);
  color: white;
  z-index: 2;
}
.skip-link:focus {
  transform: translateY(0);
}
.hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(220px, 30%);
  align-items: center;
  gap: clamp(3rem, 9vw, 8.5rem);
  padding-block: clamp(3.2rem, 7vw, 6.5rem);
}
.kicker,
figcaption {
  font-size: 0.72rem;
  line-height: 1.4;
  font-weight: 650;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}
.kicker {
  color: var(--blue);
  gap: 0.7rem;
}
.rule {
  width: 2.2rem;
  height: 2px;
  background: currentColor;
}
h1,
h2,
.project h3 {
  font-family: var(--serif);
  font-weight: 400;
  letter-spacing: -0.04em;
}
h1 {
  margin: 1.2rem 0 1.45rem;
  font-size: clamp(5rem, 8.7vw, 8.15rem);
  line-height: 0.9;
}
h1 em {
  display: block;
  color: var(--blue);
}
em {
  font-weight: inherit;
}
.intro-text,
.project-description,
.role-description {
  color: var(--muted);
  line-height: 1.65;
}
.intro-text {
  max-width: 33rem;
  font-size: clamp(1rem, 1.4vw, 1.17rem);
}
.work-link {
  display: inline-flex;
  gap: 1.1rem;
  margin-top: 1.65rem;
  padding: 0.7rem 1.12rem;
  background: var(--blue);
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
}
.work-link:hover {
  background: #1b318c;
}
.work-link span,
.text-link span {
  font-size: 1.2em;
}
.portrait {
  padding-right: 8px;
}
.photo {
  position: relative;
  aspect-ratio: 4/4.7;
  background: #dddcd6;
  box-shadow: 8px 8px var(--blue);
}
.photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(100%);
  object-position: 50% 62%;
}
figcaption {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 1.2rem;
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  color: var(--muted);
}
figcaption span {
  color: var(--blue);
  font-size: 1.3rem;
  line-height: 1;
}
h2 {
  font-size: clamp(2.6rem, 4.4vw, 4.25rem);
  line-height: 1.05;
}
.experience {
  background: #e8ecf0;
  border-block: 1px solid #d5dbe0;
}
.experience-inner {
  display: grid;
  align-items: center;
  grid-template-columns: 0.82fr 1.15fr 1.5fr;
  gap: 2rem;
  padding-block: 2.65rem;
}
.experience h2 {
  font-size: clamp(2.1rem, 3.1vw, 3.15rem);
  margin-top: 0.35rem;
}
.role {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.role img {
  width: clamp(54px, 5.4vw, 76px);
  height: auto;
  flex-shrink: 0;
}
.role h3 {
  font-size: 1.12rem;
  font-weight: 650;
  letter-spacing: -0.025em;
}
.role p,
.role-description {
  font-size: 0.9rem;
}
.role p {
  margin-top: 0.15rem;
  color: var(--muted);
}
.projects {
  padding-block: clamp(3rem, 6vw, 5.5rem);
}
.section-heading {
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 2rem;
}
.section-heading em {
  color: var(--blue);
}
.text-link {
  color: var(--blue);
  gap: 0.5rem;
  font-size: 0.86rem;
  font-weight: 650;
}
.project {
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr auto;
  gap: 2.5rem;
  padding: 1.75rem 0;
  border-top: 1px solid var(--line);
}
.projects li:last-child {
  border-bottom: 1px solid var(--line);
}
.project h3 {
  font-size: clamp(1.85rem, 3vw, 2.75rem);
  line-height: 1.12;
  margin-top: 0.45rem;
}
.project .kicker {
  font-size: 0.66rem;
}
.project-description {
  font-size: 0.95rem;
}
.arrow {
  display: grid;
  width: 2.55rem;
  height: 2.55rem;
  place-items: center;
  border: 1px solid var(--line);
  border-radius: 50%;
  color: var(--blue);
  font-size: 1.25rem;
}
.project:hover .arrow,
.project:focus-visible .arrow {
  background: var(--blue);
  color: white;
  border-color: var(--blue);
}
.project:hover h3 {
  color: var(--blue);
}
footer {
  background: #202923;
  color: var(--paper);
}
.footer-inner {
  padding-block: 2.75rem;
  justify-content: space-between;
  gap: 1.75rem;
}
.footer-inner h2 {
  font-size: 2.75rem;
}
.footer-inner nav {
  flex-wrap: wrap;
  gap: 1rem 1.7rem;
}
.footer-inner a {
  font-size: 0.9rem;
  padding-block: 0.3rem;
}
.footer-inner a span {
  color: #bfd5bc;
}
@media (max-width: 900px) {
  .wrap {
    width: min(100% - 3.5rem, 1120px);
  }
  .experience-inner {
    grid-template-columns: 1fr 1.4fr;
    gap: 1.5rem;
  }
  .role-description {
    grid-column: 2;
    margin-top: -0.55rem;
  }
}
@media (max-width: 640px) {
  .wrap {
    width: calc(100% - 2.5rem);
  }
  .masthead {
    min-height: 67px;
  }
  .identity {
    gap: 0.45rem;
  }
  .identity > span:last-child {
    display: none;
  }
  .masthead nav {
    gap: 1.05rem;
    font-size: 0.81rem;
  }
  .hero {
    grid-template-columns: 1fr;
    gap: 2.35rem;
    padding-block: 2.8rem;
  }
  h1 {
    font-size: clamp(4.65rem, 18vw, 6rem);
  }
  .intro-text {
    max-width: 32rem;
  }
  .portrait {
    width: min(77%, 19rem);
    justify-self: center;
  }
  .photo {
    aspect-ratio: 1.13;
  }
  .experience-inner {
    grid-template-columns: 1fr;
    gap: 1.3rem;
    padding-block: 2rem;
  }
  .role-description {
    grid-column: auto;
    margin: 0;
  }
  .section-heading {
    align-items: flex-start;
    flex-direction: column;
    gap: 0.6rem;
    margin-bottom: 1.4rem;
  }
  .project {
    grid-template-columns: 1fr auto;
    gap: 0.7rem 1rem;
    padding-block: 1.45rem;
  }
  .project-description {
    grid-column: 1;
  }
  .arrow {
    grid-column: 2;
    grid-row: 1 / 3;
  }
  .footer-inner {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
