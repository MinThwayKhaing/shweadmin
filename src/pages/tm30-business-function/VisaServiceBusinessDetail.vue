<template>
  <div class="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
    <h1 class="text-2xl font-bold mb-6 text-gray-800">Visa Service Business Details</h1>

    <div v-if="loading"  class="loading text-center text-blue-500 font-semibold">Loading...</div>
    <div v-if="error" class="error text-center text-red-500">{{ error }}</div>
    <div v-if="success" class="success text-center text-green-500">{{ success }}</div>

    <div v-if="visaService" class="details-form space-y-4">
      <div class="form-group">
          <label class="block text-gray-700 font-medium mb-1">Order Id:</label>
          <input v-model="visaService.order_id" type="text" class="w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed" readonly />
        </div>

        <div class="form-group">
          <label class="block text-gray-700 font-medium mb-1">Visa Type:</label>
          <input v-model="visaService.visaType" type="text" class="w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed"  readonly/>
        </div>
      
      <div class="form-group">
        <label class="block text-gray-700 font-medium mb-1">Passport Bio:</label>
        <img
          :src=" imagePreview || visaService.passportBio || 'https://example.com/default-business-image.jpg'"
          alt="Business Image"
          class="business-image w-full h-48 object-cover rounded-md border"
        />
      </div>

      <div class="form-group">
        <label class="block text-gray-700 font-medium mb-1">Visa Preview:</label>
        <img
          :src=" imagePreview ||visaService.visaPage || 'https://example.com/default-business-image.jpg'"
          alt="Business Image"
          class="business-image w-full h-48 object-cover rounded-md border"
        />
      </div>

      <div class="form-group">
        <label class="block text-gray-700 font-medium mb-1">User Name:</label>
        <input v-model="visaService.userName" type="text" class="w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed" readonly />
      </div>

      <div class="form-group">
        <label class="block text-gray-700 font-medium mb-1">Contact Number:</label>
        <input v-model="visaService.contactNumber" type="text" class="w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed" readonly />
      </div>

      <div class="form-group">
        <label class="block text-gray-700 font-medium mb-1">Status:</label>
        <input v-model="visaService.status" type="text" class="w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed" readonly />
      </div>

      <div class="flex space-x-4">
        <button @click="markAsInProgress" class="px-4 py-2 bg-yellow-500 text-yellow-950 font-semibold rounded-md hover:bg-yellow-700 transition">On Progress</button>
        <button @click="goBackHome" class="px-4 py-2 bg-yellow-500 text-yellow-950 font-semibold rounded-md hover:bg-yellow-700 transition">Go Back Home</button>
      </div>
      
    </div>
  </div>
</template>

<script>
import {getVisaServiceSysKey, updateVisaServiceBusiness} from '../../../services/visaService.js'

export default {
  data() {
    return {
      visaService: null,
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
      const sysKey = this.$route.params.sysKey;
      

      console.log("SysKey is " + sysKey)
      this.loading = true
      this.error = null

      try {
        const response = await getVisaServiceSysKey(sysKey)
        console.log("Response is " + response.data)
        this.visaService = response.data
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
        await updateVisaServiceBusiness(this.visaService.id, 'ON_PROGRESS')
        this.success = 'Status updated to On Progress successfully.'
        setTimeout(() => {
          this.$router.push({ name: 'visaService-business-details' }) // Adjust the route name as necessary
        }, 1000) // Optional delay for user to see success message
      } catch (err) {
        this.error = `Failed to update status: ${err.message}`
      }
    }
  }
}
</script>

<style scoped>
.visaservice-business-details {
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

