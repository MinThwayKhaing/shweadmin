<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="translator-details">
    <h1>Translator Details</h1>

    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="success" class="success">{{ success }}</div>

    <div v-if="translator" class="details-form">
      <form @submit.prevent="updateTranslator">
        <!-- Image Display -->
        <div class="form-group">
          <label>Image Preview:</label>
          <img
            :src="
              imagePreview ||
              translator.image ||
              'https://natbounappspaces.blr1.digitaloceanspaces.com/1724150882304_image.webp'
            "
            alt="Translator Image"
            class="translator-image"
          />
        </div>

        <!-- Image Upload -->
        <div class="form-group">
          <label>Upload New Image:</label>
          <input type="file" @change="handleImageUpload" />
        </div>
        <div class="form-group">
          <label>Name:</label>
          <input v-model="translator.name" type="text" required />
        </div>
        <div class="form-group">
          <label>Language:</label>
          <input v-model="translator.language" type="text" required />
        </div>
        <div class="form-group">
          <label>Specialist:</label>
          <input v-model="translator.specialist" type="text" required />
        </div>

        <button type="submit">Update Translator</button>
      </form>
    </div>
  </div>
</template>

<script>
import { getTranslatorById, updateTranslator } from '../../../services/translatorService'

export default {
  data() {
    return {
      form: {
        translator: null,
        image: null, // To hold the uploaded image
        imagePreview: null, // To hold the image preview URL
        loading: false,
        error: null,
        success: null // To hold the success message
      }
      
    }
  },
  created() {
    this.loadTranslatorDetails()
  },
  methods: {
    async loadTranslatorDetails() {
      const { id } = this.$route.params
      this.loading = true
      this.error = null

      try {
        const response = await getTranslatorById(id)
        this.translator = response.data
      } catch (err) {
        this.error = 'Failed to load translator details.'
      } finally {
        this.loading = false
      }
    },
    handleImageUpload(event) {
      const file = event.target.files[0]
      this.image = file
      this.imagePreview = URL.createObjectURL(file)
    },
    async updateTranslator() {
      const { id } = this.$route.params
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

        const response = await updateTranslator(id, formData)

        // Check the response status
        if (response.status === 200) {
          this.success = response.data // Show success message
          this.$router.push({ name: 'translators-list' }) // Correct route name
        } else {
          this.error = response.data // Show the error message returned from backend
        }
      } catch (err) {
        console.log('error:', err)
        this.error = 'Failed to update translator details.'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.translator-details {
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

.form-group input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.translator-image {
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
