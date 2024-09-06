<template>
  <div class="document-detail">
    <h1>Document Detail</h1>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div class="images-container" v-if="images.length > 0">
      <img v-for="(image, index) in images" :key="index" :src="image" class="document-image" />
    </div>
    <div v-else>No images found</div>
  </div>
</template>


<script>
import { getDocumentsBySyskey } from '../../../services/tm30businessService';

export default {
  data() {
    return {
      images: [],
      loading: false,
      error: null
    };
  },
  created() {
    this.fetchDocuments();
  },
  methods: {
    async fetchDocuments() {
      this.loading = true;
      this.error = null;
      try {
        const { sysKey } = this.$route.params;
        const response = await getDocumentsBySyskey(sysKey);
        console.log('Raw API Response:', response.data); // Log raw API response for debugging

        // Extract image URLs from the response
        if (response.data.length > 0) {
          // Assuming response.data[0].image is a JSON string
          const imageString = response.data[0].image;
          const parsedImages = JSON.parse(imageString);
          console.log('Parsed Images:', parsedImages); // Log parsed images array for debugging
          this.images = parsedImages;
        } else {
          this.images = [];
        }
      } catch (err) {
        this.error = err.response && err.response.data ? err.response.data : err.message;
        console.error('Error fetching documents:', this.error); // Log error for debugging
      } finally {
        this.loading = false;
      }
    }
  }
};
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
  flex-direction: column; /* Stack images vertically */
  gap: 15px; /* Space between images */
}

.document-image {
  width: 80%; /* Width relative to the container */
  height: auto; /* Maintain aspect ratio */
  max-height: 400px; /* Limit maximum height */
  object-fit: cover; /* Ensures images fit within the specified dimensions */
  border: 1px solid #ddd;
  border-radius: 8px; /* Slightly larger border radius */
}
</style>

