<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="main-order-list">
    <h1 class="text-2xl text-black">Main Order List</h1>

    <!-- Status Filter Navbar -->
    <div class="flex m-auto">
      <button
        v-for="(status, index) in statuses"
        :key="index"
        :class="[
        'mr-2',
        'mb-4',
        'mt-4',
        'p-2',
        'rounded-lg',
        'border',
        'transition-colors',
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-yellow-600',
        'focus:ring-offset-2',
        {
          'bg-yellow-600 text-black border-yellow-600': activeStatus === status.value,
          'bg-transparent text-amber-600 border-yellow-600': activeStatus !== status.value,
          'hover:bg-yellow-100': activeStatus !== status.value
        }
      ]"
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
      class="w-full max-w-md mb-4 p-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition duration-150 ease-in-out"
    />

    <!-- Pagination Controls -->
    <div  class="mb-5 flex gap-5">
      <label>
        Page:
        <input class="w-16 mb-4 p-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition duration-150 ease-in-out" type="number" v-model.number="page" @change="loadOrders" />
      </label>
      <label>
        Page Size:
        <input class="w-16 mb-4 p-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition duration-150 ease-in-out" type="number" v-model.number="size" @change="loadOrders" />
      </label>
    </div>

    <table class="styled-table">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Created Date</th>
          <th>Category</th>
          <th>User Name</th>
          <th>Status</th>
          <th v-if="showUploadDocumentColumn && !isCompleted">Upload Documents</th>
          <th v-if="showChangeStatusColumn && !isCompleted">Change Status</th>
          <th v-if="isCompleted">View</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="order in orders"
          :key="order.id"
          @click="handleRowClick(order)"
          class="clickable-row"
        >
          <td>{{ order.sys_key }}</td>
          <td>{{ formatDate(order.createdDate) }}</td>
          <td>{{ mapSysKeyToCategory(order.sys_key) }}</td>
          <td>{{ order.userName }}</td>
          <td>{{ order.status }}</td>
          <td v-if="order.status === 'ON_PROGRESS'">
            <button class="px-4 py-2 bg-orange-500 text-white rounded-lg border border-transparent shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-150 ease-in-out" @click.stop="navigateToDocumentUpload(order.sys_key)">
              Upload Documents
            </button>
          </td>
          <td v-if="order.status !== 'ON_PROGRESS' && !isCompleted">
            <button class="px-4 py-2 bg-orange-500 text-white rounded-lg border border-transparent shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-150 ease-in-out" @click.stop="updateStatus(order.id, 'Cancel_Order')">
              Cancel
            </button>
          </td>
          <td v-if="isCompleted">
            <button class="px-4 py-2 bg-orange-500 text-white rounded-lg border border-transparent shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-150 ease-in-out" @click.stop="navigateToDocumentDetail(order.sys_key)">
              View
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
      activeStatus: 'Pending',
      fileUploads: {}, // Store uploaded file info

    }
  },
  computed: {
    showUploadDocumentColumn() {
      return this.orders.some(order => order.status === 'ON_PROGRESS')
    },
    showChangeStatusColumn() {
      return this.activeStatus !== 'ON_PROGRESS'
    },
    isCompleted() {
      return this.activeStatus === 'COMPLETED'
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
        // Load file uploads info if necessary
        // Example: this.fileUploads = await fetchFileUploads()
        console.log(this.orders)
      } catch (err) {
        this.error = err.message
        console.log(err.message)
      } finally {
        this.loading = false
      }
    },

    handleRowClick(order) {
      if (order.status === 'COMPLETED') {
        this.$router.push({ name: 'DocumentDetail', params: { sysKey: order.sys_key } })
      } else {
        this.navigateToDetail(order.sys_key)
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
        case 'CR': return 'Car Rental'
        case 'TR': return 'Translator'
        case 'TM': return 'TM30'
        case 'RP': return 'Report90'
        case 'VE': return 'VISA_EXTENSION'
        case 'ER': return 'EMBASSY_EXTENSION'
        default: return 'Unknown Category'
      }
    },
    navigateToDetail(sysKey) {
      const prefix = sysKey.slice(0, 2)
      let route = ''
      switch (prefix) {
        case 'CR': route = `/tm30business/${sysKey}/car-business-detail`; break
        case 'TR': route = `/tm30business/${sysKey}/translator-business-detail`; break
        case 'TM': route = `/tm30business/${sysKey}/tm30-business-detail`; break
        case 'RP': route = `/tm30business/${sysKey}/report90Days-business-detail`; break
        case 'VE': route = `/tm30business/${sysKey}/visaService-business-detail`; break
        case 'ER': route = `/tm30business/${sysKey}/embassy-business-detail`; break
        default: route = `/tm30business/${sysKey}/unknown-business-detail`; break
      }
      this.$router.push({ path: route, params: { sysKey } })
    },
    navigateToDocumentUpload(sysKey) {
      this.$router.push({ name: 'Document_upload', params: { sysKey } })
    },
    
    navigateToDocumentDetail(sysKey) {
      this.$router.push({ name: 'DocumentDetail', params: { sysKey } })
    }
  }
}
</script>


<style scoped>
.main-order-list {
  padding: 20px;
  font-weight: bold;
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
  background-color: #a16207;
  color:#fef9c3;
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
