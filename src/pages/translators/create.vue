<template>
  <div class="home">
    <SidebarNav title="Navigation" />
    <div class="home-content">
      <header class="home-header">
        <h1>Welcome to the Home Page</h1>
        <p>This is a sample home page built with Vue.js.</p>
      </header>
      <section class="home-content">
        <p>Here you can put some introductory content about your application.</p>
        <button @click="navigateToAbout">Learn More</button>
      </section>
    </div>
  </div>
</template>

<script>
import SidebarNav from '@/components/SidebarNav.vue'

export default {
  components: {
    SidebarNav
  },
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Home',
  created() {
    const token = sessionStorage.getItem('authToken')
    if (!token) {
      this.$router.push({ name: 'login' })
    }
  },
  methods: {
    navigateToAbout() {
      this.$router.push({ name: 'About' })
    }
  }
}
</script>

<style scoped>
.home {
  display: flex;
}

.home-content {
  flex-grow: 1;
  padding: 20px;
  background-color: #ecf0f1;
}

.home-header {
  background-color: #f0f0f0;
  padding: 20px;
  margin-bottom: 20px;
}

button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}

button:hover {
  background-color: #2c8c6b;
}
</style>
