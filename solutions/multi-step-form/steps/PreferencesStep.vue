<script setup lang="ts">
import { ref } from 'vue';

const role = defineModel<string>('role', { default: '' });
const interests = defineModel<string[]>('interests', { default: () => [] });

const errors = ref<Record<string, string>>({});

const interestOptions = ['Frontend', 'Backend', 'DevOps', 'Design', 'Data'];

function toggleInterest(interest: string) {
  const current = interests.value;
  if (current.includes(interest)) {
    interests.value = current.filter((i) => i !== interest);
  } else {
    interests.value = [...current, interest];
  }
}

defineExpose({
  validate(): boolean {
    errors.value = {};

    if (!role.value) {
      errors.value.role = 'Please select a role';
    }

    if (interests.value.length === 0) {
      errors.value.interests = 'Select at least one interest';
    }

    return Object.keys(errors.value).length === 0;
  },
});
</script>

<template>
  <fieldset>
    <legend>Preferences</legend>

    <div class="field">
      <label for="pref-role">Role</label>
      <select
        id="pref-role"
        v-model="role"
        :aria-invalid="!!errors.role"
        :aria-describedby="errors.role ? 'role-error' : undefined"
      >
        <option
          value=""
          disabled
        >
          Choose a role
        </option>
        <option value="developer">Developer</option>
        <option value="designer">Designer</option>
        <option value="manager">Manager</option>
      </select>
      <p
        v-if="errors.role"
        id="role-error"
        class="field__error"
        role="alert"
      >
        {{ errors.role }}
      </p>
    </div>

    <div class="field">
      <span id="interests-label">Interests</span>
      <div
        role="group"
        :aria-labelledby="'interests-label'"
        :aria-describedby="errors.interests ? 'interests-error' : undefined"
        class="checkbox-group"
      >
        <label
          v-for="opt in interestOptions"
          :key="opt"
        >
          <input
            type="checkbox"
            :checked="interests.includes(opt)"
            @change="toggleInterest(opt)"
          />
          {{ opt }}
        </label>
      </div>
      <p
        v-if="errors.interests"
        id="interests-error"
        class="field__error"
        role="alert"
      >
        {{ errors.interests }}
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

select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.checkbox-group label {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
}

.field__error {
  color: #e74c3c;
  font-size: 0.85rem;
  margin: 0;
}
</style>
