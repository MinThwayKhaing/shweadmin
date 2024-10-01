<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="car-rent-list">
    <h1>CarRent List</h1>

    <!-- Search Box -->
    <input
      v-model="searchString"
      placeholder="Search Cars..."
      @input="loadCarRent"
      class="search-box"
    />

    <!-- Pagination Controls -->
    <div class="pagination-controls">
      <label>
        Page:
        <input type="number" v-model.number="page" @change="loadCarRent" />
      </label>
      <label>
        Page Size:
        <input type="number" v-model.number="size" @change="loadCarRent" />
      </label>
    </div>

    <table  class="styled-table">
      <thead>
        <tr>

          <th>CarName</th>
          <th>OwnerName</th>
          <th>CarNo</th>
          <th>Status</th>

          <th>License</th>
          <th>DriverName</th>
          <th>DriverPhoneNumber</th>
          <th>CarColor</th>
          <th>CarType</th>
          <td></td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="carRent in carRents" :key="carRent.carId">
          <td>{{ carRent.carName }}</td>
          <td>{{ carRent.ownerName }}</td>
          <td>{{ carRent.carNo }}</td>

          <td>{{ carRent.status }}</td>
          <td>{{ carRent.license }}</td>
          <td>{{ carRent.driverName }}</td>

          <td>{{ carRent.driverPhoneNumber }}</td>
          <td>{{ carRent.carColor }}</td>
          <td>{{ carRent.carType }}</td>

          <td>
            <button 
            class="px-4 py-2 bg-orange-500 text-white rounded-lg border border-transparent shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-150 ease-in-out"
            @click="viewDetails(carRent.carId)">View Details</button>
            <button class="px-4 py-2 bg-orange-500 text-white rounded-lg border border-transparent shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-150 ease-in-out" @click="CarRentTranslator(carRent.carId)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script>
import { fetchCarRent, CarRentTranslator } from '../../../services/carRentService'

export default {
  data() {
    return {
      carRents: [],
      searchString: '', // Initialize the search string
      page: 1, // Current page
      size: 10, // Page size
      loading: false,
      error: null
    }
  },
  created() {
    this.loadCarRent()
  },
  methods: {
    async loadCarRent() {
      this.loading = true
      this.error = null

      try {
        this.carRents = await fetchCarRent(this.searchString, this.page, this.size)
      } catch (err) {
        this.error = err.message
        console.log(err.message)
      } finally {
        this.loading = false
      }
    },
    viewDetails(carRentId) {
      console.log("Navigating with carRentId: ", carRentId);
      this.$router.push({ name: 'car-details', params: { id: carRentId } })
    },
    async CarRentTranslator(carRentId) {
      const confirmed = confirm('Do you want to delete this data?')
      if (confirmed) {
        try {
          const response = await CarRentTranslator(carRentId)
          alert(response) // Show backend response in an alert box
          this.loadCarRent() // Refresh the list after deletion
        } catch (err) {
          alert(err.message) // Show the error message in an alert box
        }
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
