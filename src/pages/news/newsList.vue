<template>
    <div class="news-list">
      <SidebarNav />
      <h1>News List</h1>
  
      <div class="pagination-controls">
        <label>
          Page:
          <input type="number" v-model.number="page" @change="loadNews" />
        </label>
        <label>
          Page Size:
          <input type="number" v-model.number="size" @change="loadNews" />
        </label>
      </div>
  
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Created Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="newsItem in newsList" :key="newsItem.id">
            <td>{{ newsItem.description }}</td>
            <td>{{ formatDate(newsItem.createdDate) }}</td>
            <td>
              <button @click="editNews(newsItem.id)">Edit</button>
              <button @click="deleteNews(newsItem.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <div v-if="loading" class="loading">Loading...</div>
      <div v-if="error" class="error">{{ error }}</div>
      <div v-if="!loading && newsList.length === 0" class="no-data">No data available.</div>
    </div>
  </template>
  
  <script>
  import { fetchNews, deleteNews } from '../../../services/newsService';
  
  export default {
    data() {
      return {
        newsList: [],
        searchString: '',
        page: 1,
        size: 10,
        loading: false,
        error: null
      };
    },
    created() {
      this.loadNews();
    },
    methods: {
    async loadNews() {
    this.loading = true;
    this.error = null;

    try {
        this.newsList = await fetchNews(this.searchString,this.page, this.size);
        console.log("response " + this.newsList)
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
}
,formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString(undefined, options)
    },
      editNews(newsId) {
        this.$router.push({ name: 'newsEdit', params: { id: newsId } });
      },
      async deleteNews(newsId) {
        const confirmed = confirm('Do you want to delete this news item?');
        if (confirmed) {
          try {
            await deleteNews(newsId);
            alert('News item deleted successfully!');
            this.loadNews();
          } catch (err) {
            alert('Error deleting news item: ' + err.message);
          }
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .news-list {
    padding: 20px;
  }
  
  .pagination-controls {
    margin-bottom: 20px;
    display: flex;
    gap: 20px;
  }
  
  .pagination-controls label {
    display: flex;
    align-items: center;
  }
  
  .pagination-controls input {
    width: 60px;
    padding: 5px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }
  
  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  th {
    background-color: #f4f4f4;
  }
  
  button {
    margin-right: 10px;
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
  
  .no-data {
    text-align: center;
    font-weight: bold;
    color: grey;
  }
  </style>
  