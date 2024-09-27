<template>
  <MainLayout />
</template>
<script>
import MainLayout from './components/MainLayout.vue'; // Ensure the path is correct


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
          } else {
            console.error("Unable to get permission to notify.");
          }
        });
    },


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
