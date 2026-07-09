<script setup lang="ts">
// This component is loaded via defineAsyncComponent — simulates a lazy-loaded tab
const activities = [
  { id: 1, action: 'Logged in', time: '2 minutes ago' },
  { id: 2, action: 'Updated profile', time: '1 hour ago' },
  { id: 3, action: 'Changed settings', time: '3 hours ago' },
  { id: 4, action: 'Created account', time: '2 days ago' },
];
</script>

<template>
  <div class="activity-panel">
    <h3>Activity Log</h3>
    <p><em>This tab was loaded lazily with defineAsyncComponent.</em></p>

    <ul>
      <li
        v-for="item in activities"
        :key="item.id"
      >
        <strong>{{ item.action }}</strong> — {{ item.time }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

li:last-child {
  border-bottom: none;
}
</style>
