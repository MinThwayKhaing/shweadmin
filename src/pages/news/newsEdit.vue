<template>
  <div class="document-detail">
    <h1>Document Detail</h1>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div class="images-container" v-if="images.length > 0">
      <img v-for="(image, index) in images" :key="index" :src="image" class="document-image" />
    </div>
  </div>
</template>

<script>
import { getDocumentsBySyskey } from '../../../services/tm30businessService'

export default {
  data() {
    return {
      images: [],
      loading: false,
      error: null
    }
  },
  created() {
    this.fetchDocuments()
  },
  methods: {
    async fetchDocuments() {
      this.loading = true
      this.error = null
      try {
        const { syskey } = this.$route.params
        const response = await getDocumentsBySyskey(syskey)
        this.images = response.data
      } catch (err) {
        this.error = err.response && err.response.data ? err.response.data : err.message
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.document-detail {
  padding: 20px;
}

.loading,
.error {
  text-align: center;
  font-weight: bold;
}

.images-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.document-image {
  max-width: 200px;
  max-height: 200px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
