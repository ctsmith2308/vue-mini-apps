import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '@/pages/landing-page.vue'
import TodoPage from '@/pages/todo-page.vue'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: LandingPage },
    { path: '/todos', component: TodoPage },
    // { path: '/portfolio', component: PortfolioPage },
  ],
})

export { router }