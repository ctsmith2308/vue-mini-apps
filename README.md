# Vue Mini-Apps

A collection of small Vue 3 apps for building mechanical fluency with the Composition API, TypeScript, and core Vue patterns.

## Setup

```sh
npm install
npm run dev
```

## Structure

```
src/
  pages/         # Route-level pages
  apps/          # Your implementations (gitignored)
  router/        # Vue Router config
  plugins/       # Plugin wrappers (router install)
solutions/       # Reference implementations with prompts
```

## Mini-Apps

Each mini-app targets specific Vue APIs. Work through them in order — each builds on the previous.

| #   | App                 | Key APIs                                                      |
| --- | ------------------- | ------------------------------------------------------------- |
| 0   | Todo                | `ref`, `computed`, `v-model`, `v-for`                         |
| 1   | Stopwatch           | `reactive`, `onMounted`, `onUnmounted`, `watchEffect`         |
| 2   | Accordion           | `defineProps`, `defineEmits`, slots, `<Transition>`           |
| 3   | Theme Switcher      | `provide`, `inject`, `InjectionKey`, composables              |
| 4   | Modal Dialog        | native `<dialog>`, `defineModel`, `useTemplateRef`, `watch`   |
| 5   | Tabs                | `<component :is>`, `<KeepAlive>`, `defineAsyncComponent`      |
| 6   | Toasts              | `<TransitionGroup>`, `<Teleport>`, shared composable state    |
| 7   | Multi-Step Form     | `defineModel`, `defineExpose`, validation                     |
| 8   | Infinite Scroll     | `<Suspense>`, async `setup`, Intersection Observer            |

## Workflow

1. Read `solutions/<app>/prompts.md` for the goal, requirements, and hints
2. Build your implementation in `src/apps/<app-name>/` and wire up a route
3. Check against the reference in `solutions/<app>/` when done or stuck
