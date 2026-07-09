import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '@/pages/landing-page.vue';
import TodoPage from '@/pages/todo-page.vue';
import AccordionPage from '@/pages/accordion-page.vue';
import TabsPage from '@/pages/tabs-page.vue';
import ModalPage from '@/pages/modal-page.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: LandingPage },
    { path: '/todos', component: TodoPage },
    { path: '/accordion', component: AccordionPage },
    { path: '/tabs', component: TabsPage },
    { path: '/modal', component: ModalPage },
  ],
});

export { router };
