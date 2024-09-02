<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="tm30-business-list">
    <h1>Embassy Letters Business List</h1>

    <!-- Status Filter Navbar -->
    <div class="status-navbar">
      <button
        v-for="(status, index) in statuses"
        :key="index"
        :class="{ active: activeStatus === status.value }"
        @click="filterByStatus(status.value)"
      >
        {{ status.label }}
      </button>
    </div>

    <!-- Search Box -->
    <input
      v-model="searchString"
      placeholder="Search Cars..."
      @input="loadTm30"
      class="search-box"
    />

    <!-- Pagination Controls -->
    <div class="pagination-controls">
      <label>
        Page:
        <input type="number" v-model.number="page" @change="loadTm30" />
      </label>
      <label>
        Page Size:
        <input type="number" v-model.number="size" @change="loadTm30" />
      </label>
    </div>

    <table>
      <thead>
        <tr>
          <th>Order Id</th>
          <th>CreatedDate</th>
          <th>Visa Type</th>
          <th>PassportBio</th>
          <th>VisaPage</th>
          <th>ContactNumber</th>
          <th>UserName</th>
          <th>Status</th>
          <th>ChangeStatus</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="embassyLetter in embassyLetters" :key="embassyLetter.order_id">
          <td>{{ embassyLetter.order_id }}</td>
          <td>{{ embassyLetter.createdDate }}</td>
          <td>{{ embassyLetter.visaType }}</td>
          <td>{{ embassyLetter.passportBio }}</td>
          <td>{{ embassyLetter.visaPage}}</td>
          <td>{{ embassyLetter.contactNumber }}</td>
          <td>{{ embassyLetter.userName }}</td>
          <td>{{ embassyLetter.status}}</td>
          <td>
            <button @click="updateStatus(embassyLetter.order_id, 'Cancel_Order')">Cancel</button>
            <button @click="updateStatus(embassyLetter.order_id, 'ON_PROGRESS')">On Progress</button>
            <button @click="updateStatus(embassyLetter.order_id, 'COMPLETED')">Completed</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script>
import { fetchEmbassyLetter, updateEmbassyLetter } from '../../../services/embassyLetterbusinessService.js'

export default {
  data() {
    return {
      embassyLetters: [],
      searchString: '', // Initialize the search string
      page: 1, // Current page
      size: 10, // Page size
      loading: false,
      error: null,
      statuses: [
        { label: 'Pending', value: 'Pending' },
        { label: 'Cancel Order', value: 'Cancel_Order' },
        { label: 'On Progress', value: 'ON_PROGRESS' },
        { label: 'Completed', value: 'COMPLETED' }
      ],
      // Status options
      activeStatus: 'Pending' // Default status filter
    }
  },
  created() {
    this.loadEmbassyLetter()
  },
  methods: {
    async loadEmbassyLetter() {
      this.loading = true
      this.error = null

      try {
        // Fetch only the car rents that match the active status
        this.embassyLetters = await fetchEmbassyLetter(
          this.searchString,
          this.page,
          this.size,
          this.activeStatus
        )
      } catch (err) {
        this.error = err.message
        console.log(err.message)
      } finally {
        this.loading = false
      }
    },
    filterByStatus(statusValue) {
      this.activeStatus = statusValue
      this.loadTm30()
    },
    async updateStatus(id, newStatus) {
      try {
        await updateEmbassyLetter(id, newStatus)
        alert(`Status updated to ${newStatus} successfully.`)
        this.loadEmbassyLetter() // Reload the list after the update
      } catch (err) {
        alert(`Failed to update status: ${err.message}`)
      }
    }
  }
}
</script>

<style scoped>
.tm30-business-list {
  padding: 20px;
}

.status-navbar {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.status-navbar button {
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.status-navbar button.active {
  background-color: #0056b3;
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
