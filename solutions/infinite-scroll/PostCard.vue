<script setup lang="ts">
import type { Post } from './usePosts';

defineProps<{
  post: Post;
}>();
</script>

<template>
  <article class="post-card">
    <h3 class="post-card__title">{{ post.title }}</h3>
    <p class="post-card__body">{{ post.body }}</p>
    <span class="post-card__author">by {{ post.author }}</span>
  </article>
</template>

<style scoped>
.post-card {
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
}

.post-card__title {
  margin: 0 0 8px;
  font-size: 1.1rem;
}

.post-card__body {
  color: #555;
  margin: 0 0 8px;
}

.post-card__author {
  font-size: 0.85rem;
  color: #888;
}
</style>
