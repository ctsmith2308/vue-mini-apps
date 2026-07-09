## Goal

Build a reusable modal dialog that renders outside the component tree, accepts flexible content via slots, and handles accessibility properly.

## Vue APIs You'll Practice

- **Native `<dialog>`** — built-in modal with top-layer rendering, focus trapping, and Escape handling
- **`defineModel`** — two-way binding for open/close state
- **`useTemplateRef`** — access the dialog element to call `.showModal()` / `.close()`
- **`watch`** — bridge reactive state to imperative DOM APIs
- **Scoped slots** — expose a `close` function to slot content
- **Named slots** — separate `default` (body) and `footer` (actions) content areas

## Requirements

- [ ] `ModalDialog` component with `v-model` for open state and `title` prop
- [ ] Uses native `<dialog>` element with `.showModal()` / `.close()`
- [ ] Default slot for body content, named `#footer` slot for action buttons
- [ ] Both slots are scoped — they receive a `close` function
- [ ] Footer only renders if the slot is provided (`v-if="$slots.footer"`)
- [ ] Sync Escape-to-close with model via the native `close` event
- [ ] Close on backdrop click (but not when clicking dialog content)
- [ ] Accessibility: `aria-labelledby`, focus trapping and Escape handled natively by `<dialog>`

## Hints

- `defineModel<boolean>()` gives you a ref that syncs with the parent's `v-model`
- `<dialog>` is hidden by default — you must call `.showModal()` imperatively, `v-if`/`v-show` won't work
- Use `watch` on the model to bridge reactive state to the imperative `.showModal()` / `.close()` API
- `e.target === dialogRef.value` catches backdrop clicks — native dialog treats the backdrop as part of the element
- `::backdrop` pseudo-element is free with `.showModal()` — style it instead of creating a wrapper div
- No need for `<Teleport>` — `.showModal()` renders on the browser's top layer, above all z-index contexts

## Stretch Goals

- [ ] Add full focus trapping (Tab cycles within the dialog, doesn't escape to page)
- [ ] Restore focus to the triggering button when the modal closes
- [ ] Prevent body scroll while the modal is open
