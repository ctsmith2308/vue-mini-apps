## Goal

Build a multi-step form wizard where each step is its own component, the parent orchestrates navigation, and validation gates each transition.

## Vue APIs You'll Practice

- **`defineModel`** — two-way binding between parent data and child inputs (Vue 3.4+)
- **`defineExpose`** — expose a `validate()` method from child to parent
- **`useTemplateRef`** — call methods on child component instances
- **`computed`** — derived state for navigation (isFirst, isLast, currentStep)
- **`<component :is>`** — dynamic step rendering

## Requirements

- [ ] 3 steps: Personal Info (name, email), Preferences (role select, interest checkboxes), Review (summary)
- [ ] Each step uses `defineModel` for its form fields — parent owns the data
- [ ] Each step exposes `validate()` via `defineExpose` — returns boolean
- [ ] Parent calls `validate()` on the current step before allowing "Next"
- [ ] Step indicator shows progress (Step 1 of 3, with active/done states)
- [ ] Back / Next / Submit navigation
- [ ] Review step displays all collected data
- [ ] Accessibility: `label`/`input` association, `aria-invalid`, error messages linked via `aria-describedby`, `fieldset`/`legend`

## Hints

- `defineModel<string>('name')` creates a two-way binding for `v-model:name` on the parent
- `defineExpose({ validate })` makes `validate` callable via a template ref to the component
- `useTemplateRef<{ validate: () => boolean }>('ref-name')` gives you typed access to exposed methods
- The review step can just accept regular props since it's read-only

## Stretch Goals

- [ ] Add `<Transition>` for slide-left / slide-right between steps
- [ ] Persist form data to `sessionStorage` so it survives refresh
- [ ] Make steps skippable if already validated (click the step indicator)
