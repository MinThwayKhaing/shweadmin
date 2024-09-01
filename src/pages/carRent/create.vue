<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="translator-create">
    <h1>Create New Translator</h1>

    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="success" class="success">{{ success }}</div>

    <div class="details-form">
      <form @submit.prevent="createTranslator">
        <!-- Image Upload -->
        <div class="form-group">
          <label>Upload Image:</label>
          <input type="file" @change="handleImageUpload" />
          <img
            v-if="imagePreview"
            :src="imagePreview"
            alt="Translator Image"
            class="translator-image"
          />
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

        <button type="submit">Create Translator</button>
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
