<script setup lang="ts">
import { provideTheme } from './useTheme';
import ThemedCard from './ThemedCard.vue';

// Root component provides theme to entire subtree
provideTheme('system');
</script>

<template>
  <div class="theme-app">
    <h2>Theme Switcher</h2>
    <ThemedCard />
  </div>
</template>

<style scoped>
.theme-app {
  max-width: 480px;
}
</style>
