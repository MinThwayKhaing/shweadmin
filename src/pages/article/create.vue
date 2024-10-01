<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="article-create">
    <h1>Create New Article</h1>

    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="success" class="success">{{ success }}</div>

    <div class="details-form">
      <form @submit.prevent="createArticles">
        <!-- Image Upload -->
        <div class="form-group">
          <label>Upload Articles Image:</label>
          <input type="file" @change="handleImageUpload" />
          <img v-if="imagePreview" :src="imagePreview" alt="Articles Image" class="car-image" />
        </div>

        <!-- Activity Dropdown -->
        <div class="form-group">
          <label>Activity:</label>
          <select v-model="articles.activity_id" required>
            <option disabled value="">Select an activity</option>
            <option v-for="activity in activities" :key="activity.id" :value="activity.id">
              {{ activity.name }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label>Title:</label>
          <input v-model="articles.title" type="text" required />
        </div>

        <div class="form-group">
          <label>Description:</label>
          <textarea v-model="articles.description" required></textarea>
        </div>
        
        <button type="submit">Create Articles</button>
      </form>
    </div>
  </div>
</template>

<script>

import { saveArticles,fetchActiities } from '../../../services/articlesService';

export default {
  data() {
    return {
      articles: {
        title: '',
        description: '',
        activity_id: 0 // Initialize with default value
      },
      activities: [], // To hold the list of activities
      image: null,
      imagePreview: null,
      loading: false,
      error: null,
      success: null // To hold the success message
    }
  },
  created() {
    this.loadActivities(); // Fetch activities on component mount
  },
  methods: {
    async loadActivities() {
      try {
        this.activities = await fetchActiities('', 0, 100); // Adjust pagination as needed
      } catch (err) {
        console.error('Error fetching activities:', err);
        this.error = 'Failed to load activities.';
      }
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      this.image = file;
      this.imagePreview = URL.createObjectURL(file);
    },
    async createArticles() {
      this.loading = true;
      this.error = null;
      this.success = null;

      try {
        const formData = new FormData();
        formData.append('image', this.image);
        formData.append(
          'request',
          new Blob([JSON.stringify(this.articles)], { type: 'application/json' })
        );

        const response = await saveArticles(formData);

        if (response.status === 200) {
          this.success = response.data; // Show success message
          this.$router.push({ name: 'article-list' }); // Redirect to list
        } else {
          this.error = response.data; // Show the error message returned from backend
        }
      } catch (err) {
        console.log('error:', err);
        this.error = 'Failed to create article.';
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
.car-rent-create {
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

.car-image {
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
