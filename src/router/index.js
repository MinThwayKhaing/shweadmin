import { createRouter, createWebHistory } from 'vue-router'
import Login from '../pages/login.vue'
import Home from '../pages/home.vue'
import TranslatorsCreate from '../pages/translators/create.vue'
import TranslatorsList from '../pages/translators/List.vue'
import ViewDetails from '../pages/translators/viewdetails.vue'
import CarRentList from '../pages/carRent/List.vue'
import CarRentCreate from '../pages/carRent/create.vue'
import CarViewDetails from '../pages/carRent/viewdetails.vue'
// Import other components for Car and Visa Services

const routes = [
  { path: '/', name: 'login', component: Login },
  { path: '/home', name: 'home', component: Home },
  { path: '/translators/create', name: 'translators-create', component: TranslatorsCreate },
  { path: '/translators/list', name: 'translators-list', component: TranslatorsList },
  { path: '/translator/:id/details', name: 'translator-details', component: ViewDetails },
  { path: '/carrent/list', name: 'car-rent-details', component: CarRentList },
  { path: '/carrent/create', name: 'car-rent-create', component: CarRentCreate },
  { path: '/carrent/:id/details', name: 'car-details', component: CarViewDetails }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
