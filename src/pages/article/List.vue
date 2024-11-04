<!-- eslint-disable vue/multi-word-component-names -->
 
<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="articles-list">
    <h1>Articles List</h1>

    <!-- Search Box -->
    <input
      v-model="searchString"
      placeholder="Search Articles..."
      @input="loadArticles"
      class="search-box w-full max-w-md mb-4 p-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition duration-150 ease-in-out"
    />

    <!-- Pagination Controls -->
    <div class="mb-5 flex gap-5">
      <label>
        Page:
        <input class="w-16 mb-4 p-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition duration-150 ease-in-out"
         type="number" v-model.number="page" @change="loadArticles" />
      </label>
      <label>
        Page Size:
        <input class="w-16 mb-4 p-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition duration-150 ease-in-out"
         type="number" v-model.number="size" @change="loadArticles" />
      </label>
    </div>

    <section class="detailed-section">
    <table class="article-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Activity</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="article in articles" :key="article.id">
          <td>{{ article.title }}</td>
          <td>{{ article.description }}</td>
          <td>{{ article.name }}</td>
          <td>
            <div class='action-buttons'>
            <button 
              class="action-btn cursor-pointer p-2 rounded-lg mb-1 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 text-yellow-950 font-semibold shadow-xl"
              @click="viewDetails(article.id)">View Details</button>
            <button 
              class="action-btn cursor-pointer p-2 rounded-lg mb-1 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 text-yellow-950 font-semibold shadow-xl"
              @click="deleteArticle(article.id)">Delete</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </section>

    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script>
import { fetchArticles, deleteArticleService } from '../../../services/articlesService';

export default {
  data() {
    return {
      articles: [], // List of articles
      searchString: '', // Search string for filtering
      page: 0, // Current page, starting from 0 for backend pagination
      size: 10, // Page size
      loading: false,
      error: null
    };
  },
  created() {
    this.loadArticles(); // Load articles on component creation
  },
  methods: {
    async loadArticles() {
      this.loading = true;
      this.error = null;

      try {
        const response = await fetchArticles(this.searchString, this.page, this.size); // Fetch articles from service
        this.articles = response; // Set the articles state
      } catch (err) {
        this.error = err.message; // Capture error message
      } finally {
        this.loading = false; // Stop loading
      }
    },
    viewDetails(articleId) {
      this.$router.push({ name: 'article-details', params: { id: articleId } }); // Navigate to article details
    },
    async deleteArticle(articleId) {
      const confirmed = confirm('Do you want to delete this article?');
      if (confirmed) {
        try {
          await deleteArticleService(articleId); // Implement this service to delete the article
          this.loadArticles(); // Refresh the list after deletion
        } catch (err) {
          alert(err.message); // Show error message
        }
      }
    }
  }
}
</script>

<style scoped>
.articles-list {
  padding: 20px;
}

.search-box {
  margin-bottom: 20px;
  padding: 8px;
  width: 100%;
  max-width: 300px;
}

.pagination-controls {
  margin-bottom: 20px;
  display: flex;
  gap: 20px;
}


.article-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  border-radius: 8px;
  overflow: hidden; /* Ensure the rounded corners */
}

.styled-table th,
.styled-table td {
  padding: 12px;
  text-align: left;
  border: 1px solid #ddd;
}

.styled-table th {
  background-color: #a16207;
  color: #fef9c3;
  font-weight: bold;
}

.styled-table tbody tr:nth-child(odd) {
  background-color: #fff;
}

.styled-table tbody tr:nth-child(even) {
  background-color: #fef9c3;
}

.styled-table tbody tr:hover {
  background-color: #ca8a04;
  cursor: pointer;
}

.article-image {
  width: 80px; /* Adjust image size as needed */
  height: auto; /* Maintain aspect ratio */
}

.detailed-section {
  text-align: center; /* Center align the section content */
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

.action-buttons {
  display: flex; /* Use flexbox to align items */
  justify-content: center; /* Center the buttons */
  gap: 10px; /* Add some space between buttons */
}

</style>
