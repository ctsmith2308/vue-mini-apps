<script setup lang="ts">
import { ref, computed, defineAsyncComponent, type Component } from 'vue';
import ProfilePanel from './panels/ProfilePanel.vue';
import SettingsPanel from './panels/SettingsPanel.vue';

// defineAsyncComponent — this panel is lazy-loaded only when its tab is first selected
const ActivityPanel = defineAsyncComponent(
  () => import('./panels/ActivityPanel.vue'),
);

interface TabConfig {
  id: string;
  label: string;
  component: Component;
}

const tabs: TabConfig[] = [
  { id: 'profile', label: 'Profile', component: ProfilePanel },
  { id: 'settings', label: 'Settings', component: SettingsPanel },
  { id: 'activity', label: 'Activity', component: ActivityPanel },
];

const activeTabId = ref(tabs[0].id);

const activeTab = computed(() => {
  return tabs.find((tab) => tab.id === activeTabId.value);
});

function selectTab(tab: TabConfig) {
  activeTabId.value = tab.id;
}

function handleTabKeydown(e: KeyboardEvent, index: number) {
  let nextIndex: number | null = null;

  if (e.key === 'ArrowRight') {
    nextIndex = (index + 1) % tabs.length;
  } else if (e.key === 'ArrowLeft') {
    nextIndex = (index - 1 + tabs.length) % tabs.length;
  }

  if (nextIndex !== null) {
    e.preventDefault();
    selectTab(tabs[nextIndex]);
    // Focus the new tab button
    const tabList = (e.currentTarget as HTMLElement).parentElement;
    const buttons = tabList?.querySelectorAll<HTMLElement>('[role="tab"]');
    buttons?.[nextIndex]?.focus();
  }
}
</script>

<template>
  <div class="tabs-app">
    <h2>Tabs Panel</h2>

    <!-- Tab list with ARIA roles -->
    <div
      role="tablist"
      aria-label="Account sections"
      class="tabs-app__list"
    >
      <button
        v-for="(tab, index) in tabs"
        :key="tab.id"
        role="tab"
        type="button"
        :id="`tab-${tab.id}`"
        :aria-selected="activeTabId === tab.id"
        :aria-controls="`panel-${tab.id}`"
        :tabindex="activeTabId === tab.id ? 0 : -1"
        :class="[
          'tabs-app__tab',
          { 'tabs-app__tab--active': activeTabId === tab.id },
        ]"
        @click="selectTab(tab)"
        @keydown="handleTabKeydown($event, index)"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- KeepAlive caches inactive component instances so form state survives tab switches -->
    <div
      role="tabpanel"
      :id="`panel-${activeTabId}`"
      :aria-labelledby="`tab-${activeTabId}`"
      class="tabs-app__panel"
    >
      <KeepAlive>
        <component :is="activeTab?.component" />
      </KeepAlive>
    </div>
  </div>
</template>

<style scoped>
.tabs-app {
  max-width: 500px;
}

.tabs-app__list {
  display: flex;
  border-bottom: 2px solid #ddd;
  gap: 0;
}

.tabs-app__tab {
  padding: 10px 20px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1rem;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
  color: #666;
}

.tabs-app__tab:hover {
  color: #333;
}

.tabs-app__tab--active {
  color: #42b983;
  border-bottom-color: #42b983;
}

.tabs-app__tab:focus-visible {
  outline: 2px solid #42b983;
  outline-offset: -2px;
}

.tabs-app__panel {
  padding: 16px 0;
}
</style>
