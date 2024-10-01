<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="car-rent-details">
    <h1>Car Rent Details</h1>

    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="success" class="success">{{ success }}</div>

    <div v-if="carRent" class="details-form">
      <form @submit.prevent="updateCarRent">
        <!-- Image Display -->
        <div class="form-group">
          <label>Image Preview:</label>
          <img
            :src="imagePreview || carRent.image || 'https://example.com/default-car-image.jpg'"
            alt="Car Image"
            class="car-image"
          />
        </div>

        <!-- Image Upload -->
        <div class="form-group">
          <label>Upload New Image:</label>
          <input type="file" @change="handleImageUpload" />
        </div>

        <div class="form-group">
          <label>Car Name:</label>
          <input v-model="carRent.carName" type="text" required />
        </div>

        <div class="form-group">
          <label>Owner Name:</label>
          <input v-model="carRent.ownerName" type="text" required />
        </div>

        <div class="form-group">
          <label>Car Number:</label>
          <input v-model="carRent.carNo" type="text" required />
        </div>

        <div class="form-group">
          <label>Status:</label>
          <input v-model="carRent.status" type="checkbox" />
        </div>

        <div class="form-group">
          <label>License:</label>
          <input v-model="carRent.license" type="text" required />
        </div>

        <div class="form-group">
          <label>Review:</label>
          <input v-model="carRent.review" type="text" />
        </div>

        <div class="form-group">
          <label>Driver Name:</label>
          <input v-model="carRent.driverName" type="text" />
        </div>

        <div class="form-group">
          <label>Driver Phone Number:</label>
          <input v-model="carRent.driverPhoneNumber" type="text" />
        </div>

        <div class="form-group">
          <label>Car Color:</label>
          <input v-model="carRent.carColor" type="text" required />
        </div>

        <div class="form-group">
          <label>Car Type:</label>
          <input v-model="carRent.carType" type="number" required />
        </div>

        <button type="submit">Update Car Rent</button>
      </form>
    </div>
  </div>
</template>

<script>
import { getCarById, updateCarRent } from '../../../services/carRentService'

export default {
  data() {
    return {
      carRent: null,
      image: null, // To hold the uploaded image
      imagePreview: null, // To hold the image preview URL
      loading: false,
      error: null,
      success: null // To hold the success message
    }
  },
  created() {
    this.loadCarRentDetails()
  },
  methods: {
    async loadCarRentDetails() {
      const { id } = this.$route.params
      this.loading = true
      this.error = null

      try {
        const response = await getCarById(id)
        this.carRent = response.data
      } catch (err) {
        this.error = 'Failed to load car rent details.'
      } finally {
        this.loading = false
      }
    },
    handleImageUpload(event) {
      const file = event.target.files[0]
      this.image = file
      this.imagePreview = URL.createObjectURL(file)
    },
    async updateCarRent() {
      const { id } = this.$route.params
      this.loading = true
      this.error = null
      this.success = null

      try {
        const formData = new FormData()
        formData.append('image', this.image)
        formData.append(
          'request',
          new Blob([JSON.stringify(this.carRent)], { type: 'application/json' })
        )

        const response = await updateCarRent(id, formData)

        // Check the response status
        if (response.status === 200) {
          this.success = response.data // Show success message
          this.$router.push({ name: 'car-rent-list' }) // Correct route name
        } else {
          this.error = response.data // Show the error message returned from backend
        }
      } catch (err) {
        console.log('error:', err)
        this.error = 'Failed to update car rent details.'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.car-rent-details {
  padding: 20px;
}

.details-form {
  margin-top: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input[type='text'],
.form-group input[type='number'] {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.car-image {
  width: 120px;
  height: 120px;
  border-radius: 16px;
  object-fit: cover;
  margin-bottom: 15px;
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

.success {
  color: green;
  text-align: center;
  font-weight: bold;
}
</style>
