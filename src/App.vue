<template>
  <MainLayout />
  <!-- Use the layout component here -->
</template>

<script>
import MainLayout from './components/MainLayout.vue' // Ensure the path is correct

export default {
  components: {
    MainLayout
  }
}
</script>

<style>
body {
  height: 100vh;
  margin: 0;
}
#app {
  height: 100%;
}
</style>
