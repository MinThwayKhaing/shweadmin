<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="home">
    <div class="home-content">
      <header class="home-header bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 text-slate-950 font-semibold shadow-lg">
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
export default {
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
  background-color: #f1f1f1;
  color: #000;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
}

.overview {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.card {
  background-color: #fff;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  padding: 20px;
  border-radius: 8px;
  flex: 1;
  margin-right: 10px;
}

.card:last-child {
  margin-right: 0;
}
</style>
