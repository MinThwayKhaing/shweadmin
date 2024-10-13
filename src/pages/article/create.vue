<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="create-article">
    <h1>Create Article</h1>

    <form @submit.prevent="createArticle">
      <div class="form-group">
        <label>Article Title:</label>
        <input v-model="article.title" placeholder="Article Title" class="cursor-pointer p-2 rounded-lg mb-1 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 text-yellow-950 font-semibold shadow-xl" required/>
      </div>

      <div class="form-group">
          <label>Activity:</label>
          <select v-model="article.activity_id" class="cursor-pointer p-2 rounded-lg mb-1 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 text-yellow-950 font-semibold shadow-xl" required>
            <option disabled value="">Select an activity</option>
            <option v-for="activity in activities" :key="activity.id" :value="activity.id">
              {{ activity.name }}
            </option>
          </select>
        </div>

      <div class="form-group">
        <label>Article Description:</label>
        <input v-model="article.description" placeholder="Article Description" class="cursor-pointer p-2 rounded-lg mb-1 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 text-yellow-950 font-semibold shadow-xl" required>
      </div>

      <div class="form-group">
        <label>Upload Images:</label>
        <button type="button" class="custom-file-upload" @click="$refs.fileInput.click()">Choose Files</button>
        <input type="file" ref="fileInput" @change="handleFilesChange" multiple/>
        <ul class="file-list">
          <li v-for="(file, index) in files" :key="index" class="file-item">
            {{ file.name }}
            <button type="button" @click="removeFile(index)" class="remove-file">×</button>
          </li>
        </ul>
      </div>

      <button type="submit">Create Article</button>
    </form>

    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="success" class="success">{{ success }}</div>
  </div>
</template>

<script>
import { saveArticles,fetchActivities } from '../../../services/articlesService';

export default {
  data() {
    return {
      article: {
        title: '',
        description: '',
      },
      files: [],
      activities: [],
      loading: false,
      error: null,
      success: null,
    };
  },
  created() {
    this.loadActivities(); // Fetch activities on component mount
  },
  methods: {
    async loadActivities() {
      try {
        this.activities = await fetchActivities('', 0, 100); // Adjust pagination as needed
      } catch (err) {
        console.error('Error fetching activities:', err);
        this.error = 'Failed to load activities.';
      }
    },
    handleFilesChange(event) {
      this.files = [...this.files, ...Array.from(event.target.files)];
    },
    removeFile(index) {
      this.files.splice(index, 1);
    },
    async createArticle() {
      this.loading = true;
      this.error = null;
      this.success = null;

      try {
        const formData = new FormData();
        formData.append('request', new Blob([JSON.stringify(this.article)], { type: 'application/json' }));

        this.files.forEach((file) => {
          formData.append('images', file);
        });

        await saveArticles(formData);

        alert('Article saved successfully!');
        this.$router.push({ name: 'article-list' });
      } catch (err) {
        this.error = 'Failed to create article.';
        console.error('Error:', err);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.create-article {
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

textarea {
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
}

input[type='file'] {
  margin-top: 10px;
}

.file-list {
  list-style-type: none;
  padding: 0;
  margin: 10px 0;
}

.file-item {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.file-item + .file-item {
  margin-top: 5px;
}

.remove-file {
  margin-left: 10px;
  background: none;
  border: none;
  color: red;
  font-size: 20px;
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

input[type="file"] {
  display: none;
}
</style>
