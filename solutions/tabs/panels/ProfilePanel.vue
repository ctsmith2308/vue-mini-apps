<script setup lang="ts">
import { ref } from 'vue';

// This form state persists when switching tabs thanks to <KeepAlive>
const name = ref('');
const bio = ref('');
</script>

<template>
  <div class="profile-panel">
    <h3>Profile</h3>
    <p>
      <em
        >Fill this out, switch tabs, and come back — your input is preserved by
        KeepAlive.</em
      >
    </p>

    <div class="field">
      <label for="profile-name">Display Name</label>
      <input
        id="profile-name"
        v-model="name"
        type="text"
      />
    </div>

    <div class="field">
      <label for="profile-bio">Bio</label>
      <textarea
        id="profile-bio"
        v-model="bio"
        rows="3"
      />
    </div>

    <p v-if="name">
      Preview: <strong>{{ name }}</strong> — {{ bio || 'No bio yet' }}
    </p>
  </div>
</template>

<style scoped>
.field {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 12px;
}

input,
textarea {
  padding: 6px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
