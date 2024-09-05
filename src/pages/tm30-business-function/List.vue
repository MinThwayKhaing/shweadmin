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

    <table class="styled-table">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Created Date</th>
          <th>Category</th>
          <th>User Name</th>
          <th>Change Status</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="order in orders"
          :key="order.id"
          @click="navigateToDetail(order.sys_key, order.id)"
          class="clickable-row"
        >
          <td>{{ order.sys_key }}</td>
          <td>{{ formatDate(order.createdDate) }}</td>
          <td>{{ mapSysKeyToCategory(order.sys_key) }}</td>
          <td>{{ order.userName }}</td>
          <td>
            <button class="status-button" @click.stop="updateStatus(order.id, 'Cancel_Order')">
              Cancel
            </button>
            <button class="status-button" @click.stop="updateStatus(order.id, 'ON_PROGRESS')">
              On Progress
            </button>
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
    },
    mapSysKeyToCategory(sysKey) {
      const prefix = sysKey.slice(0, 2)

      switch (prefix) {
        case 'CR':
          return 'Car Rental'
        case 'TR':
          return 'Translator'
        case 'TM':
          return 'TM30'
        case 'RP':
          return 'Report90'
        case 'VE':
          return 'VISA_EXTENSION'
        case 'ER':
          return 'EMBASSY_EXTENSION'
        default:
          return 'Unknown Category'
      }
    },
    navigateToDetail(sysKey, id) {
      const prefix = sysKey.slice(0, 2)

      let route = ''
      switch (prefix) {
        case 'CR':
          route = `/tm30business/${id}/car-business-detail`
          break
        case 'TR':
          route = `/tm30business/${id}/translator-business-detail`
          break
        case 'TM':
          route = `/tm30business/${id}/tm30-business-detail`
          break
        case 'RP':
          route = `/tm30business/${id}/report90Days-business-detail`
          break
        case 'VE':
          route = `/tm30business/${id}/visaService-business-detail`
          break
        case 'ER':
          route = `/tm30business/${id}/embassy-business-detail`
          break
        default:
          route = `/tm30business/${id}/unknown-business-detail`
          break
      }

      this.$router.push({ path: route })
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
  background-color: #f4f4f4;
  font-weight: bold;
}

.styled-table tbody tr:nth-child(odd) {
  background-color: #f9f9f9;
}

.styled-table tbody tr:nth-child(even) {
  background-color: #f1f1f1;
}

.styled-table tbody tr:hover {
  background-color: #e9ecef;
  cursor: pointer;
}

.status-button {
  background-color: #007bff;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.status-button:hover {
  background-color: #0056b3;
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
