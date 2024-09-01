<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="car-details">
    <h1>Car Details</h1>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="car">
      <p><strong>Car Name:</strong> {{ car.carName }}</p>
      <p><strong>Owner Name:</strong> {{ car.ownerName }}</p>
      <p><strong>Car Number:</strong> {{ car.carNo }}</p>
      <p><strong>Status:</strong> {{ car.status ? 'Active' : 'Inactive' }}</p>
      <p><strong>License:</strong> {{ car.license }}</p>
      <p><strong>Driver Name:</strong> {{ car.driverName }}</p>
      <p><strong>Driver Phone Number:</strong> {{ car.driverPhoneNumber }}</p>
      <p><strong>Car Color:</strong> {{ car.carColor }}</p>
      <p><strong>Car Type:</strong> {{ car.carType }}</p>
      <img :src="car.image" alt="Car Image" class="car-image" />
    </div>
  </div>
</template>

<script>
import { getCarById } from '../../../services/carRentService'

export default {
  data() {
    return {
      car: null,
      loading: false,
      error: null
    }
  },
  created() {
    this.loadCarDetails()
  },
  methods: {
    async loadCarDetails() {
      this.loading = true
      this.error = null
      const { id } = this.$route.params // Assuming the car ID is passed as a route param

      try {
        const response = await getCarById(id)
        this.car = response.data
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to load car details.'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.car-details {
  padding: 20px;
}

.car-image {
  max-width: 100%;
  height: auto;
}

.loading {
  text-align: center;
  font-weight: bold;
}

.error {
  color: red;
  text-align: center;
  font-weight: bold;
}
</style>
