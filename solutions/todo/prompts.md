## Goal

Build a todo app with add, complete, delete, and filter functionality. This is the foundational exercise — it covers the core reactivity APIs you'll use everywhere.

## Vue APIs You'll Practice

- **`ref`** — reactive state for primitives and collections
- **`computed`** — derived state (filtered list, counts)
- **`v-model`** — two-way binding on the input
- **`v-for` / `:key`** — list rendering with stable keys
- **`@submit.prevent`** — form event handling with modifier
- **`@click`** — event binding

## Requirements

- [ ] Add a todo via form submission (Enter key or button)
- [ ] Trim input and reject empty strings
- [ ] Toggle a todo between completed and pending
- [ ] Delete a todo
- [ ] Filter by all / completed / pending with visible filter buttons
- [ ] Show counts per filter (e.g., "all (3)")
- [ ] Empty state message when no todos match the current filter
- [ ] Use a `Map<string, Todo>` for O(1) lookups by ID
- [ ] Scoped styles to avoid CSS leakage
- [ ] Accessibility: `<label>` on the input (visible or sr-only), `aria-label` on action buttons, `aria-pressed` on filter buttons

## Hints

- `crypto.randomUUID()` gives you unique IDs without a counter
- `computed` is the right tool for the filtered list — don't store a separate filtered array
- A `Map` iterates in insertion order, so your list stays chronological for free
- `aria-pressed` on filter buttons tells screen readers which filter is active

## Stretch Goals

- [ ] Persist todos to `localStorage` (serialize the Map via `Array.from`)
- [ ] Edit a todo in-place (double-click to toggle an input)
- [ ] Drag-and-drop reordering
