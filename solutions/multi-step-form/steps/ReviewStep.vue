<script setup lang="ts">
defineProps<{
  name: string;
  email: string;
  role: string;
  interests: string[];
}>();

// No validation needed — this is a read-only summary
defineExpose({
  validate: () => true,
});
</script>

<template>
  <div class="review">
    <h3>Review Your Information</h3>

    <dl class="review__list">
      <dt>Name</dt>
      <dd>{{ name || '—' }}</dd>

      <dt>Email</dt>
      <dd>{{ email || '—' }}</dd>

      <dt>Role</dt>
      <dd>{{ role || '—' }}</dd>

      <dt>Interests</dt>
      <dd>{{ interests.length ? interests.join(', ') : '—' }}</dd>
    </dl>
  </div>
</template>

<style scoped>
.review__list {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 8px 16px;
}

dt {
  font-weight: bold;
  color: #555;
}

dd {
  margin: 0;
}
</style>
