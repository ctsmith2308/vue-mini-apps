<script setup lang="ts">
import { useTheme } from './useTheme';

// inject works at any depth — this component doesn't need props from its parent
const { theme, setTheme, toggleTheme } = useTheme();
</script>

<template>
  <fieldset class="theme-controls">
    <legend>Choose theme</legend>

    <div class="theme-controls__options">
      <label
        v-for="option in ['light', 'dark', 'system'] as const"
        :key="option"
      >
        <input
          type="radio"
          name="theme"
          :value="option"
          :checked="theme === option"
          @change="setTheme(option)"
        />
        {{ option }}
      </label>
    </div>

    <button
      type="button"
      @click="toggleTheme"
    >
      Toggle Light/Dark
    </button>
  </fieldset>
</template>

<style scoped>
.theme-controls {
  margin-top: 16px;
  border: 1px solid currentColor;
  border-radius: 4px;
  padding: 12px;
}

.theme-controls__options {
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
}

.theme-controls__options label {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  text-transform: capitalize;
}

button {
  padding: 6px 12px;
  cursor: pointer;
}
</style>
