<script setup lang="ts">
import { ref } from 'vue';

const name = defineModel<string>('name', { default: '' });
const email = defineModel<string>('email', { default: '' });

const errors = ref<Record<string, string>>({});

// Exposed to parent so it can call validate() before advancing
defineExpose({
  validate(): boolean {
    errors.value = {};

    if (!name.value.trim()) {
      errors.value.name = 'Name is required';
    }

    if (!email.value.trim()) {
      errors.value.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      errors.value.email = 'Enter a valid email address';
    }

    return Object.keys(errors.value).length === 0;
  },
});
</script>

<template>
  <fieldset>
    <legend>Personal Information</legend>

    <div class="field">
      <label for="personal-name">Full Name</label>
      <input
        id="personal-name"
        v-model="name"
        type="text"
        :aria-invalid="!!errors.name"
        :aria-describedby="errors.name ? 'name-error' : undefined"
      />
      <p
        v-if="errors.name"
        id="name-error"
        class="field__error"
        role="alert"
      >
        {{ errors.name }}
      </p>
    </div>

    <div class="field">
      <label for="personal-email">Email</label>
      <input
        id="personal-email"
        v-model="email"
        type="email"
        :aria-invalid="!!errors.email"
        :aria-describedby="errors.email ? 'email-error' : undefined"
      />
      <p
        v-if="errors.email"
        id="email-error"
        class="field__error"
        role="alert"
      >
        {{ errors.email }}
      </p>
    </div>
  </fieldset>
</template>

<style scoped>
fieldset {
  border: none;
  padding: 0;
}

legend {
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 12px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 16px;
}

input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

input[aria-invalid='true'] {
  border-color: #e74c3c;
}

.field__error {
  color: #e74c3c;
  font-size: 0.85rem;
  margin: 0;
}
</style>
