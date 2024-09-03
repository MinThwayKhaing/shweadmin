<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="visa-service-details">
      <h1>Visa Service Details</h1>
  
      <div v-if="loading" class="loading">Loading...</div>
      <div v-if="error" class="error">{{ error }}</div>
      <div v-if="success" class="success">{{ success }}</div>
  
      <div v-if="visaService" class="details-form">
        <form @submit.prevent="updateVisaService">
          <!-- Image Display -->
          <div class="form-group">
            <label>Image Preview:</label>
            <img
              :src="imagePreview || visaService.image || 'https://example.com/default-visa-image.jpg'"
              alt="Visa Service Image"
              class="visa-image"
            />
          </div>
  
          <!-- Image Upload -->
          <div class="form-group">
            <label>Upload New Image:</label>
            <input type="file" @change="handleImageUpload" />
          </div>
  
          <div class="form-group">
            <label>Service Name:</label>
            <input v-model="visaService.serviceName" type="text" required />
          </div>
  
          <button type="submit">Update Visa Service</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { getVisaById, updateVisaService } from '../../../services/visaService'
  
  export default {
    data() {
      return {
        visaService: null,
        image: null, // To hold the uploaded image
        imagePreview: null, // To hold the image preview URL
        loading: false,
        error: null,
        success: null // To hold the success message
      }
    },
    created() {
      this.loadVisaServiceDetails()
    },
    methods: {
      async loadVisaServiceDetails() {
        const { id } = this.$route.params
        this.loading = true
        this.error = null
  
        try {
          const response = await getVisaById(id)
          this.visaService = response.data
        } catch (err) {
          this.error = 'Failed to load visa service details.'
        } finally {
          this.loading = false
        }
      },
      handleImageUpload(event) {
        const file = event.target.files[0]
        this.image = file
        this.imagePreview = URL.createObjectURL(file)
      },
      async updateVisaService() {
        const { id } = this.$route.params
        this.loading = true
        this.error = null
        this.success = null
  
        try {
          const formData = new FormData()
          if (this.image) {
            formData.append('image', this.image)
          }
          formData.append(
            'request',
            new Blob([JSON.stringify(this.visaService)], { type: 'application/json' })
          )
  
          const response = await updateVisaService(id, formData)
  
          // Check the response status
          if (response.status === 200) {
            this.success = response.data // Show success message
            this.$router.push({ name: 'visa-service-list' }) // Correct route name
          } else {
            this.error = response.data // Show the error message returned from backend
          }
        } catch (err) {
          console.log('error:', err)
          this.error = 'Failed to update visa service details.'
        } finally {
          this.loading = false
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .visa-service-details {
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
  
  .visa-image {
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
  