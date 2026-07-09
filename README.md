# Vue Mini-Apps

A collection of small Vue 3 apps for building mechanical fluency with the Composition API, TypeScript, and core Vue patterns.

Mirrors the [React Mini-Apps](../../react/react-mini-apps) project for cross-framework comparison.

## Setup

```sh
npm install
npm run dev
```

## Structure

```
src/
  pages/           # Route-level pages
  router/          # Vue Router config (createRouter)
  plugins/         # Plugin wrappers (router install)
  apps/            # Your implementations (gitignored)

solutions/         # Reference implementations with prompts
  <app>/
    prompts.md     # Goal, requirements, hints, stretch goals
    *.vue          # Solution components
    *.ts           # Composables and models
```

## Mini-Apps

Each mini-app targets specific Vue APIs. Work through them in order — each builds on the previous.

| #   | App                 | Key APIs                                                     | Folder             |
| --- | ------------------- | ------------------------------------------------------------ | ------------------ |
| 0   | Todo                | `ref`, `computed`, `v-model`, `v-for`                        | `todo/`            |
| 1   | Stopwatch           | `reactive`, `onMounted`, `onUnmounted`, `watchEffect`        | `stopwatch/`       |
| 2   | Accordion           | `defineProps`, `defineEmits`, slots, `<Transition>`          | `accordion/`       |
| 3   | Theme Switcher      | `provide`, `inject`, `InjectionKey`, composables             | `theme-switcher/`  |
| 4   | Modal Dialog        | native `<dialog>`, `defineModel`, `useTemplateRef`, `watch`  | `modal/`           |
| 5   | Tabs                | `<component :is>`, `<KeepAlive>`, `defineAsyncComponent`     | `tabs/`            |
| 6   | Toasts              | `<TransitionGroup>`, `<Teleport>`, shared composable state   | `toasts/`          |
| 7   | Multi-Step Form     | `defineModel`, `defineExpose`, validation                    | `multi-step-form/` |
| 8   | Infinite Scroll     | `<Suspense>`, async `setup`, Intersection Observer           | `infinite-scroll/` |

## Workflow

1. Open `solutions/<app>/prompts.md` — read the goal, requirements, and hints
2. Create your implementation in `src/apps/<app-name>/` and wire up a route in `src/router/index.ts`
3. Check against the solution in `solutions/<app>/` when done or stuck
