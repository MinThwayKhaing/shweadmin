<template>
  <div class="visa-extension-type-edit">
    <h1>Edit Visa Extension Type</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="description">Description:</label>
        <input
          type="text"
          id="description"
          v-model="vsiaType.description"
          required
          placeholder="Enter description"
        />
      </div>
      <div class="form-group">
        <label for="price">Price:</label>
        <input
          type="number"
          id="price"
          v-model="vsiaType.price"
          required
          min="0"
          step="0.01"
          placeholder="Enter price"
        />
      </div>
      <button type="submit">Update Visa Extension Type</button>
      <button type="button" @click="goBack">Cancel</button>
    </form>
  </div>
</template>

<script>
import { getVisaExtensionTypeById, updateVisaExtensionType } from '../../../services/visaExtensionTypeService'

export default {
  name: 'VisaExtensionTypeEdit',
  data() {
    return {
      vsiaType: null
    }
  },
  async created() {
    await this.fetchVisaExtensionType()
  },
  methods: {
    async fetchVisaExtensionType() {
      
        const { id } = this.$route.params
        this.loading = true
        this.error = null
        try {
        const response = await getVisaExtensionTypeById(id)
        this.vsiaType = response.data
        } catch (err) {
        this.error = 'Failed to load visa extension details.'
        } finally {
        this.loading = false
        }
      
    },
    async submitForm() {
      try {
        const id = this.$route.params.id
        await updateVisaExtensionType(id, this.vsiaType)
        alert('Visa extension type updated successfully!')
        this.$router.push({ name: 'visa-extension-type-list' }) // Redirect to list page
      } catch (error) {
        alert('Error updating visa extension type: ' + error.message)
      }
    },
    goBack() {
      this.$router.push({ name: 'visa-extension-type-list' }) // Redirect to list page
    }
  }
}
</script>

<style scoped>
.visa-extension-type-edit {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="text"],
input[type="number"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

input[type="number"] {
  -moz-appearance: textfield; /* Hide spin buttons in Firefox */
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-right: 10px;
}

button:hover {
  background-color: #0056b3;
}

button[type="button"] {
  background-color: #6c757d;
}

button[type="button"]:hover {
  background-color: #5a6268;
}
</style>
