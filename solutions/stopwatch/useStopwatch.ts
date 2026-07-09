import { reactive, onUnmounted, computed } from 'vue';

interface StopwatchState {
  elapsedMs: number;
  running: boolean;
  laps: number[];
  lastLapMs: number;
}

export function useStopwatch() {
  const state = reactive<StopwatchState>({
    elapsedMs: 0,
    running: false,
    laps: [],
    lastLapMs: 0,
  });

  let intervalId: ReturnType<typeof setInterval> | null = null;
  const TICK_MS = 10;

  function start() {
    if (state.running) return;
    state.running = true;
    intervalId = setInterval(() => {
      state.elapsedMs += TICK_MS;
    }, TICK_MS);
  }

  function stop() {
    if (!state.running) return;
    state.running = false;
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  function reset() {
    stop();
    state.elapsedMs = 0;
    state.laps = [];
    state.lastLapMs = 0;
  }

  function lap() {
    if (!state.running) return;
    state.laps.push(state.elapsedMs - state.lastLapMs);
    state.lastLapMs = state.elapsedMs;
  }

  // Format milliseconds into mm:ss.cc
  const formatted = computed(() => formatTime(state.elapsedMs));

  function formatTime(ms: number): string {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);

    return [
      String(minutes).padStart(2, '0'),
      ':',
      String(seconds).padStart(2, '0'),
      '.',
      String(centiseconds).padStart(2, '0'),
    ].join('');
  }

  // Cleanup on component unmount — prevents leaked intervals
  onUnmounted(() => {
    if (intervalId !== null) {
      clearInterval(intervalId);
    }
  });

  return {
    state,
    formatted,
    formatTime,
    start,
    stop,
    reset,
    lap,
  };
}
