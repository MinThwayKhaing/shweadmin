<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="tm30-business-list">
      <h1>90 Days Report Business List</h1>
  
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
        @input="loadReport90Day"
        class="search-box"
      />
  
      <!-- Pagination Controls -->
      <div class="pagination-controls">
        <label>
          Page:
          <input type="number" v-model.number="page" @change="loadReport90Day" />
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
            <th>PassportBio</th>
            <th>VisaPage</th>
            <th>VisaType</th>
            <th>ContactNumber</th>
            <th>UserName</th>
            <th>Status</th>  
          </tr>
        </thead>
        <tbody>
          <tr v-for="(report90Day,index) in report90Days" :key="index">
            <!-- <td>{{ report90Day.syskey}}</td> -->
            <td>{{ report90Day.createdDate}}</td>
            <td>{{ report90Day.passportBio}}</td>
            <td>{{ report90Day.visaPage }}</td>
            <td>{{ report90Day.visaType }}</td>
            <td>{{ report90Day.contactNumber }}</td>
            <td>{{ report90Day.userName }}</td>
            <td>{{ report90Day.status }}</td>
  
            <td>
              <button @click="updateStatus(report90Day.id, 'Cancel_Order')">Cancel</button>
              <button @click="updateStatus(report90Day.id, 'ON_PROGRESS')">On Progress</button>
              <button @click="updateStatus(report90Day.id, 'COMPLETED')">Completed</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <div v-if="loading" class="loading">Loading...</div>
      <div v-if="error" class="error">{{ error }}</div>
    </div>
  </template>
  
  <script>
  import { fetch90DayReportBusiness, update90DayReportBusiness } from '../../../services/90DayReportbusinessService.js'
  
  export default {
    data() {
      return {
        report90Days: [],
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
      this.loadReport90Day()
    },
    methods: {
      async loadReport90Day() {
        this.loading = true
        this.error = null
  
        try {
          // Fetch only the car rents that match the active status
          this.report90Day = await fetch90DayReportBusiness(
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
        this.loadReport90Day()
      },
      async updateStatus(id, newStatus) {
        try {
          await update90DayReportBusiness(id, newStatus)
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
  