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
            <button @click="viewDetails(carRent.carId)">View Details</button>
            <button @click="CarRentTranslator(carRent.carId)">Delete</button>
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
