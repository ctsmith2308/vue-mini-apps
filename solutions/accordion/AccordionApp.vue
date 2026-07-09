<script setup lang="ts">
import { ref } from 'vue';
import AccordionItem from './AccordionItem.vue';

interface FaqEntry {
  id: string;
  question: string;
  answer: string;
}

const props = withDefaults(
  defineProps<{
    /** When true, only one item can be open at a time */
    exclusive?: boolean;
  }>(),
  { exclusive: true },
);

const faqs: FaqEntry[] = [
  {
    id: 'reactivity',
    question: 'What is the difference between ref and reactive?',
    answer:
      'ref wraps a single value (accessed via .value), while reactive makes an entire object deeply reactive. Use ref for primitives and reactive for objects where destructuring isn\'t needed.',
  },
  {
    id: 'composables',
    question: 'What is a composable?',
    answer:
      'A composable is a function that uses Vue\'s Composition API to encapsulate and reuse stateful logic. By convention, they are named with a "use" prefix (e.g., useCounter, useFetch).',
  },
  {
    id: 'lifecycle',
    question: 'When should I use onMounted vs onUnmounted?',
    answer:
      'Use onMounted for setup that requires the DOM to be ready (e.g., measuring elements, setting up observers). Use onUnmounted for cleanup (e.g., clearing intervals, removing event listeners).',
  },
];

const openIds = ref<Set<string>>(new Set());

function handleToggle(id: string) {
  if (openIds.value.has(id)) {
    // Close this item
    const next = new Set(openIds.value);
    next.delete(id);
    openIds.value = next;
  } else if (props.exclusive) {
    // Exclusive mode: close all others, open this one
    openIds.value = new Set([id]);
  } else {
    // Multi-open mode: add this one
    openIds.value = new Set([...openIds.value, id]);
  }
}
</script>

<template>
  <div class="accordion" role="presentation">
    <h2>FAQ</h2>

    <div class="accordion__list">
      <AccordionItem
        v-for="faq in faqs"
        :key="faq.id"
        :id="faq.id"
        :is-open="openIds.has(faq.id)"
        @toggle="handleToggle"
      >
        <!-- Named slot: custom header -->
        <template #header>{{ faq.question }}</template>

        <!-- Default slot: body content -->
        <p>{{ faq.answer }}</p>
      </AccordionItem>
    </div>
  </div>
</template>

<style scoped>
.accordion {
  max-width: 600px;
}

.accordion__list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
