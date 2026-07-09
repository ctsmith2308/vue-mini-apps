## Goal

Build a tabbed interface where switching tabs swaps the displayed component — and form state survives tab changes thanks to KeepAlive.

## Vue APIs You'll Practice

- **`<component :is>`** — dynamically render a component from a variable
- **`<KeepAlive>`** — cache component instances so their state isn't destroyed on switch
- **`defineAsyncComponent`** — lazy-load a component only when needed
- **`ref<Component>`** — store a component reference in reactive state

## Requirements

- [ ] Tab config as an array: `{ id, label, component }`
- [ ] Render the active tab's component via `<component :is="...">`
- [ ] Wrap in `<KeepAlive>` — fill out a form in one tab, switch away and back, data persists
- [ ] One tab loaded via `defineAsyncComponent` (simulates lazy loading)
- [ ] At least two tabs with form inputs to demonstrate KeepAlive
- [ ] ARIA: `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, `aria-controls`, `aria-labelledby`
- [ ] Keyboard: Arrow Left/Right moves focus between tabs
- [ ] Only the active tab has `tabindex="0"`, others get `tabindex="-1"`

## Hints

- `<component :is>` accepts a component object or a string — pass the object from your config
- `<KeepAlive>` wraps `<component :is>` and caches the instance based on identity
- `defineAsyncComponent(() => import('./...'))` returns a component that loads on first render
- For keyboard nav, handle `keydown` on each tab button and focus the next/prev button programmatically

## Stretch Goals

- [ ] Add `<Suspense>` around the async tab with a loading fallback
- [ ] Add an `activated` / `deactivated` lifecycle hook in one panel to log when KeepAlive caches/restores it
- [ ] Make tabs closable (remove from the array, handle edge cases)
- [ ] For full ARIA compliance, render all panels in the DOM with `v-show` instead of `<component :is>` — note that this makes KeepAlive unnecessary since components never unmount
