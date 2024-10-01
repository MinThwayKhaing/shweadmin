<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="news-details">
    <h1>News Details</h1>

    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="success" class="success">{{ success }}</div>

    <div v-if="news" class="details-form">
      <form @submit.prevent="updateNews">
        <div class="form-group">
          <label>Title:</label>
          <input v-model="news.title" required />
        </div>
        <!-- Images Display -->
        <div class="form-group">
          <label>Image Preview:</label>
          <div class="image-gallery">
            <div v-for="(image, index) in images" :key="index" class="image-item">
              <img
                :src="image.url || 'https://example.com/default-car-image.jpg'"
                alt="News Image"
                class="news-image"
              />
              <button @click.prevent="removeImage(index)" class="remove-button">✖</button>
            </div>
          </div>
        </div>

        <!-- Images Upload -->
        <div class="form-group">
          <label>Upload New Images:</label>
          <input type="file" multiple @change="handleFilesChange" />
        </div>

        <div class="form-group">
          <label>Date:</label>
          <div class="date-box">{{ formatDate(news.date) }}</div>
        </div>

        <div class="form-group">
          <label>Content:</label>
          <textarea v-model="news.description" required></textarea>
        </div>

        <button type="submit">Update News</button>
      </form>
    </div>
  </div>
</template>


<script>
import { getNewsById, updateNews } from '../../../services/newsService'; // Adjust the path based on your project structure

export default {
  data() {
    return {
      news: null,
      images: [], // To hold the uploaded images
      imagePreviews: [], // To hold image previews
      loading: false,
      error: null,
      success: null // To hold the success message
    };
  },
  created() {
    this.loadNewsDetails();
  },
  methods: {
    async loadNewsDetails() {
      const { id } = this.$route.params;
      this.loading = true;
      this.error = null;

      try {
        const response = await getNewsById(id);
        console.log('API Response Data:', response);
        this.news = response;

        // Initialize images with URLs from the backend
        const imageUrls = JSON.parse(this.news.images || '[]');
        this.images = imageUrls.map(url => ({ url }));
        this.imagePreviews = [...this.images.map(image => image.url)]; // Initialize previews
      } catch (err) {
        this.error = 'Failed to load news details.';
        console.error('Load News Details Error:', err);
      } finally {
        this.loading = false;
      }
    },formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString(undefined, options)
    },
    handleFilesChange(event) {
      const files = Array.from(event.target.files);
      files.forEach(file => {
        const url = URL.createObjectURL(file);
        this.images.push({ file, url });
        this.imagePreviews.push(url); // Update previews
      });
    },
    removeImage(index) {
      this.images.splice(index, 1);
      this.imagePreviews.splice(index, 1); // Update previews
    },
    async updateNews() {
      const { id } = this.$route.params;
      this.loading = true;
      this.error = null;
      this.success = null;

      try {
        const formData = new FormData();

    // Append all image files to the FormData object
    this.images.forEach((image) => {
      if (image.file) {
        formData.append(`images`, image.file); // 'images' is the key for the file list
      }
    });
        formData.append(
          'request',
          new Blob([JSON.stringify(this.news)], { type: 'application/json' })
        );

        const response = await updateNews(id, formData);
      console.log('response.status',response.status)
        // Check the response status
        if (response.status === 200) {
          this.success = response.data; 
          this.$router.push({ name: 'newsList' })

        } else {
          this.error = response.data; // Show the error message returned from backend
        }
      } catch (err) {
        console.log('Update News Error:', err);
        this.error = 'Failed to update news details.';
      } finally {
        this.loading = false;
      }
    }
  }
};

</script>

<style scoped>
.news-details {
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



.image-gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.image-item {
  position: relative;
}

.news-image {
  width: 120px;
  height: 120px;
  border-radius: 16px;
  object-fit: cover;
}

.remove-button {
  position: absolute;
  top: 0;
  right: 0;
  background: red;
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
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

.success {
  color: green;
  text-align: center;
  font-weight: bold;
}

.date-box {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f9f9f9;
  display: inline-block;
}
</style>

