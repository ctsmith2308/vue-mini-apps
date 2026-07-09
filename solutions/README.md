# Vue Mini-App Solutions 594767553

Reference implementations for building Vue 3 mechanical fluency. Each folder contains a complete solution and a `prompts.md` with exercise instructions.

## Recommended Order

Work through these sequentially — each builds on APIs from the previous ones.

| #   | Mini-App            | Key APIs                                                   | Folder             |
| --- | ------------------- | ---------------------------------------------------------- | ------------------ |
| 0   | Todo                | `ref`, `computed`, `v-model`, `v-for`, `@submit.prevent`   | `todo/`            |
| 1   | Stopwatch           | `onMounted`, `onUnmounted`, `reactive`, `watchEffect`      | `stopwatch/`       |
| 2   | Accordion FAQ       | `defineProps`, `defineEmits`, `<slot>`, `<Transition>`     | `accordion/`       |
| 3   | Theme Switcher      | `provide`, `inject`, `InjectionKey`, composables           | `theme-switcher/`  |
| 4   | Modal Dialog        | native `<dialog>`, scoped slots, template refs, `defineModel` | `modal/`           |
| 5   | Tabs Panel          | `<component :is>`, `<KeepAlive>`, `defineAsyncComponent`   | `tabs/`            |
| 6   | Toast Notifications | `<TransitionGroup>`, shared composable state, `<Teleport>` | `toasts/`          |
| 7   | Multi-Step Form     | `defineModel`, `defineExpose`, form validation             | `multi-step-form/` |
| 8   | Infinite Scroll     | `<Suspense>`, async `setup`, Intersection Observer         | `infinite-scroll/` |

## How to Use

1. Open `<app>/prompts.md` — read the goal, requirements, and hints
2. Create your implementation in `src/apps/<app-name>/` and wire up a route
3. Check against the solution in `solutions/<app>/` when you're done or stuck
