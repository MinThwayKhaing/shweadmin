<template>
  <div class="tm30-business-details">
    <h1>TM30 Business Details</h1>

    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="success" class="success">{{ success }}</div>

    <div v-if="tm30Business" class="details-form">

      <div class="form-group">
          <label>Order Id:</label>
          <input v-model="tm30Business.syskey" type="text" readonly />
        </div>

        <div class="form-group">
          <label>Period:</label>
          <input v-model="tm30Business.period" type="text"  readonly/>
        </div>
      <!-- Example for TM30 Business Image Display -->
      <div class="form-group">
        <label>Passport Preview:</label>
        <img
          :src=" imagePreview ||tm30Business.passportBio || 'https://example.com/default-business-image.jpg'"
          alt="Business Image"
          class="business-image"
        />
      </div>

      <div class="form-group">
        <label>Visa Preview:</label>
        <img
          :src=" imagePreview ||tm30Business.visaPage || 'https://example.com/default-business-image.jpg'"
          alt="Business Image"
          class="business-image"
        />
      </div>

      <div class="form-group">
        <label>User Name:</label>
        <input v-model="tm30Business.userName" type="text" readonly />
      </div>

      <div class="form-group">
        <label>Contact Number:</label>
        <input v-model="tm30Business.contactNumber" type="text" readonly />
      </div>

      <button @click="markAsInProgress">On Progress</button>
      <button @click="goBackHome">Go Back Home</button>
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
