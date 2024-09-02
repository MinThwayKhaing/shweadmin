<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="tm30-business-list">
    <h1>Embassy Letter Business List</h1>

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
      @input="loadEmbassyLetter"
      class="search-box"
    />

    <!-- Pagination Controls -->
    <div class="pagination-controls">
      <label>
        Page:
        <input type="number" v-model.number="page" @change="loadEmbassyLetter" />
      </label>
      <label>
        Page Size:
        <input type="number" v-model.number="size" @change="loadEmbassyLetter" />
      </label>
    </div>

    <table>
      <thead>
        <tr>
          <th>Order Id</th>
          <th>CreatedDate</th>

          <th>PassportBio</th>
          <th>VisaPage</th>
          <th>Duration</th>
          <th>ContactNumber</th>
          <th>Status</th>
          <th>UserName</th>
          <th>Change Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="tm30 in tm30s" :key="tm30.id">
          <td>{{ tm30.syskey }}</td>
          <td>{{ tm30.createdDate }}</td>
          <td>{{ tm30.passportBio }}</td>
          <td>{{ tm30.visaPage }}</td>
          <td>{{ tm30.duration }}</td>
          <td>{{ tm30.contactNumber }}</td>
          <td>{{ tm30.status }}</td>
          <td>{{ tm30.userName }}</td>

          <td>
            <button @click="updateStatus(tm30.id, 'Cancel_Order')">Cancel</button>
            <button @click="updateStatus(tm30.id, 'ON_PROGRESS')">On Progress</button>
            <button @click="updateStatus(tm30.id, 'COMPLETED')">Completed</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script>
import { fetchTM30Business, updateTM30Business } from '../../../services/tm30businessService'

export default {
  data() {
    return {
      tm30s: [],
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
    this.loadTm30()
  },
  methods: {
    async loadTm30() {
      this.loading = true
      this.error = null

      try {
        // Fetch only the car rents that match the active status
        this.tm30s = await fetchTM30Business(
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
        await updateTM30Business(id, newStatus)
        alert(`Status updated to ${newStatus} successfully.`)
        this.loadTm30() // Reload the list after the update
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
