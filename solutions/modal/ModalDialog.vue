<script setup lang="ts">
import { watch, useTemplateRef } from 'vue';

const open = defineModel<boolean>({ default: false });

defineProps<{
  title: string;
}>();

const dialogRef = useTemplateRef<HTMLDialogElement>('dialog');

// Native <dialog> requires imperative .showModal() / .close() calls
watch(open, (isOpen) => {
  const el = dialogRef.value;
  if (!el) return;

  if (isOpen) {
    el.showModal();
  } else {
    el.close();
  }
});

// Sync the model when the user closes via Escape (native behavior)
function handleClose() {
  open.value = false;
}

// Close on backdrop click — native dialog treats backdrop as part of the element
function handleClick(e: MouseEvent) {
  const el = dialogRef.value;
  if (e.target === el) {
    open.value = false;
  }
}
</script>

<template>
  <!-- No Teleport needed — .showModal() renders on the browser's top layer -->
    <dialog
      ref="dialog"
      :aria-labelledby="'modal-title'"
      class="modal-dialog"
      @close="handleClose"
      @click="handleClick"
    >
      <header class="modal-dialog__header">
        <h2 id="modal-title">{{ title }}</h2>
        <button
          type="button"
          class="modal-dialog__close"
          aria-label="Close dialog"
          @click="open = false"
        >
          &times;
        </button>
      </header>

      <div class="modal-dialog__body">
        <slot :close="() => (open = false)" />
      </div>

      <footer v-if="$slots.footer" class="modal-dialog__footer">
        <slot name="footer" :close="() => (open = false)" />
      </footer>
    </dialog>
</template>

<style scoped>
.modal-dialog {
  border: none;
  border-radius: 8px;
  padding: 0;
  min-width: 320px;
  max-width: 90vw;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

/* Native dialog provides ::backdrop for free when using .showModal() */
.modal-dialog::backdrop {
  background: rgba(0, 0, 0, 0.5);
}

.modal-dialog__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #eee;
}

.modal-dialog__header h2 {
  margin: 0;
  font-size: 1.2rem;
}

.modal-dialog__close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0 4px;
  line-height: 1;
}

.modal-dialog__body {
  padding: 20px;
}

.modal-dialog__footer {
  padding: 12px 20px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
</style>
