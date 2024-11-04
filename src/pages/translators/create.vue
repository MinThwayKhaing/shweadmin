<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="translator-create">
    <h1 class="text-2xl font-bold mb-4">Create New Translator</h1>

    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error text-red-500 mb-4">{{ error }}</div>
    <div v-if="success" class="success text-green-500 mb-4">{{ success }}</div>

    <div class="details-form">
      <form @submit.prevent="createTranslator">
        <!-- Image Upload -->
        <div class="form-group mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">Upload Image:</label>
          <input type="file" @change="handleImageUpload" class="cursor-pointer p-2 rounded-lg mb-1 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 text-yellow-950 font-semibold shadow-xl" />
          <img
            v-if="imagePreview"
            :src="imagePreview"
            alt="Translator Image"
            class="translator-image mt-2"
          />
        </div>

        <div class="form-group mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">Name:</label>
          <input v-model="translator.name" type="text" required class="cursor-pointer p-2 rounded-lg mb-1 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 text-yellow-950 font-semibold shadow-xl" />
        </div>
        <div class="form-group mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">Phone Number:</label>
          <input v-model="translator.phoneNumber" type="text" required class="cursor-pointer p-2 rounded-lg mb-1 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 text-yellow-950 font-semibold shadow-xl" />
        </div>
        <div class="form-group mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">Language:</label>
          <select v-model="translator.language" required class="cursor-pointer p-2 rounded-lg mb-1 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 text-yellow-950 font-semibold shadow-xl">
            <option value="" disabled>Select Language</option>
            <option value="Thai">Thai</option>
            <option value="English">English</option>
            <option value="Chinese">Chinese</option>
          </select>
        </div>

        <div class="form-group mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">Specialist:</label>
          <select v-model="translator.specialist" required class="cursor-pointer p-2 rounded-lg mb-1 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 text-yellow-950 font-semibold shadow-xl">
            <option value="" disabled>Select Specialist</option>
            <option value="hospital">Hospital</option>
            <option value="travel & shopping">Travel & Shopping</option>
            <option value="police case">Police Case</option>
            <option value="court">Court</option>
            <option value="business">Business</option>
            <option value="government office & immigration">Government office & Immigration</option>
          </select>
        </div>

        <button type="submit" class="cursor-pointer p-2 rounded-lg mb-1 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 text-yellow-950 font-semibold shadow-xl">
          Create Translator
        </button>
      </form>
    </div>
  </div>
</template>



<script>
import { saveTranslator } from '../../../services/translatorService'

export default {
  data() {
    return {
      translator: {
        name: '',
        language: '',
        specialist: ''
      },
      image: null, // To hold the uploaded image
      imagePreview: null, // To hold the image preview URL
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
    async createTranslator() {
      this.loading = true
      this.error = null
      this.success = null

      try {
        const formData = new FormData()
        formData.append('image', this.image)
        formData.append(
          'request',
          new Blob([JSON.stringify(this.translator)], { type: 'application/json' })
        )

        const response = await saveTranslator(formData)

        if (response.status === 200) {
          this.success = response.data // Show success message
          this.$router.push({ name: 'translators-list' }) // Redirect to list
        } else {
          this.error = response.data // Show the error message returned from backend
        }
      } catch (err) {
        console.log('error:', err)
        this.error = 'Failed to create translator.'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.translator-create {
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

.form-group input,
.form-group select {
  width: 100%;
  max-width: 300px; /* Adjust the max-width as needed */
  padding: 8px;
  box-sizing: border-box;
}

.translator-image {
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

