import { createRouter, createWebHistory } from 'vue-router'
import Login from '../pages/login.vue'
import Home from '../pages/home.vue'
import TranslatorsCreate from '../pages/translators/Create.vue'
import TranslatorsList from '../pages/translators/List.vue'
import ViewDetails from '../pages/translators/viewdetails.vue'
// Import other components for Car and Visa Services

const routes = [
  { path: '/', name: 'login', component: Login },
  { path: '/home', name: 'home', component: Home },
  { path: '/translators/create', name: 'translators-create', component: TranslatorsCreate },
  { path: '/translators/list', name: 'translators-list', component: TranslatorsList },
  { path: '/translator/:id/details', name: 'translator-details', component: ViewDetails }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
