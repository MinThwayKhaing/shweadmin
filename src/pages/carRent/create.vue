<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="car-rent-create">
    <h1>Create New Car Rent</h1>

    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="success" class="success">{{ success }}</div>

    <div class="details-form">
      <form @submit.prevent="createCarRent">
        <!-- Image Upload -->
        <div class="form-group">
          <label>Upload Car Image:</label>
          <input type="file" @change="handleImageUpload" />
          <img v-if="imagePreview" :src="imagePreview" alt="Car Image" class="car-image" />
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
          <div class="radio-group">
            <label v-for="option in carTypeOptions" :key="option" class="radio-label">
              <input type="radio" v-model="carRent.carType" :value="option" required />
              {{ option }}
            </label>
          </div>
        </div>

        <button type="submit">Create Car Rent</button>
      </form>
    </div>
  </div>
</template>

<script>
import { saveCarRent } from '../../../services/carRentService'

export default {
  data() {
    return {
      carRent: {
        carName: '',
        ownerName: '',
        carNo: '',
        status: false,
        license: '',
        review: '',
        driverName: '',
        driverPhoneNumber: '',
        carColor: '',
        carType: null
      },
      carTypeOptions: [2, 4, 6, 78, 9, 11],
      image: null, // To hold the uploaded car image
      imagePreview: null, // To hold the car image preview URL
      loading: false,
      error: null,
      success: null // To hold the success message
    }
  },
  methods: {
    handleImageUpload(event) {
      const file = event.target.files[0]
      this.image = file
      this.imagePreview = URL.createObjectURL(file)
    },
    async createCarRent() {
      this.loading = true
      this.error = null
      this.success = null

      try {
        const formData = new FormData()
        formData.append('image', this.image)
        formData.append(
          'dto',
          new Blob([JSON.stringify(this.carRent)], { type: 'application/json' })
        )

        const response = await saveCarRent(formData)

        if (response.status === 200) {
          this.success = response.data // Show success message
          this.$router.push({ name: 'car-rent-list' }) // Redirect to list
        } else {
          this.error = response.data // Show the error message returned from backend
        }
      } catch (err) {
        console.log('error:', err)
        this.error = 'Failed to create car rent.'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.car-rent-create {
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
.radio-group {
  display: flex;
  flex-wrap: wrap;
}

.radio-label {
  margin-right: 10px; /* Adds some spacing between the radio buttons */
  display: flex;
  align-items: center;
}
.car-image {
  width: 120px;
  height: 120px;
  border-radius: 16px;
  object-fit: cover;
  margin-top: 10px;
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
