<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="car-rent-list">
    <h1 class="text-2xl text-black">Car List</h1>

    <!-- Search Box -->
    <input
      v-model="searchString"
      placeholder="Search Cars..."
      @input="loadCarRent"
      class="search-box w-16 mb-4 p-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition duration-150 ease-in-out"
    />

    <!-- Pagination Controls -->
    <div class="mb-5 flex gap-5">
      <label>
        Page:
        <input class="w-16 mb-4 p-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition duration-150 ease-in-out"
         type="number" v-model.number="page" @change="loadCarRent" />
      </label>
      <label>
        Page Size:
        <input class="w-16 mb-4 p-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition duration-150 ease-in-out"
         type="number" v-model.number="size" @change="loadCarRent" />
      </label>
    </div>
    <section class="detailed-section">
      <table class="car-rent-table">
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="carRent in carRents" :key="carRent.carId" @click="checkData(carRent)">
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
              <div class="action-buttons">
                <button @click.stop="viewDetails(carRent.carId)" class="action-btn cursor-pointer p-2 rounded-lg mb-1 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 text-yellow-950 font-semibold shadow-xl">
                  View Details
                </button>
                <button @click.stop="CarRentTranslator(carRent.carId)" class="action-btn cursor-pointer p-2 rounded-lg mb-1 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 text-yellow-950 font-semibold shadow-xl">
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
import { fetchCarRent, deleteCarRent } from '../../../services/carRentService'

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
      this.$router.push({ name: 'car-details', params: { id: carRentId } })
    },
    async CarRentTranslator(carRentId) {
      const confirmed = confirm('Do you want to delete this data?')
      if (confirmed) {
        try {
          const response = await deleteCarRent(carRentId)
          alert(response) // Show backend response in an alert box
          this.loadCarRent() // Refresh the list after deletion
        } catch (err) {
          alert(err.message) // Show the error message in an alert box
        }
      }
    },
    checkData(carRent) {
      if (carRent) {
        alert(`Data is present for ${carRent.carName}`);
      } else {
        alert('Data is not present.');
      }
    }
  }
}
</script>

<style scoped>
.car-rent-list {
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

.car-rent-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  border-radius: 8px;
  overflow: hidden; /* Ensure the rounded corners */
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

.loading {
  text-align: center;
  font-weight: bold;
}

.error {
  color: red;
  text-align: center;
  font-weight: bold;
}

.detailed-section {
  text-align: center; /* Center align the section content */
}
</style>
