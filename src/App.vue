<template>
  <MainLayout />
</template>
<script>
import MainLayout from './components/MainLayout.vue'; // Ensure the path is correct
import { messaging, getToken } from './firebase'; // Import messaging and necessary functions

export default {
  components: {
    MainLayout
  },
  mounted() {
    this.requestNotificationPermission();
    navigator.serviceWorker.addEventListener('message', this.handleServiceWorkerMessage);
  },
  beforeUnmount() {
    navigator.serviceWorker.removeEventListener('message', this.handleServiceWorkerMessage);
  },
  methods: {
    requestNotificationPermission() {
      Notification.requestPermission()
        .then((permission) => {
          if (permission === "granted") {
            console.log("Notification permission granted.");
            this.getToken();
          } else {
            console.error("Unable to get permission to notify.");
          }
        });
    },
    getToken() {
      getToken(messaging, { vapidKey: 'BJYXln9oYd2v5NJReG-Buks8eEI9AZjfVy3Qt0HOHuGUuqtyI20W9Q8ChKVOq3UuogzsgAQ_TgsSzKFJ7ld64iw' })
        .then((currentToken) => {
          if (currentToken) {
            console.log("Token received:", currentToken);
            // You can send the token to your server or save it for later use
          } else {
            console.error('No registration token available. Request permission to generate one.');
          }
        })
        .catch((err) => {
          console.error('An error occurred while retrieving token. ', err);
        });
    }

  }
}
</script>


<style>
body {
  height: 100vh;
  width: 100vw;
  margin: 0;
}
#app {
  height: 100vh;
  width: 100vw;
}
</style>
