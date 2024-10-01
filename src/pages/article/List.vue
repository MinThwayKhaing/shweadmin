<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="articles-list">
    <h1>Articles List</h1>

    <!-- Search Box -->
    <input
      v-model="searchString"
      placeholder="Search Articles..."
      @input="loadArticles"
      class="search-box"
    />

    <!-- Pagination Controls -->
    <div class="pagination-controls">
      <label>
        Page:
        <input type="number" v-model.number="page" @change="loadArticles" />
      </label>
      <label>
        Page Size:
        <input type="number" v-model.number="size" @change="loadArticles" />
      </label>
    </div>

    <table class="styled-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Image</th>
          <th>Activity</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="article in articles" :key="article.id">
          <td>{{ article.title }}</td>
          <td>{{ article.description }}</td>
          <td>
            <img :src="article.imageUrl" alt="Article Image" class="article-image" />
          </td>
          <td>{{ article.activity.name }}</td>
          <td>
            <button 
              class="px-4 py-2 bg-orange-500 text-white rounded-lg border border-transparent shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-150 ease-in-out"
              @click="viewDetails(article.id)">View Details</button>
            <button 
              class="px-4 py-2 bg-red-500 text-white rounded-lg border border-transparent shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-150 ease-in-out"
              @click="deleteArticle(article.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script>
import { fetchArticles,deleteArticleService } from '../../../services/articlesService';

export default {
  data() {
    return {
      articles: [], // List of articles
      searchString: '', // Search string for filtering
      page: 1, // Current page
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
        this.articles = await fetchArticles(this.searchString, this.page, this.size); // Fetch articles from service
        console.log(' this.articles', this.articles)
      } catch (err) {
        this.error = err.message; // Capture error message
        console.log(err.message);
      } finally {
        this.loading = false; // Stop loading
      }
    },
    viewDetails(articleId) {
      console.log("Navigating with articleId: ", articleId);
      this.$router.push({ name: 'article-details', params: { id: articleId } }); // Navigate to article details
    },
    async deleteArticle(articleId) {
      const confirmed = confirm('Do you want to delete this article?');
      if (confirmed) {
        try {
          // Call delete service for the article here
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

.styled-table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  background-color: #fff;
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
