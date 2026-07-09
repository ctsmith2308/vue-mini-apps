## Goal

Build a stopwatch with start, stop, reset, and lap functionality. This app focuses on lifecycle hooks and the difference between `reactive` and `ref`.

## Vue APIs You'll Practice

- **`reactive`** — create a reactive object (contrast with `ref` which wraps a single value)
- **`onMounted` / `onUnmounted`** — lifecycle hooks for setup and cleanup
- **`watchEffect`** — auto-tracking side effects (no explicit dependency list)
- **`computed`** — derived state for formatted time display
- **Composables** — extracting reusable logic into a `use*` function

## Requirements

- [ ] Display elapsed time in `mm:ss.cs` format (centiseconds)
- [ ] Start button begins the timer, disabled while running
- [ ] Stop button pauses the timer, disabled while stopped
- [ ] Reset button stops and clears the timer + laps
- [ ] Lap button records the current time to a lap list
- [ ] Extract all timer logic into a `useStopwatch()` composable
- [ ] Use `reactive()` for the stopwatch state (not `ref`)
- [ ] Clean up the interval in `onUnmounted` to prevent memory leaks
- [ ] Use `watchEffect` to log state changes to the console
- [ ] Add `aria-live="polite"` to the time display for screen readers

## Hints

- `setInterval` with a ~10ms tick gives smooth centisecond updates
- `reactive` is great when your state is a coherent object — but remember you can't destructure it without losing reactivity
- `watchEffect` doesn't need you to list dependencies — it tracks whatever reactive state you read inside it
- Return the cleanup concern from your composable's `onUnmounted`, don't leave it to the consumer

## Stretch Goals

- [ ] Show split times (difference between consecutive laps) alongside absolute lap times
- [ ] Add a countdown mode that accepts a target duration
- [ ] Persist elapsed time to `localStorage` so it survives page refresh
