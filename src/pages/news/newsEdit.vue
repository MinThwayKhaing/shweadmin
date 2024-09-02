<template>
  <div class="news-details">
    <h1>News Details</h1>

    <!-- Loading, Error, and Success Messages -->
    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="success" class="success">{{ success }}</div>

    <!-- News Details Form -->
    <div v-if="newsItem" class="details-form">
      <form @submit.prevent="updateNews">
        
        <!-- Image Display -->
        <div class="form-group">
          <label>Image Preview:</label>
          <div class="image-gallery">
            <!-- Display existing images -->
            <div v-for="(image, index) in parsedImages" :key="'existing-' + index" class="image-item">
              <img
                :src="image || defaultImage"
                alt="News Image"
                class="news-image"
              />
              <button @click.prevent="removeImage(index)" class="delete-button">X</button>
            </div>
            <!-- Display new image previews -->
            <div v-for="(preview, index) in imagePreviews" :key="'new-' + index" class="image-item">
              <img
                :src="preview"
                alt="New Image Preview"
                class="news-image"
              />
              <button @click.prevent="removeNewImage(index)" class="delete-button">X</button>
            </div>
          </div>
        </div>

        <!-- Image Upload -->
        <div class="form-group">
          <label>Upload New Images:</label>
          <input type="file" @change="handleImageUpload" multiple />
        </div>

        <!-- Description Field -->
        <div class="form-group">
          <label>Description:</label>
          <textarea v-model="newsItem.description" rows="4" required></textarea>
        </div>

        <!-- Submit Button -->
        <button type="submit">Update News</button>
      </form>
    </div>
  </div>
</template>

<script>
import { getNewsById, updateNews } from '../../../services/newsService'

export default {
  data() {
    return {
      newsItem: null, // Holds the news item data
      images: [], // Holds the uploaded image files
      imagePreviews: [], // Holds the preview URLs for the new images
      deletedImages: [], // Holds URLs of images to be deleted
      loading: false, // Loading state
      error: null, // Error message
      success: null, // Success message
      defaultImage: 'https://natbounappspaces.blr1.digitaloceanspaces.com/1724150882304_image.webp', // Default image URL
    }
  },
  created() {
    this.loadNewsDetails()
  },
  computed: {
    // Parses the images from the newsItem as an array
    parsedImages() {
      return this.newsItem && this.newsItem.images ? JSON.parse(this.newsItem.images) : []
    }
  },
  methods: {
    // Loads the news details by ID
    async loadNewsDetails() {
      const { id } = this.$route.params
      if (!id) {
        this.error = 'Invalid news ID'
        return
      }
      this.loading = true
      this.error = null

      try {
        const response = await getNewsById(id)
        this.newsItem = response; 
      } catch (err) {
        this.error = 'Failed to load news details.'
      } finally {
        this.loading = false
      }
    },
    // Handles image upload and creates preview URLs
    handleImageUpload(event) {
      const files = Array.from(event.target.files)
      files.forEach(file => {
        if (file && file.type.startsWith('image/')) {
          this.images.push(file)
          this.imagePreviews.push(URL.createObjectURL(file))
        }
      })
    },
    // Removes an existing image from the preview and delete list
    removeImage(index) {
      const imageUrl = this.parsedImages[index];
      this.deletedImages.push(imageUrl); // Mark the image for deletion
      this.imagePreviews = this.imagePreviews.filter((_, i) => i !== index); // Remove from previews
      this.newsItem.images = JSON.stringify(this.parsedImages.filter((_, i) => i !== index)); // Update newsItem
    },
    // Removes a new image from the preview
    removeNewImage(index) {
      this.imagePreviews.splice(index, 1); // Remove from previews
      this.images.splice(index, 1); // Remove from files
    },
    // Updates the news item
    async updateNews() {
      const { id } = this.$route.params
      this.loading = true
      this.error = null
      this.success = null

      try {
        const formData = new FormData()

        // Append images to formData
        this.images.forEach(image => {
          formData.append('images', image)
        })

        // Append deleted images to formData
        formData.append(
          'deletedImages',
          new Blob([JSON.stringify(this.deletedImages)], { type: 'application/json' })
        )

        // Append other news details as JSON
        formData.append(
          'request',
          new Blob([JSON.stringify(this.newsItem)], { type: 'application/json' })
        )

        const response = await updateNews(id, formData)

        // Check the response status
        if (response.status === 200) {
          this.success = 'News item updated successfully!'
          this.$router.push({ name: 'newsList' }) // Redirect to news list
        } else {
          this.error = response.data
        }
      } catch (err) {
        this.error = 'Failed to update news item.'
      } finally {
        this.loading = false
      }
    }
  }
}
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

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.news-image {
  width: 120px;
  height: 120px;
  border-radius: 16px;
  object-fit: cover;
  margin-right: 10px;
  border: 1px solid #ddd;
}

.image-gallery {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  flex-wrap: wrap;
}

.image-item {
  position: relative;
}

.delete-button {
  position: absolute;
  top: 0;
  right: 0;
  background: red;
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  text-align: center;
  line-height: 24px;
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
</style>
