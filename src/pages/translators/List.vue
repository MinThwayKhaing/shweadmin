<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="translators-list">
    <SidebarNav />
    <h1 class="text-2xl text-black">Translator List</h1>

    <!-- Search Box -->
    <input
      v-model="searchString"
      placeholder="Search translators..."
      @input="loadTranslators"
      class="search-box w-full max-w-md mb-4 p-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition duration-150 ease-in-out"
    />

    <!-- Pagination Controls -->
    <div class="mb-5 flex gap-5">
      <label>
        Page:
        <input class="w-16 mb-4 p-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition duration-150 ease-in-out"
         type="number" v-model.number="page" @change="loadTranslators" />
      </label>
      <label>
        Page Size:
        <input class="w-16 mb-4 p-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition duration-150 ease-in-out"
         type="number" v-model.number="size" @change="loadTranslators" />
      </label>
    </div>
    <section class="detailed-section">
      <table class='translator-table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Language</th>
            <th>Specialist</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="translator in translators" :key="translator.id">
            <td>{{ translator.name }}</td>
            <td>{{ translator.language }}</td>
            <td>{{ translator.specialist }}</td>
            <td>
              <div class='action-buttons'>
                <button @click.stop="viewDetails(translator.id)" class="action-btn cursor-pointer p-2 rounded-lg mb-1 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 text-yellow-950 font-semibold shadow-xl">
                  View Details
                </button>
                <button @click.stop="deleteTranslator(translator.id)" class="action-btn cursor-pointer p-2 rounded-lg mb-1 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 text-yellow-950 font-semibold shadow-xl">
                  Delete
                </button>
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
import { fetchTranslators, deleteTranslator } from '../../../services/translatorService'

export default {
  data() {
    return {
      translators: [],
      searchString: '', // Initialize the search string
      page: 1, // Current page
      size: 10, // Page size
      loading: false,
      error: null
    }
  },
  created() {
    this.loadTranslators()
  },
  methods: {
    async loadTranslators() {
      this.loading = true
      this.error = null

      try {
        this.translators = await fetchTranslators(this.searchString, this.page, this.size)
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },
    viewDetails(translatorId) {
      this.$router.push({ name: 'translator-details', params: { id: translatorId } })
    },
    async deleteTranslator(translatorId) {
      const confirmed = confirm('Do you want to delete this data?')
      if (confirmed) {
        try {
          const response = await deleteTranslator(translatorId)
          alert(response) // Show backend response in an alert box
          this.loadTranslators() // Refresh the list after deletion
        } catch (err) {
          alert(err.message) // Show the error message in an alert box
        }
      }
    },
    checkData(translator) {
      if (translator) {
        alert(`Data is present for ${translator.name}`);
      } else {
        alert('Data is not present.');
      }
    }
  }
}
</script>

<style scoped>
.translators-list {
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
  text-align: center; /* Align text to center */
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

.translator-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  border-radius: 8px;
  overflow: hidden; /* Ensure the rounded corners */
}

.action-buttons {
  display: flex; /* Use flexbox to align items */
  justify-content: center; /* Center the buttons */
  gap: 10px; /* Add some space between buttons */
}

.action-btn {
  padding: 10px 15px; /* Adjust the padding for a better look */
  border: none; /* Remove the default border */
  border-radius: 5px; /* Round the corners */
  cursor: pointer; /* Change cursor to pointer */
  transition: background-color 0.3s, transform 0.2s; /* Smooth transitions for hover effects */
}

.detailed-section {
  text-align: center; /* Center align the section content */
}
</style>
