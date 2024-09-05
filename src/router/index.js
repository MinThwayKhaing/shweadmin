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
import visaExtensionTypeEdit from '@/pages/visa-extension-type/visa-extension-type-edit.vue'
import visaExtensionTypeList from '@/pages/visa-extension-type/visa-extension-type-list.vue'
import EmbassyLetterTypeCreate from '@/pages/embassy-letter-type/embassy-letter-type-create.vue'
import EmbassyLetterTypeEdit from '@/pages/embassy-letter-type/embassy-letter-type-edit.vue'
import EmbassyLetterTypeList from '@/pages/embassy-letter-type/embassy-letter-type-list.vue'
import createReport90DayVisaType from '@/pages/Report90day-visa-type/createReport90DayVisaType.vue'
import editReport90DayVisaType from '@/pages/Report90day-visa-type/editReport90DayVisaType.vue'
import listReport90DayVisaType from '@/pages/Report90day-visa-type/listReport90DayVisaType.vue'
import tm30businesslist from '@/pages/tm30-business-function/List.vue'
import translatorBusinessDetail from '@/pages/tm30-business-function/TranslatorDetail.vue'
import carBusinessDetail from '@/pages/tm30-business-function/CarRentDetail.vue'
import tm30BusinessDetail from '@/pages/tm30-business-function/Tm30BusinessDetail.vue'
import visaServiceBusinessDetail from '@/pages/tm30-business-function/VisaServiceBusinessDetail.vue'
import report90DaysBusinessDetail from '@/pages/tm30-business-function/Report90DaysBusinessDetail.vue'
import embassyBusinessDetail from '@/pages/tm30-business-function/EmbassyBusinessDetail.vue'
import newsCreate from '@/pages/news/newsCreate.vue'
import newsEdit from '@/pages/news/newsEdit.vue'
import newsList from '@/pages/news/newsList.vue'
import report90daybusinesslist from '@/pages/report90day-business-function/List.vue'
import embassyletterbusinesslist from '@/pages/embassy-letter-business-function/List.vue'
import visaServiceCreate from '@/pages/visa-service/visa-service-create.vue'
import visaServiceList from '@/pages/visa-service/visa-service-list.vue'
import visaServiceEdit from '@/pages/visa-service/visa-service-edit.vue'

const routes = [
  { path: '/', name: 'login', component: Login, meta: { hideSidebar: true } },
  { path: '/home', name: 'home', component: Home },
  { path: '/translators/create', name: 'translators-create', component: TranslatorsCreate },
  { path: '/translators/list', name: 'translators-list', component: TranslatorsList },
  { path: '/translator/:id/details', name: 'translator-details', component: ViewDetails },
  { path: '/carrent/list', name: 'car-rent-list', component: CarRentList },
  { path: '/carrent/create', name: 'car-rent-create', component: CarRentCreate },
  { path: '/carrent/:id/details', name: 'car-details', component: CarViewDetails },
  {
    path: '/visa-extension-type/create',
    name: 'visa-extension-type-create',
    component: visaExtensionTypeCreate
  },
  {
    path: '/visa-extension-type/list',
    name: 'visa-extension-type-list',
    component: visaExtensionTypeList
  },
  {
    path: '/visa-extension-type/edit',
    name: 'visa-extension-type-edit',
    component: visaExtensionTypeEdit
  },
  {
    path: '/embassy-letter-type/create',
    name: 'embassy-letter-type-create',
    component: EmbassyLetterTypeCreate
  },
  {
    path: '/embassy-letter-type/edit',
    name: 'embassy-letter-type-edit',
    component: EmbassyLetterTypeEdit
  },
  {
    path: '/embassy-letter-type/list',
    name: 'embassy-letter-type-list',
    component: EmbassyLetterTypeList
  },
  {
    path: '/Report90day-visa-type/create',
    name: 'createReport90DayVisaType',
    component: createReport90DayVisaType
  },
  {
    path: '/Report90day-visa-type/list',
    name: 'listReport90DayVisaType',
    component: listReport90DayVisaType
  },
  {
    path: '/Report90day-visa-type/edit',
    name: 'editReport90DayVisaType',
    component: editReport90DayVisaType
  },
  {
    path: '/tm30businesslist',
    name: 'tm30-business-list',
    component: tm30businesslist
  },
  {
    path: '/tm30business/:sysKey/translator-business-detail',
    name: 'translator-business-details',
    component: translatorBusinessDetail
  },
  {
    path: '/tm30business/:sysKey/car-business-detail',
    name: 'car-details',
    component: carBusinessDetail
  },
  {
    path: '/tm30business/:sysKey/tm30-business-detail',
    name: 'tm30-business-details',
    component: tm30BusinessDetail
  },
  {
    path: '/tm30business/:sysKey/report90Days-business-detail',
    name: 'report90Days-business-details',
    component: report90DaysBusinessDetail
  },
  {
    path: '/tm30business/:sysKey/visaService-business-detail',
    name: 'visaService-business-details',
    component: visaServiceBusinessDetail
  },
  {
    path: '/tm30business/:sysKey/embassy-business-detail',
    name: 'embassy-business-details',
    component: embassyBusinessDetail
  },
  {
    path: '/news/create',
    name: 'newsCreate',
    component: newsCreate
  },
  {
    path: '/news/edit',
    name: 'newsEdit',
    component: newsEdit
  },
  {
    path: '/news/list',
    name: 'newsList',
    component: newsList
  },
  {
    path: '/report90daybusinesslist',
    name: 'report90day-business-list',
    component: report90daybusinesslist
  },
  {
    path: '/embassyletterbusinesslist',
    name: 'embassyletter-business-list',
    component: embassyletterbusinesslist
  },
  {
    path: '/visa/create',
    name: 'visa-service-create',
    component: visaServiceCreate
  },
  {
    path: '/visa/list',
    name: 'visa-service-list',
    component: visaServiceList
  },
  {
    path: '/visa/eidt',
    name: 'visa-service-edit',
    component: visaServiceEdit
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
