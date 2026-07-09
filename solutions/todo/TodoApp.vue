<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Todo, FilterStatus } from './todo.model';

const todos = ref<Map<string, Todo>>(new Map());
const todoDraft = ref('');
const filterStatus = ref<FilterStatus>('all');

const todoList = computed(() => {
  const entries = [...todos.value.entries()];

  if (filterStatus.value === 'pending') {
    return new Map(entries.filter(([_, todo]) => !todo.completed));
  }

  if (filterStatus.value === 'completed') {
    return new Map(entries.filter(([_, todo]) => todo.completed));
  }

  return todos.value;
});

const counts = computed(() => {
  let completed = 0;
  let pending = 0;

  todos.value.forEach((todo) => {
    if (todo.completed) completed++;
    else pending++;
  });

  return { all: todos.value.size, completed, pending };
});

function submitTodo() {
  const text = todoDraft.value.trim();
  if (!text) return;

  const id = crypto.randomUUID();
  todos.value.set(id, {
    id,
    description: text,
    completed: false,
    createdAt: Date.now(),
  });

  todoDraft.value = '';
}

function toggleTodoStatus(todo: Todo) {
  todos.value.set(todo.id, { ...todo, completed: !todo.completed });
}

function deleteTodo(todo: Todo) {
  todos.value.delete(todo.id);
}

const filters: FilterStatus[] = ['all', 'completed', 'pending'];
</script>

<template>
  <div class="todo-app">
    <h2>Todo App</h2>

    <!-- Add todo form -->
    <form
      class="todo-form"
      @submit.prevent="submitTodo"
    >
      <label
        for="todo-input"
        class="sr-only"
        >New todo</label
      >
      <input
        id="todo-input"
        class="todo-form__input"
        type="text"
        v-model="todoDraft"
        placeholder="What needs to be done?"
      />
      <button
        class="todo-form__submit"
        type="submit"
      >
        Add
      </button>
    </form>

    <!-- Filter tabs -->
    <div
      class="todo-filters"
      role="group"
      aria-label="Filter todos"
    >
      <button
        v-for="f in filters"
        :key="f"
        type="button"
        :class="[
          'todo-filters__btn',
          { 'todo-filters__btn--active': filterStatus === f },
        ]"
        :aria-pressed="filterStatus === f"
        @click="filterStatus = f"
      >
        {{ f }} ({{ counts[f] }})
      </button>
    </div>

    <!-- Todo list -->
    <ul
      v-if="todoList.size > 0"
      class="todo-list"
      aria-label="Todos"
    >
      <li
        v-for="[id, todo] in todoList"
        :key="id"
        :class="['todo-item', { 'todo-item--done': todo.completed }]"
      >
        <span class="todo-item__description">{{ todo.description }}</span>

        <div class="todo-item__actions">
          <button
            class="todo-item__button"
            type="button"
            :aria-label="`Mark '${todo.description}' as ${todo.completed ? 'pending' : 'complete'}`"
            @click="toggleTodoStatus(todo)"
          >
            {{ todo.completed ? 'Undo' : 'Done' }}
          </button>

          <button
            class="todo-item__button"
            type="button"
            :aria-label="`Delete '${todo.description}'`"
            @click="deleteTodo(todo)"
          >
            Delete
          </button>
        </div>
      </li>
    </ul>

    <!-- Empty state -->
    <p
      v-else
      class="todo-empty"
    >
      {{
        filterStatus === 'all'
          ? 'No todos yet — add one above.'
          : `No ${filterStatus} todos.`
      }}
    </p>
  </div>
</template>

<style scoped>
.todo-app {
  max-width: 480px;
}

/* Visually hidden but accessible to screen readers */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.todo-form {
  display: flex;
  gap: 8px;
}

.todo-form__input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.todo-form__submit {
  padding: 8px 16px;
  cursor: pointer;
}

.todo-filters {
  display: flex;
  gap: 4px;
  margin: 12px 0;
}

.todo-filters__btn {
  padding: 4px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: none;
  cursor: pointer;
  text-transform: capitalize;
}

.todo-filters__btn--active {
  background-color: #42b983;
  color: #fff;
  border-color: #42b983;
}

.todo-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.todo-list__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border: 1px solid #eee;
  border-radius: 4px;
}

.todo-list__item--done .todo-list__description {
  text-decoration: line-through;
  opacity: 0.6;
}

.todo-list__actions {
  display: flex;
  gap: 4px;
}

.todo-list__actions button {
  padding: 4px 8px;
  cursor: pointer;
  font-size: 0.85rem;
}

.todo-empty {
  color: #999;
  text-align: center;
  padding: 24px 0;
}
</style>
