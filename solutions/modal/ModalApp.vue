<script setup lang="ts">
import { ref } from 'vue';
import ModalDialog from './ModalDialog.vue';

const showConfirm = ref(false);
const showInfo = ref(false);
</script>

<template>
  <div class="modal-demo">
    <h2>Modal Dialog</h2>

    <div class="modal-demo__buttons">
      <button
        type="button"
        @click="showConfirm = true"
      >
        Open Confirm Modal
      </button>
      <button
        type="button"
        @click="showInfo = true"
      >
        Open Info Modal
      </button>
    </div>

    <!-- Confirm modal — uses footer scoped slot to get close() -->
    <ModalDialog
      v-model="showConfirm"
      title="Confirm Action"
    >
      <template #default="{ close }">
        <p>Are you sure you want to proceed? This action cannot be undone.</p>
        <p><em>(Try pressing Escape or clicking the backdrop to close)</em></p>
      </template>

      <template #footer="{ close }">
        <button
          type="button"
          @click="close"
        >
          Cancel
        </button>
        <button
          type="button"
          @click="close"
          style="font-weight: bold"
        >
          Confirm
        </button>
      </template>
    </ModalDialog>

    <!-- Info modal — default slot only, no footer -->
    <ModalDialog
      v-model="showInfo"
      title="Information"
    >
      <p>This modal has no footer slot, so no footer is rendered.</p>
      <p>
        The modal uses <code>&lt;Teleport to="body"&gt;</code> — inspect the DOM
        to see it rendered outside the component tree.
      </p>
    </ModalDialog>
  </div>
</template>

<style scoped>
.modal-demo {
  max-width: 480px;
}

.modal-demo__buttons {
  display: flex;
  gap: 12px;
  margin-top: 12px;
}

button {
  padding: 8px 16px;
  cursor: pointer;
}
</style>
