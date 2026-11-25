<template>
  <div class="site-shell">
    <slot />
  </div>
</template>

<style>
:root {
  color-scheme: light;
  --paper: #f8f7f2;
  --ink: #202523;
  --muted: #565e59;
  --line: #ced1c9;
  --blue: #233fb2;
  --serif: "Instrument Serif", Georgia, serif;
  font-family: "DM Sans", system-ui, sans-serif;
  background: var(--paper);
  color: var(--ink);
}

body {
  margin: 0;
}
* {
  box-sizing: border-box;
}
::selection {
  color: white;
  background: var(--blue);
}
:focus-visible {
  outline: 3px solid #4871ed;
  outline-offset: 5px;
}
</style>
