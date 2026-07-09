<script setup lang="ts">
import { ref, computed, useTemplateRef } from 'vue';
import PersonalInfoStep from './steps/PersonalInfoStep.vue';
import PreferencesStep from './steps/PreferencesStep.vue';
import ReviewStep from './steps/ReviewStep.vue';

// Form data — passed to steps via defineModel
const formData = ref({
  name: '',
  email: '',
  role: '',
  interests: [] as string[],
});

const submitted = ref(false);

// Step definitions
const steps = [
  { label: 'Personal Info', component: PersonalInfoStep },
  { label: 'Preferences', component: PreferencesStep },
  { label: 'Review', component: ReviewStep },
];

const currentStepIndex = ref(0);
const currentStep = computed(() => steps[currentStepIndex.value]);
const isFirst = computed(() => currentStepIndex.value === 0);
const isLast = computed(() => currentStepIndex.value === steps.length - 1);

// Template ref to the current step component — used to call validate()
const stepRef = useTemplateRef<{ validate: () => boolean }>('currentStep');

function goBack() {
  if (!isFirst.value) {
    currentStepIndex.value--;
  }
}

function goNext() {
  // Call the step's exposed validate() before advancing
  if (stepRef.value?.validate()) {
    currentStepIndex.value++;
  }
}

function handleSubmit() {
  if (stepRef.value?.validate()) {
    submitted.value = true;
    console.log('Form submitted:', formData.value);
  }
}
</script>

<template>
  <div class="wizard">
    <h2>Multi-Step Form</h2>

    <div
      v-if="submitted"
      class="wizard__success"
      role="alert"
    >
      <h3>Submitted!</h3>
      <p>
        Thanks, {{ formData.name }}. Check the console for the full payload.
      </p>
      <button
        type="button"
        @click="
          submitted = false;
          currentStepIndex = 0;
        "
      >
        Start Over
      </button>
    </div>

    <template v-else>
      <!-- Step indicator -->
      <nav
        class="wizard__steps"
        aria-label="Form progress"
      >
        <span
          v-for="(step, i) in steps"
          :key="i"
          :class="[
            'wizard__step-indicator',
            {
              'wizard__step-indicator--active': i === currentStepIndex,
              'wizard__step-indicator--done': i < currentStepIndex,
            },
          ]"
          :aria-current="i === currentStepIndex ? 'step' : undefined"
        >
          {{ i + 1 }}. {{ step.label }}
        </span>
      </nav>

      <!-- Active step component -->
      <div class="wizard__body">
        <component
          :is="currentStep.component"
          ref="currentStep"
          v-model:name="formData.name"
          v-model:email="formData.email"
          v-model:role="formData.role"
          v-model:interests="formData.interests"
        />
      </div>

      <!-- Navigation -->
      <div class="wizard__nav">
        <button
          type="button"
          @click="goBack"
          :disabled="isFirst"
        >
          Back
        </button>

        <button
          v-if="!isLast"
          type="button"
          @click="goNext"
        >
          Next
        </button>

        <button
          v-else
          type="button"
          @click="handleSubmit"
          style="font-weight: bold"
        >
          Submit
        </button>
      </div>
    </template>
  </div>
</template>

<style scoped>
.wizard {
  max-width: 480px;
}

.wizard__steps {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
}

.wizard__step-indicator {
  color: #999;
  font-size: 0.9rem;
}

.wizard__step-indicator--active {
  color: #42b983;
  font-weight: bold;
}

.wizard__step-indicator--done {
  color: #333;
}

.wizard__body {
  min-height: 200px;
}

.wizard__nav {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding-top: 12px;
  border-top: 1px solid #eee;
}

button {
  padding: 8px 20px;
  cursor: pointer;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.wizard__success {
  text-align: center;
  padding: 32px 0;
}
</style>
