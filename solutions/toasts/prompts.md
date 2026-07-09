## Goal

Build a toast notification system — any component can fire a toast, and they stack with enter/leave animations.

## Vue APIs You'll Practice

- **`<TransitionGroup>`** — animate list additions and removals
- **`<Teleport>`** — render the toast container outside the component tree
- **Composable with module-level state** — shared singleton pattern (no provide/inject needed)
- **`props` / `emits`** — parent-child communication for toast items

## Requirements

- [ ] `useToast()` composable with module-level state: `{ toasts, addToast, removeToast }`
- [ ] Toast types: `'success' | 'error' | 'info'` with distinct colors
- [ ] Auto-dismiss after configurable duration (default 3s)
- [ ] Errors do NOT auto-dismiss (require manual close)
- [ ] Close button on each toast
- [ ] `<TransitionGroup>` for slide-in / slide-out animations
- [ ] `<Teleport to="body">` for the container (fixed position, bottom-right)
- [ ] `ToastItem` component with `role="alert"` and `aria-live="polite"`
- [ ] Clean up timers when a toast is manually dismissed

## Hints

- Module-level state = `const toasts = ref([])` declared outside the function, so all callers share it
- `<TransitionGroup>` needs a unique `:key` on each child — use the toast ID
- `column-reverse` on the container makes new toasts appear at the bottom naturally
- Track `setTimeout` IDs in a `Map` so you can `clearTimeout` on manual dismiss

## Stretch Goals

- [ ] Add a progress bar that shrinks over the toast's duration
- [ ] Support an `undo` action callback on success toasts
- [ ] Add a "dismiss all" button
