<script setup lang="ts">

</script>

<template>
  <p><strong>Current route path:</strong> {{ $route.fullPath }}</p>

  <nav class="navigation">
    <RouterLink class="navigation_link" to="/">Go to Home</RouterLink>
    <RouterLink class="navigation_link" to="/todos">Go to "Todo Mini-App"</RouterLink>
  </nav>

  <main>
    <RouterView />
  </main>
</template>

<style>
.navigation {
    display: flex;
    flex-direction: row;
    gap: 10px;
    padding: 10px;
  }

a, .router-link-active {
  text-decoration: none;
  color: #333;
}

/* Style applied when the link path partially matches the URL */
.router-link-active {
  color: #42b983;
  font-weight: bold;
}

</style>

