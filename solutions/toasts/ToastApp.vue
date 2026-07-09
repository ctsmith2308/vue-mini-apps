<script setup lang="ts">
import { useToast } from './useToast';
import ToastContainer from './ToastContainer.vue';

const { addToast } = useToast();
</script>

<template>
  <div class="toast-demo">
    <h2>Toast Notifications</h2>

    <div class="toast-demo__buttons">
      <button
        type="button"
        @click="
          addToast({ message: 'Item saved successfully!', type: 'success' })
        "
      >
        Success Toast
      </button>

      <button
        type="button"
        @click="addToast({ message: 'Something went wrong.', type: 'error' })"
      >
        Error Toast (no auto-dismiss)
      </button>

      <button
        type="button"
        @click="addToast({ message: 'Here is some info.', type: 'info' })"
      >
        Info Toast
      </button>

      <button
        type="button"
        @click="
          addToast({ message: 'Quick flash!', type: 'info', duration: 1000 })
        "
      >
        1s Toast
      </button>
    </div>

    <!-- Rendered via Teleport to body -->
    <ToastContainer />
  </div>
</template>

<style scoped>
.toast-demo {
  max-width: 400px;
}

.toast-demo__buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}

button {
  padding: 8px 14px;
  cursor: pointer;
}
</style>
