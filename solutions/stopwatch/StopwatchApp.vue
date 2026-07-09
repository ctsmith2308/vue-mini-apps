<script setup lang="ts">
import { watchEffect } from 'vue';
import { useStopwatch } from './useStopwatch';

const { state, formatted, formatTime, start, stop, reset, lap } =
  useStopwatch();

// watchEffect auto-tracks dependencies — re-runs whenever state.running or state.elapsedMs changes
watchEffect(() => {
  console.log(
    `[Stopwatch] running=${state.running}, elapsed=${formatted.value}`,
  );
});
</script>

<template>
  <div class="stopwatch">
    <h2>Stopwatch</h2>

    <!-- aria-live so screen readers announce time changes (polite = non-interruptive) -->
    <p
      class="stopwatch__display"
      aria-live="polite"
      aria-atomic="true"
    >
      {{ formatted }}
    </p>

    <div class="stopwatch__controls">
      <button
        type="button"
        @click="start"
        :disabled="state.running"
        aria-label="Start stopwatch"
      >
        Start
      </button>

      <button
        type="button"
        @click="stop"
        :disabled="!state.running"
        aria-label="Stop stopwatch"
      >
        Stop
      </button>

      <button
        type="button"
        @click="lap"
        :disabled="!state.running"
        aria-label="Record lap time"
      >
        Lap
      </button>

      <button
        type="button"
        @click="reset"
        aria-label="Reset stopwatch"
      >
        Reset
      </button>
    </div>

    <ol
      v-if="state.laps.length"
      class="stopwatch__laps"
      aria-label="Lap times"
    >
      <li
        v-for="(lapMs, index) in state.laps"
        :key="index"
      >
        Lap {{ index + 1 }}: {{ formatTime(lapMs) }}
      </li>
    </ol>
  </div>
</template>

<style scoped>
.stopwatch {
  max-width: 320px;
  text-align: center;
}

.stopwatch__display {
  font-size: 2.5rem;
  font-family: monospace;
  margin: 1rem 0;
}

.stopwatch__controls {
  display: flex;
  gap: 8px;
  justify-content: center;
}

.stopwatch__controls button {
  padding: 6px 14px;
  cursor: pointer;
}

.stopwatch__controls button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.stopwatch__laps {
  margin-top: 1rem;
  text-align: left;
  padding-left: 1.5rem;
}

.stopwatch__laps li {
  font-family: monospace;
  padding: 2px 0;
}
</style>
