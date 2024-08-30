<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="translators-list">
    <h1>Translators List</h1>

    <!-- Search Box -->
    <input
      v-model="searchString"
      placeholder="Search translators..."
      @input="loadTranslators"
      class="search-box"
    />

    <!-- Pagination Controls -->
    <div class="pagination-controls">
      <label>
        Page:
        <input type="number" v-model.number="page" @change="loadTranslators" />
      </label>
      <label>
        Page Size:
        <input type="number" v-model.number="size" @change="loadTranslators" />
      </label>
    </div>

    <table>
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
            <button @click="viewDetails(translator.id)">View Details</button>
            <!-- <button @click="updateTranslator(translator.id)">Update</button> -->
            <button @click="deleteTranslator(translator.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

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
    updateTranslator(translatorId) {
      this.$router.push({ name: 'translator-update', params: { id: translatorId } })
    },
    async deleteTranslator(translatorId) {
      try {
        await deleteTranslator(translatorId)
        this.loadTranslators() // Refresh the list after deletion
      } catch (err) {
        this.error = err.message
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
</style>
