## Goal

Build an accordion/FAQ component where clicking a question reveals its answer. This drills parent-child communication (props/emits) and content distribution (slots).

## Vue APIs You'll Practice

- **`defineProps`** — typed component inputs
- **`defineEmits`** — typed event declarations
- **`<slot>`** — default slot for body content
- **Named slots (`#header`)** — customizable sections of a child component
- **`<Transition>`** — CSS-based enter/leave animations
- **`withDefaults`** — default values for optional props

## Requirements

- [ ] Create an `AccordionItem` child component that accepts `id` and `isOpen` props
- [ ] `AccordionItem` emits a `toggle` event when clicked (parent controls state)
- [ ] Use a default `<slot>` for the answer content
- [ ] Use a named `#header` slot for the question text
- [ ] Wrap the panel in `<Transition>` for expand/collapse animation
- [ ] Support an `exclusive` prop on the parent — when true, only one item open at a time
- [ ] Accessibility: `aria-expanded`, `aria-controls`, `role="region"`, keyboard operable (Enter/Space)
- [ ] Use `<h3>` + `<button>` pattern for the trigger (not a clickable div)

## Hints

- The parent owns the open/close state — the child just reports clicks via emit
- `v-show` works better than `v-if` with `<Transition>` for expand/collapse
- Use a `Set<string>` to track which IDs are open — it handles both exclusive and multi-open modes
- For the arrow icon rotation, toggle a CSS class based on `isOpen`

## Stretch Goals

- [ ] Support "expand all" / "collapse all" buttons in the parent
- [ ] Add keyboard navigation: arrow keys to move focus between accordion headers
- [ ] Make the accordion data prop-driven (pass `faqs` as a prop instead of hardcoding)
