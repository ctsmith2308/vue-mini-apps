<script setup lang="ts">
const props = defineProps<{
  id: string;
  isOpen: boolean;
}>();

const emit = defineEmits<{
  toggle: [id: string];
}>();

const panelId = `accordion-panel-${props.id}`;
const headerId = `accordion-header-${props.id}`;
</script>

<template>
  <div class="accordion-item">
    <h3>
      <button
        :id="headerId"
        type="button"
        class="accordion-item__trigger"
        :aria-expanded="isOpen"
        :aria-controls="panelId"
        @click="emit('toggle', id)"
      >
        <!-- Named slot for custom header content -->
        <slot name="header">Default Header</slot>

        <span class="accordion-item__icon" :class="{ 'accordion-item__icon--open': isOpen }">
          &#9656;
        </span>
      </button>
    </h3>

    <Transition name="accordion">
      <div
        v-show="isOpen"
        :id="panelId"
        role="region"
        :aria-labelledby="headerId"
        class="accordion-item__panel"
      >
        <div class="accordion-item__content">
          <!-- Default slot for body content -->
          <slot />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.accordion-item {
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
}

.accordion-item__trigger {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 12px 16px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  text-align: left;
}

.accordion-item__trigger:hover {
  background-color: #f5f5f5;
}

.accordion-item__trigger:focus-visible {
  outline: 2px solid #42b983;
  outline-offset: -2px;
}

.accordion-item__icon {
  transition: transform 0.2s ease;
  font-size: 0.8em;
}

.accordion-item__icon--open {
  transform: rotate(90deg);
}

.accordion-item__content {
  padding: 0 16px 12px;
}

/* Transition classes */
.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.25s ease;
  overflow: hidden;
}

.accordion-enter-from,
.accordion-leave-to {
  opacity: 0;
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
}

.accordion-enter-to,
.accordion-leave-from {
  opacity: 1;
  max-height: 200px;
}
</style>
