import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // Import router from the new folder
import { createPinia } from 'pinia'

// Create the Pinia store instance
const pinia = createPinia()

// Create the Vue app instance and use the router and Pinia store
const app = createApp(App).use(router).use(pinia)

// Mount the app to the DOM
app.mount('#app')
