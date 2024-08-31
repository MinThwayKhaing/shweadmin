<template>
  <div class="visa-extension-type-create">
    <h1>Create Visa Extension Type</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="description">Description:</label>
        <input
          type="text"
          id="description"
          v-model="form.description"
          required
          placeholder="Enter description"
        />
      </div>
      <div class="form-group">
        <label for="price">Price:</label>
        <input
          type="number"
          id="price"
          v-model="form.price"
          required
          min="0"  
          step="0.01" 
          placeholder="Enter price"
        />
      </div>
      <button type="submit">Save Visa Type</button>
      <button type="button"  @click="goHome">Cancel</button>
    </form>
  </div>
</template>

<script>
import { createVisaExtensionType } from '../../../services/visaExtensionTypeService'

export default {
  name: 'VisaExtensionTypeCreate',
  data() {
    return {
      form: {
        description: '',
        price: 0
      }
    }
  },
  methods: {
    async submitForm() {
      try {
        const formData = {
          description: this.form.description,
          price: this.form.price
        }
        await createVisaExtensionType(formData)
        alert('Visa type saved successfully!')
        this.$router.push({ name: 'visa-extension-type-list' }) // Redirect to list page
      } catch (error) {
        alert('Error saving visa type: ' + error.message)
      }
    },
    goHome() {
      // Redirect to home page
      this.$router.push({ name: 'home' })
    }
  }
  
}
</script>

<style scoped>
.visa-extension-type-create {
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
  margin-right: 10px; /* Add margin to the right of each button */
}

button:hover {
  background-color: #0056b3;
}
</style>
