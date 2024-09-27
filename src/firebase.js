// src/firebase.js
import { initializeApp } from 'firebase/app'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA730H6parskRzJHYBabfW257qKipTg580',
  authDomain: 'shweapp-96bab.firebaseapp.com',
  projectId: 'shweapp-96bab',
  storageBucket: 'shweapp-96bab.appspot.com',
  messagingSenderId: '759164629817',
  appId: '1:759164629817:web:c786bd1bd00f9ba9372ee8',
  measurementId: 'G-2PYGGJ7R1R'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const messaging = getMessaging(app)

// Function to show toast notifications
const showToast = (title, body) => {
  toast(`${title}: ${body}`, {
    autoClose: 5000, // Duration for toast notification
    position: toast.POSITION.TOP_RIGHT
  })
}

// Handle incoming messages
onMessage(messaging, (payload) => {
  console.log('Message received: ', payload)
  // Check if the payload contains a notification
  if (payload.notification) {
    showToast(payload.notification.title, payload.notification.body)
  }
})

export { messaging, getToken }
