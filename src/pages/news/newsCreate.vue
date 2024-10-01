<template>
    <div class="create-news">
      <h1>Create News</h1>
  
      <form @submit.prevent="createNews">
        <div class="form-group">
          <label>News Title:</label>
          <input v-model="news.title" placeholder="News Title" required/>
        </div>

        <div class="form-group">
          <label>News Description:</label>
          <textarea v-model="news.description" placeholder="News Description" required></textarea>
        </div>
  
        <div class="form-group">
  <label>Upload Images:</label>
  <button type="button" class="custom-file-upload" @click="$refs.fileInput.click()">
    Choose Files
  </button>
  <input type="file" ref="fileInput" @change="handleFilesChange" multiple />
  <ul class="file-list">
    <li v-for="(file, index) in files" :key="index" class="file-item">
      {{ file.name }}
      <button type="button" @click="removeFile(index)" class="remove-file">×</button>
    </li>
  </ul>
</div>

  
        <button type="submit">Create News</button>
      </form>
  
      <div v-if="loading" class="loading">Loading...</div>
      <div v-if="error" class="error">{{ error }}</div>
      <div v-if="success" class="success">{{ success }}</div>
    </div>
  </template>
  
  <script>
  import { saveNews } from '../../../services/newsService';
  
  export default {
    data() {
      return {
        news: {
          title: '',
          description: '',
        },
        files: [],
        loading: false,
        error: null,
        success: null, // To hold the success message
      };
    },
    methods: {
      handleFilesChange(event) {
        this.files = [...this.files, ...Array.from(event.target.files)];
      },
      removeFile(index) {
        this.files.splice(index, 1);
      },
      async createNews() {
        this.loading = true;
        this.error = null;
        this.success = null;
  
        try {
          const formData = new FormData();
          formData.append(
            'request',
            new Blob([JSON.stringify(this.news)], { type: 'application/json' })
          );
  
          this.files.forEach((file) => {
            formData.append('images', file);
          });
  
          await saveNews(formData);
  
          alert('News saved successfully!')
          this.$router.push({ name: 'newsList' })
        } catch (err) {
          this.error = 'Failed to create news.';
          console.error('Error:', err);
        } finally {
          this.loading = false;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .create-news {
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
  display: none; /* Hide the default file input */
}

  </style>
  