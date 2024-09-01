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
import visaExtensionTypeCreate from '@/pages/visa-extension-type/visa-extension-type-create.vue'
import visaExtensionTypeList from '@/pages/visa-extension-type/visa-extension-type-list.vue'
import VisaExtensionTypeEdit from '@/pages/visa-extension-type/visa-extension-type-edit.vue'
import EmbassyLetterTypeCreate from '@/pages/embassy-letter-type/embassy-letter-type-create.vue'
import EmbassyLetterTypeEdit from '@/pages/embassy-letter-type/embassy-letter-type-edit.vue'
import EmbassyLetterTypeList from '@/pages/embassy-letter-type/embassy-letter-type-list.vue'
import createReport90DayVisaType from '@/pages/Report90day-visa-type/createReport90DayVisaType.vue'
import editReport90DayVisaType from '@/pages/Report90day-visa-type/editReport90DayVisaType.vue'
import listReport90DayVisaType from '@/pages/Report90day-visa-type/listReport90DayVisaType.vue'

const routes = [
  { path: '/', name: 'login', component: Login },
  { path: '/home', name: 'home', component: Home },
  { path: '/translators/create', name: 'translators-create', component: TranslatorsCreate },
  { path: '/translators/list', name: 'translators-list', component: TranslatorsList },
  { path: '/translator/:id/details', name: 'translator-details', component: ViewDetails },
  { path: '/carrent/list', name: 'car-rent-details', component: CarRentList },
  { path: '/carrent/create', name: 'car-rent-create', component: CarRentCreate },
  { path: '/carrent/:id/details', name: 'car-details', component: CarViewDetails }
  { path: '/visa-extension-type/create', name: 'visa-extension-type-create', component: visaExtensionTypeCreate },
  { path: '/visa-extension-type/list', name: 'visa-extension-type-list', component: visaExtensionTypeList },
  { path: '/visa-extension-type/edit', name: 'visa-extension-type-edit', component: VisaExtensionTypeEdit },
  { path: '/embassy-letter-type/create', name: 'embassy-letter-type-create', component: EmbassyLetterTypeCreate },
  { path: '/embassy-letter-type/edit', name: 'embassy-letter-type-edit', component: EmbassyLetterTypeEdit },
  { path: '/embassy-letter-type/list', name: 'embassy-letter-type-list', component: EmbassyLetterTypeList },
  { path: '/Report90day-visa-type/create', name: 'createReport90DayVisaType', component: createReport90DayVisaType },
  { path: '/Report90day-visa-type/list', name: 'listReport90DayVisaType', component: listReport90DayVisaType },
  { path: '/Report90day-visa-type/edit', name: 'editReport90DayVisaType', component: editReport90DayVisaType }
  

  

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router