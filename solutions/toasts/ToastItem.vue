<script setup lang="ts">
import type { Toast } from './useToast';

defineProps<{
  toast: Toast;
}>();

const emit = defineEmits<{
  dismiss: [id: string];
}>();
</script>

<template>
  <div
    :class="['toast-item', `toast-item--${toast.type}`]"
    role="alert"
    aria-live="polite"
    :aria-atomic="true"
  >
    <span class="toast-item__message">{{ toast.message }}</span>

    <button
      type="button"
      class="toast-item__close"
      aria-label="Dismiss notification"
      @click="emit('dismiss', toast.id)"
    >
      &times;
    </button>
  </div>
</template>

<style scoped>
.toast-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 6px;
  color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 250px;
  max-width: 400px;
}

.toast-item--success {
  background-color: #42b983;
}
.toast-item--error {
  background-color: #e74c3c;
}
.toast-item--info {
  background-color: #3498db;
}

.toast-item__message {
  flex: 1;
}

.toast-item__close {
  background: none;
  border: none;
  color: inherit;
  font-size: 1.3rem;
  cursor: pointer;
  padding: 0 2px;
  opacity: 0.8;
}

.toast-item__close:hover {
  opacity: 1;
}
</style>
