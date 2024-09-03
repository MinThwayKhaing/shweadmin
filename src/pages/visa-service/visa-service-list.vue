<template>
    <div class="visa-service-list">
      <h1>Visa Services List</h1>
  
      <div class="visa-service-container">
        <div v-for="visa in visaServices" :key="visa.id" class="visa-service-card">
          <img
            :src="visa.image || 'https://example.com/default-visa-image.jpg'"
            alt="Visa Service Image"
            class="visa-photo"
          />
          <p>{{ visa.serviceName }}</p>
          <div class="button-group">
          <button @click="editVisaService(visa.id)">Edit</button>
          <button @click="deleteType(visa.id)">Delete</button>
        </div>
        </div>
      </div>
  
      <div v-if="loading" class="loading">Loading...</div>
      <div v-if="error" class="error">{{ error }}</div>
    </div>
  </template>
  
  <script>
  import { fetchAllVisa,deleteVisa } from '../../../services/visaService'
  
  export default {
    data() {
      return {
        visaServices: [],
        loading: false,
        error: null,
      }
    },
    created() {
      this.loadVisaServices()
    },
    methods: {
      async loadVisaServices() {
        this.loading = true
        this.error = null
  
        try {
          this.visaServices = await fetchAllVisa()
        } catch (err) {
          this.error = err.message
        } finally {
          this.loading = false
        }
      },
      async deleteType(id) {
      if (confirm('Are you sure you want to delete this visa extension type?')) {
        try {
          await deleteVisa(id)
          this.fetchVisaExtensionTypes() // Refresh the list after deletion
          alert('Visa extension type deleted successfully!')
        } catch (error) {
          alert('Error deleting visa extension type: ' + error.message)
        }
      }
    },
      editVisaService(id) {
        this.$router.push({ name: 'visa-service-edit', params: { id } })
      }
    }
  }
  </script>
  
  <style scoped>
  .visa-service-list {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
  }
  
  .visa-service-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  
  .visa-service-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 10px;
    max-width: 250px;
    text-align: center;
  }

  .button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
  
  .visa-photo {
    width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 10px;
  }
  
  button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
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
  