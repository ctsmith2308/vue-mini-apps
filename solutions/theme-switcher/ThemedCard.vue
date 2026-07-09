<script setup lang="ts">
import { computed } from 'vue';
import { useTheme } from './useTheme';
import ThemeControls from './ThemeControls.vue';

const { resolved } = useTheme();

const cardClass = computed(() => `themed-card themed-card--${resolved.value}`);
</script>

<template>
  <div :class="cardClass">
    <h3>I'm a themed card</h3>
    <p>
      Current resolved theme: <strong>{{ resolved }}</strong>
    </p>

    <!-- ThemeControls is nested inside ThemedCard to show inject works at any depth -->
    <ThemeControls />
  </div>
</template>

<style scoped>
.themed-card {
  padding: 24px;
  border-radius: 8px;
  margin-top: 12px;
  transition:
    background-color 0.3s,
    color 0.3s;
}

.themed-card--light {
  background-color: #ffffff;
  color: #1a1a1a;
  border: 1px solid #ddd;
}

.themed-card--dark {
  background-color: #1a1a2e;
  color: #e0e0e0;
  border: 1px solid #333;
}
</style>
