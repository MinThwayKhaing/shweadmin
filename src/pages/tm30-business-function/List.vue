<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="main-order-list">
    <h1>Main Order List</h1>

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
      placeholder="Search Orders..."
      @input="loadOrders"
      class="search-box"
    />

    <!-- Pagination Controls -->
    <div class="pagination-controls">
      <label>
        Page:
        <input type="number" v-model.number="page" @change="loadOrders" />
      </label>
      <label>
        Page Size:
        <input type="number" v-model.number="size" @change="loadOrders" />
      </label>
    </div>

    <table>
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Created Date</th>
          <th>Sys Key</th>
          <th>Status</th>
          <th>User Name</th>
          <th>Change Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.order_id }}</td>
          <td>{{ formatDate(order.createdDate) }}</td>
          <td>{{ order.sys_key }}</td>
          <td>{{ order.status }}</td>
          <td>{{ order.userName }}</td>
          <td>
            <button @click="updateStatus(order.id, 'Cancel_Order')">Cancel</button>
            <button @click="updateStatus(order.id, 'ON_PROGRESS')">On Progress</button>
            <button @click="updateStatus(order.id, 'COMPLETED')">Completed</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script>
import { fetchMainOrders, updateTM30Business } from '../../../services/tm30businessService'

export default {
  data() {
    return {
      orders: [],
      searchString: '',
      page: 1,
      size: 10,
      loading: false,
      error: null,
      statuses: [
        { label: 'Pending', value: 'Pending' },
        { label: 'Cancel Order', value: 'Cancel_Order' },
        { label: 'On Progress', value: 'ON_PROGRESS' },
        { label: 'Completed', value: 'COMPLETED' }
      ],
      activeStatus: 'Pending'
    }
  },
  created() {
    this.loadOrders()
  },
  methods: {
    async loadOrders() {
      this.loading = true
      this.error = null

      try {
        this.orders = await fetchMainOrders(
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
      this.loadOrders()
    },
    async updateStatus(id, newStatus) {
      try {
        await updateTM30Business(id, newStatus)
        alert(`Status updated to ${newStatus} successfully.`)
        this.loadOrders() // Reload the list after the update
      } catch (err) {
        alert(`Failed to update status: ${err.message}`)
      }
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString(undefined, options)
    }
  }
}
</script>

<style scoped>
.main-order-list {
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
