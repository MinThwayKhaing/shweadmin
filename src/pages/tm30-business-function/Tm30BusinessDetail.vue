<template>
  <div class="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
    <h1 class="text-2xl font-bold mb-6 text-gray-800">TM30 Business Details</h1>

    <div v-if="loading" class="loading text-center text-blue-500 font-semibold">Loading...</div>
    <div v-if="error" class="error text-center text-red-500">{{ error }}</div>
    <div v-if="success" class="success text-center text-green-500">{{ success }}</div>

    <div v-if="tm30Business" class="details-form space-y-4">

      <div class="form-group">
          <label class="block text-gray-700 font-medium mb-1">Order Id:</label>
          <input v-model="tm30Business.syskey" type="text" class="w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed" readonly />
        </div>

        <div class="form-group">
          <label class="block text-gray-700 font-medium mb-1">Period:</label>
          <input v-model="tm30Business.period" type="text" class="w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed"  readonly/>
        </div>
      <!-- Example for TM30 Business Image Display -->
      <div class="form-group">
        <label class="block text-gray-700 font-medium mb-1">Passport Preview:</label>
        <img
          :src=" imagePreview ||tm30Business.passportBio || 'https://example.com/default-business-image.jpg'"
          alt="Business Image"
          class="business-image w-full h-48 object-cover rounded-md border"
        />
      </div>

      <div class="form-group">
        <label>Visa Preview:</label>
        <img
          :src=" imagePreview ||tm30Business.visaPage || 'https://example.com/default-business-image.jpg'"
          alt="Business Image"
          class="business-image w-full h-48 object-cover rounded-md border"
        />
      </div>

      <div class="form-group">
        <label>User Name:</label>
        <input v-model="tm30Business.userName" type="text" class="w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed" readonly />
      </div>

      <div class="form-group">
        <label>Contact Number:</label>
        <input v-model="tm30Business.contactNumber" type="text" class="w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed" readonly />
      </div>

      <button @click="markAsInProgress" class="px-4 py-2 bg-yellow-500 text-yellow-950 font-semibold rounded-md hover:bg-yellow-700 transition">On Progress</button>
      <button @click="goBackHome" class="px-4 py-2 bg-yellow-500 text-yellow-950 font-semibold rounded-md hover:bg-yellow-700 transition">Go Back Home</button>
    </div>
  </div>
</template>

<script>
import { getOrderBySysKey,updateTM30Business } from '../../../services/tm30businessService'

export default {
  data() {
    return {
      tm30Business: null,
      loading: false,
      imagePreview : null,
      error: null,
      success: null // To hold the success message
    }
  },
  created() {
    this.loadBusinessDetails()
  },
  methods: {
    async loadBusinessDetails() {
      const sysKey = this.$route.params.sysKey

      console.log("SysKey is " + sysKey)
      this.loading = true
      this.error = null

      try {
        const response = await getOrderBySysKey(sysKey)
        console.log("Response is " + response.data)
        this.tm30Business = response.data
      } catch (err) {
        this.error = 'Failed to load business details.'
      } finally {
        this.loading = false
      }
    },
    goBackHome() {
      this.$router.push({ name: 'home' })
    },
    async markAsInProgress() {
      try {
        console.log("Id " + this.tm30Business.id)
        await updateTM30Business(this.tm30Business.id, 'ON_PROGRESS')
        this.success = 'Status updated to On Progress successfully.'
        setTimeout(() => {
          this.$router.push({ name: 'tm30-business-list' }) // Adjust the route name as necessary
        }, 1000) // Optional delay for user to see success message
      } catch (err) {
        this.error = `Failed to update status: ${err.message}`
      }
    }
  }
}
</script>

<style scoped>
.tm30-business-details {
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

.form-group input[type='text'] {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.business-image {
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

button {
  padding: 10px 15px;
  margin-right: 10px;
}
</style>
