<script setup lang="ts">
import { useTemplateRef } from 'vue';
import { usePosts } from './usePosts';
import { useIntersectionObserver } from './useIntersectionObserver';
import PostCard from './PostCard.vue';

const { posts, loading, exhausted, loadMore, init } = usePosts();

// Top-level await — this component must be wrapped in <Suspense>
// The parent's #fallback slot shows while this promise resolves
await init();

// Sentinel element at the bottom of the list — when it enters the viewport, load more
const sentinelRef = useTemplateRef<HTMLDivElement>('sentinel');

useIntersectionObserver({
  target: sentinelRef,
  onIntersect: loadMore,
  rootMargin: '200px',
});
</script>

<template>
  <div
    class="post-list"
    role="feed"
    :aria-busy="loading"
    aria-label="Posts"
  >
    <PostCard
      v-for="post in posts"
      :key="post.id"
      :post="post"
      :aria-posinset="post.id"
      :aria-setsize="exhausted ? posts.length : -1"
    />

    <!-- Sentinel — observed by IntersectionObserver to trigger loading -->
    <div v-if="!exhausted" ref="sentinel" class="post-list__sentinel">
      <p v-if="loading" aria-live="polite">Loading more posts...</p>
    </div>

    <p v-else class="post-list__end" aria-live="polite">
      No more posts to load.
    </p>
  </div>
</template>

<style scoped>
.post-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.post-list__sentinel {
  text-align: center;
  padding: 16px;
  color: #888;
}

.post-list__end {
  text-align: center;
  color: #999;
  padding: 16px;
  font-style: italic;
}
</style>
