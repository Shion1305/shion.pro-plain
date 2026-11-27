<template>
  <div class="grid gap-6 md:grid-cols-2 md:items-center md:gap-10">
    <ProfileGreeting />
    <div class="profile-bio space-y-4">
      <div class="flex items-center gap-4 sm:gap-5">
        <img
          src="/goldman-sachs.svg"
          alt="Goldman Sachs"
          width="86"
          height="36"
          class="h-auto w-16 shrink-0 invert sm:w-[86px]"
        />
        <div class="min-w-0 border-l border-white/20 pl-4 sm:pl-5">
          <p class="text-lg font-semibold leading-tight text-slate-100 sm:text-xl">
            Market Data Engineering
          </p>
          <p class="mt-1 text-sm leading-snug text-slate-400 sm:text-base">
            Software &amp; platform engineering
          </p>
        </div>
      </div>
      <p class="text-lg leading-relaxed text-slate-300 sm:text-xl">
        I’m interested in how developers, security teams, and operators work together. I like
        finding ways to make secure choices easier, from code review to production.
      </p>
    </div>
  </div>
</template>
