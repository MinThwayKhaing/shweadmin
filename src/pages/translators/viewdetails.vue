<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="translator-details">
    <h1>Translator Details</h1>

    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="translator" class="details-form">
      <form @submit.prevent="updateTranslator">
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

        <!-- Image Upload -->
        <div class="form-group">
          <label>Upload Image:</label>
          <input type="file" @change="handleImageUpload" required />
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
      translator: null,
      image: null, // To hold the uploaded image
      loading: false,
      error: null
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
      this.image = event.target.files[0]
    },
    async updateTranslator() {
      const { id } = this.$route.params
      this.loading = true
      this.error = null

      try {
        const formData = new FormData()
        formData.append('image', this.image)
        formData.append('request', JSON.stringify(this.translator))

        await updateTranslator(id, formData)
        this.$router.push({ name: 'translator-list' })
      } catch (err) {
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
