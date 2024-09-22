import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'
import About from '@/pages/About.vue'
import Home from '@/pages/Home.vue'
import { isBrowser } from '@/utils.js'

export const routes = [
    { path: '/', component: Home, },
    { path: '/about', component: About, },
]

export const router = createRouter({
    history: isBrowser ? createWebHistory() : createMemoryHistory(),
    routes,
})