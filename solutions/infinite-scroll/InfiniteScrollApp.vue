<script setup lang="ts">
import PostList from './PostList.vue';
</script>

<template>
  <div class="infinite-scroll-app">
    <h2>Infinite Scroll</h2>

    <!-- Suspense handles the async setup in PostList -->
    <Suspense>
      <PostList />

      <template #fallback>
        <div class="infinite-scroll-app__loading" aria-live="polite">
          <p>Loading posts...</p>
        </div>
      </template>
    </Suspense>
  </div>
</template>

<style scoped>
.infinite-scroll-app {
  max-width: 600px;
}

.infinite-scroll-app__loading {
  text-align: center;
  padding: 48px 0;
  color: #888;
}
</style>
