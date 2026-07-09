<script setup lang="ts">
import { useToast } from './useToast';
import ToastItem from './ToastItem.vue';

const { toasts, removeToast } = useToast();
</script>

<template>
  <Teleport to="body">
    <div
      class="toast-container"
      aria-label="Notifications"
    >
      <TransitionGroup name="toast">
        <ToastItem
          v-for="toast in toasts"
          :key="toast.id"
          :toast="toast"
          @dismiss="removeToast"
        />
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.toast-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column-reverse;
  gap: 8px;
  z-index: 2000;
}

/* TransitionGroup classes */
.toast-enter-active {
  transition: all 0.3s ease;
}

.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

/* Ensure smooth reflow when items are removed */
.toast-move {
  transition: transform 0.3s ease;
}
</style>
