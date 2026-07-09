<script setup lang="ts">
import { ref } from 'vue';

const notifications = ref(true);
const language = ref('en');
</script>

<template>
  <div class="settings-panel">
    <h3>Settings</h3>
    <p><em>These settings also persist across tab switches.</em></p>

    <div class="field">
      <label>
        <input
          type="checkbox"
          v-model="notifications"
        />
        Enable notifications
      </label>
    </div>

    <div class="field">
      <label for="settings-lang">Language</label>
      <select
        id="settings-lang"
        v-model="language"
      >
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
      </select>
    </div>

    <p>Current: notifications={{ notifications }}, language={{ language }}</p>
  </div>
</template>

<style scoped>
.field {
  margin-bottom: 12px;
}

select {
  padding: 4px 8px;
  margin-left: 8px;
}
</style>
