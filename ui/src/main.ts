import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { createPinia } from 'pinia'
import './style.css'

import App from './App.vue'

const pinia = createPinia()

const router = createRouter({
    history: createWebHistory(),
    routes,
  })

createApp(App)
    .use(router)
    .use(VueQueryPlugin)
    .use(pinia)
    .mount('#app')