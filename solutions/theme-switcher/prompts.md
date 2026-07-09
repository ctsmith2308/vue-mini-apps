## Goal

Build a theme switcher that lets any component in the tree read and change the current theme — without prop drilling. This drills `provide`/`inject` and the composable pattern.

## Vue APIs You'll Practice

- **`provide` / `inject`** — dependency injection across component depth
- **`InjectionKey`** — type-safe injection keys (no casting)
- **`watchEffect`** — sync theme to the DOM automatically
- **Composables** — `provideTheme()` at the root, `useTheme()` anywhere below

## Requirements

- [ ] Define a `Theme` type: `'light' | 'dark' | 'system'`
- [ ] Create `provideTheme()` — called once at root, sets up state and calls `provide`
- [ ] Create `useTheme()` — returns `{ theme, resolved, setTheme, toggleTheme }` via `inject`
- [ ] `watchEffect` syncs `resolved` theme to `document.documentElement.dataset.theme`
- [ ] `ThemedCard` component uses the injected theme to apply conditional CSS classes
- [ ] `ThemeControls` is nested inside `ThemedCard` (proves inject works at arbitrary depth)
- [ ] Radio buttons for light / dark / system
- [ ] `'system'` mode respects `prefers-color-scheme` media query
- [ ] Throw an error if `useTheme()` is called without a parent `provideTheme()`

## Hints

- `InjectionKey<T>` is a typed Symbol — it eliminates the need for string keys and type casting
- `window.matchMedia('(prefers-color-scheme: dark)').matches` tells you the OS preference
- Setting `document.documentElement.dataset.theme` lets you write CSS like `[data-theme="dark"] { ... }`
- The provide/inject split (two functions) mirrors React's Context pattern

## Stretch Goals

- [ ] Listen for `matchMedia` `change` events so system theme updates live
- [ ] Persist theme preference to `localStorage`
- [ ] Add a third theme like `'sepia'` and update the type + styles
