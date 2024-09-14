// Import the functions you need from the SDKs
import { initializeApp } from 'firebase/app'

import { getMessaging, getToken, onMessage } from 'firebase/messaging'

// Firebase configuration object
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

// Initialize Firebase Cloud Messaging and request notification permission
const messaging = getMessaging(app)

// Function to request notification permission and get the Firebase token
export const requestNotificationPermission = async () => {
  try {
    // Request permission to send notifications
    await Notification.requestPermission()
    console.log('Notification permission granted.')

    // Get the Firebase token for messaging
    const token = await getToken(messaging, {
      vapidKey:
        ' BJYXln9oYd2v5NJReG-Buks8eEI9AZjfVy3Qt0HOHuGUuqtyI20W9Q8ChKVOq3UuogzsgAQ_TgsSzKFJ7ld64iw ' // Add your Firebase VAPID key here
    })

    if (token) {
      console.log('Firebase Token:', token)
      return token // You can send this token to your Spring Boot server
    } else {
      console.log('No registration token available. Request permission to generate one.')
    }
  } catch (err) {
    console.error('Error getting notification token:', err)
  }
}

// Handle incoming messages when the web app is open
onMessage(messaging, (payload) => {
  console.log('Message received: ', payload)
  // You can display the notification here in your Vue.js app UI
})

export default app
