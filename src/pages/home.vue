<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="home">
    <SidebarNav />
    <div class="home-content">
      <header class="home-header">
        <h1>Hello, {{ userName }}!</h1>
        <p>{{ currentDate }}</p>
      </header>
      <section class="overview">
        <div class="card" v-for="card in overviewCards" :key="card.title">
          <h3>{{ card.title }}</h3>
          <p>{{ card.value }}</p>
          <p>{{ card.subtext }}</p>
        </div>
      </section>
      <section class="detailed-section">
        <!-- Add detailed sections here -->
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
  data() {
    return {
      userName: 'Faiqoh Brilanti',
      currentDate: 'Tuesday, 5 June 2024',
      overviewCards: [
        { title: 'Walking', value: '1,167 steps', subtext: 'Yesterday was 1,181 steps' },
        {
          title: 'Stretching',
          value: '12 minutes',
          subtext: 'Yesterday was 15 minutes of stretching'
        },
        { title: 'Running', value: '4.0 miles', subtext: 'Yesterday was 3.2 miles in 30 minutes' }
      ]
    }
  }
}
</script>

<style scoped>
.home {
  height: 100%;
  display: flex;
}

.home-content {
  flex-grow: 1;
  padding: 20px;
  background-color: #fff;
}

.home-header {
  background-color: #f9f9f9;
  padding: 20px;
  margin-bottom: 20px;
}

.overview {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.card {
  background-color: #f1f1f1;
  padding: 20px;
  border-radius: 8px;
  flex: 1;
  margin-right: 10px;
}

.card:last-child {
  margin-right: 0;
}
</style>
