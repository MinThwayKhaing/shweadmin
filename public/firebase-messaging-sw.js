/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js')

// Initialize the Firebase app in the service worker
firebase.initializeApp({
  apiKey: 'AIzaSyA730H6parskRzJHYBabfW257qKipTg580',
  authDomain: 'shweapp-96bab.firebaseapp.com',
  projectId: 'shweapp-96bab',
  storageBucket: 'shweapp-96bab.appspot.com',
  messagingSenderId: '759164629817',
  appId: '1:759164629817:web:c786bd1bd00f9ba9372ee8',
  measurementId: 'G-2PYGGJ7R1R'
})

// Retrieve an instance of Firebase Messaging
const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload)

  // Customize notification here
  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo.svg'
  }

  self.registration.showNotification(notificationTitle, notificationOptions)

  // Post a message to the client
  clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage({
        type: 'SHOW_TOAST',
        title: notificationTitle,
        body: payload.notification.body
      })
    })
  })
})
