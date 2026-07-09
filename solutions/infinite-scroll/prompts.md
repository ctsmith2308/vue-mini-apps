## Goal

Build an infinite-scrolling post feed that fetches pages of data as the user scrolls down, with Suspense handling the initial load.

## Vue APIs You'll Practice

- **`<Suspense>`** — handle async component setup with a fallback UI
- **Top-level `await`** — async `setup` in a component (requires Suspense parent)
- **`useTemplateRef`** — reference a sentinel DOM element for observation
- **Composables** — `useIntersectionObserver` (DOM API wrapper) and `usePosts` (data fetching)
- **`watch` with `onCleanup`** — observe/disconnect lifecycle tied to a ref

## Requirements

- [ ] `usePosts()` composable with a fake API (generates mock posts, 800ms delay)
- [ ] Returns `{ posts, loading, exhausted, loadMore, init }`
- [ ] `useIntersectionObserver()` composable: takes a template ref + callback, wraps the browser API
- [ ] `PostList` component uses top-level `await init()` — triggers Suspense
- [ ] Sentinel `<div>` at the bottom of the list, observed by IntersectionObserver
- [ ] When sentinel enters viewport, call `loadMore()`
- [ ] Suspense `#fallback` shows "Loading posts..." during initial fetch
- [ ] Loading indicator at bottom while fetching more
- [ ] "No more posts" message when all pages are loaded
- [ ] Accessibility: `role="feed"`, `aria-busy` during load, `aria-live` on status messages

## Hints

- A component with a top-level `await` in `<script setup>` is an async component — Suspense is required
- The sentinel element is an empty div below your list — IntersectionObserver fires when it scrolls into view
- `rootMargin: '200px'` on the observer triggers the load slightly before the user reaches the bottom
- Use `watch` on the template ref to handle the element appearing/disappearing (it's `null` until mounted)

## Stretch Goals

- [ ] Replace the fake API with a real one (e.g., JSONPlaceholder `/posts?_page=N&_limit=10`)
- [ ] Add a skeleton loader (placeholder cards) instead of text-only loading state
- [ ] Add error handling with a "Retry" button if a fetch fails
