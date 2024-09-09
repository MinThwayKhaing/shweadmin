<template>
  <div class="report90day-business-details">
    <h1>Report 90 Day Business Details</h1>

    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="success" class="success">{{ success }}</div>

    <div v-if="report90Day" class="details-form">
      <div class="form-group">
          <label>Order Id:</label>
          <input v-model="report90Day.order_id" type="text" readonly />
        </div>

        <div class="form-group">
          <label>VisaType:</label>
          <input v-model="report90Day.visaType" type="text"  readonly/>
        </div>
      
      <div class="form-group">
        <label>Passport Bio:</label>
        <img
          :src=" imagePreview ||report90Day.passportBio || 'https://example.com/default-business-image.jpg'"
          alt="Business Image"
          class="business-image"
        />
      </div>

      <div class="form-group">
        <label>Visa Preview:</label>
        <img
          :src=" imagePreview ||report90Day.visaPage || 'https://example.com/default-business-image.jpg'"
          alt="Business Image"
          class="business-image"
        />
      </div>

      <div class="form-group">
        <label>User Name:</label>
        <input v-model="report90Day.userName" type="text" readonly />
      </div>

      <div class="form-group">
        <label>Contact Number:</label>
        <input v-model="report90Day.contactNumber" type="text" readonly />
      </div>

      <div class="form-group">
        <label>Status:</label>
        <input v-model="report90Day.status" type="text" readonly />
      </div>

      <button @click="markAsInProgress">On Progress</button>
      <button @click="goBackHome">Go Back Home</button>
    </div>
  </div>
</template>

<script>
import { getReport90DayOrderBySysKey, update90DayReportBusiness} from '../../../services/90DayReportbusinessService.js'

export default {
  data() {
    return {
      report90Day: null,
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
        const response = await getReport90DayOrderBySysKey(sysKey)
        console.log("Response is " + response.data)
        this.report90Day = response.data
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
        await update90DayReportBusiness(this.report90Day.id, 'ON_PROGRESS')
        this.success = 'Status updated to On Progress successfully.'
        setTimeout(() => {
          this.$router.push({ name: 'report90Days-business-details' }) // Adjust the route name as necessary
        }, 1000) // Optional delay for user to see success message
      } catch (err) {
        this.error = `Failed to update status: ${err.message}`
      }
    }
  }
}
</script>

<style scoped>
.report90day-business-details {
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
