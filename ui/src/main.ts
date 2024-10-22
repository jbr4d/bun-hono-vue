import { createApp, computed } from 'vue'
import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes } from 'vue-router/auto-routes'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { createPinia } from 'pinia'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { useCookies } from '@vueuse/integrations/useCookies'
import './style.css'
import App from './App.vue'

const pinia = createPinia()

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App).use(pinia).use(router).use(VueQueryPlugin).mount('#app')

const userStore = useUserStore()

const { isAuthenticated } = storeToRefs(userStore)

// TODO: tokens verif w/ BE
const cookies = useCookies(['access_token'])

const token = cookies.get('access_token')

const loggedIn = computed(() => {
  return !!isAuthenticated.value || !!token
})

// TODO: remove api path from FE, register all routes
router.beforeEach((to) => {
  console.log('loggedIn: ' + loggedIn.value)
  console.log('token: ' + token)
  if (to.path != '/api/login' && !loggedIn.value) {
    console.log('redirect')
    return { path: '/api/login' }
  }
})
