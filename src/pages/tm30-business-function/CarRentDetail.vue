<template>
  <div class="car-order-details">
    <!-- Show loading or error messages -->
    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <!-- Display the details once the data is loaded -->
    <div v-if="!loading && !error">
      <h1>Car Order Details</h1>

      <!-- Car Order Information -->
      <div class="order-info">
        <p><strong>Order SysKey:</strong> {{ carOrder.sysKey }}</p>
        <p><strong>Status:</strong> {{ carOrder.status }}</p>
        <p><strong>Pick Up Date:</strong> {{ formatDate(carOrder.pickUpDate) }}</p>
        <p><strong>Pick Up Time:</strong> {{ carOrder.pickUpTime }}</p>
        <p><strong>From Location:</strong> {{ carOrder.fromLocation }}</p>
        <p><strong>To Location:</strong> {{ carOrder.toLocation }}</p>
        <p><strong>Customer Phone Number:</strong> {{ carOrder.customerPhoneNumber }}</p>
        <p><strong>Price:</strong> {{ carOrder.price }}</p>
      </div>

      <!-- Car Information -->
      <div class="car-info">
        <h2>Car Information</h2>
        <img :src="carOrder.carImage || defaultImage" alt="Car Image" class="car-image" />
        <p><strong>Car Name:</strong> {{ carOrder.carName }}</p>
        <p><strong>Owner Name:</strong> {{ carOrder.ownerName }}</p>
        <p><strong>Car No:</strong> {{ carOrder.carNo }}</p>
        <p><strong>License:</strong> {{ carOrder.license }}</p>
        <p><strong>Car Status:</strong> {{ carOrder.carStatus ? 'Active' : 'Inactive' }}</p>
        <p><strong>Driver Name:</strong> {{ carOrder.driverName }}</p>
        <p><strong>Driver Phone Number:</strong> {{ carOrder.driverPhoneNumber }}</p>
        <p><strong>Car Color:</strong> {{ carOrder.carColor }}</p>
      </div>

      <!-- User Information -->
      <div class="user-info">
        <h2>User Information</h2>
        <img :src="carOrder.userImage || defaultImage" alt="User Image" class="user-image" />
        <p><strong>User Name:</strong> {{ carOrder.userName }}</p>
      </div>

      <!-- Button to Open Car List Modal -->
      <button @click="openCarModal">Choose Car</button>
      <!-- Modal for Car List -->
      <div v-if="showModal" class="modal">
        <div class="modal-content">
          <h2>Select Car</h2>

          <!-- Search Box -->
          <input
            v-model="searchString"
            @input="fetchCarList"
            type="text"
            class="search-bar"
            placeholder="Search by car name, owner, or number"
          />

          <!-- Car List Table -->
          <table class="car-list">
            <thead>
              <tr>
                <th>Car Name</th>
                <th>Owner</th>
                <th>Car No</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="car in carList" :key="car.id">
                <td>{{ car.carName }}</td>
                <td>{{ car.ownerName }}</td>
                <td>{{ car.carNo }}</td>
                <td><button @click="selectCar(car)">Select</button></td>
              </tr>
            </tbody>
          </table>

          <!-- Close Modal -->
          <button @click="closeModal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchCarOrderDetailsBySysKey, fetchCarRent } from '../../../services/carRentService'
import defaultImage from '@/assets/default.jpg'

export default {
  data() {
    return {
      showModal: false,
      carList: [],
      searchString: '',
      carOrder: {}, // Holds the car order details
      loading: true, // Loading state
      error: null, // Error state
      defaultImage // Default image for the car and user
    }
  },
  created() {
    this.fetchCarOrderDetails()
  },
  methods: {
    async fetchCarOrderDetails() {
      try {
        const sysKey = this.$route.params.sysKey // Get sysKey from the route params
        const response = await fetchCarOrderDetailsBySysKey(sysKey) // Fetch the car order details by sysKey
        this.carOrder = response.data // Assign the fetched data to carOrder
        this.loading = false
      } catch (err) {
        this.error = 'Failed to load car order details'
        this.loading = false
      }
    },
    async fetchCarList() {
      try {
        const response = await fetchCarRent(this.searchString)
        this.carList = response
      } catch (err) {
        this.error = 'Failed to load car list::' + err
      }
    },
    // Open the car modal
    openCarModal() {
      this.showModal = true
      this.fetchCarList()
    },
    // Close the car modal
    closeModal() {
      this.showModal = false
    },
    // Select a car and fill in the car information
    selectCar(car) {
      this.carOrder.carName = car.carName
      this.carOrder.ownerName = car.ownerName
      this.carOrder.carNo = car.carNo
      this.carOrder.license = car.license
      this.carOrder.carImage = car.image
      this.carOrder.carStatus = car.status
      this.carOrder.driverName = car.driverName
      this.carOrder.driverPhoneNumber = car.driverPhoneNumber
      this.carOrder.carColor = car.carColor
      this.showModal = false
    },
    // Format the date for display
    formatDate(date) {
      if (!date) return 'N/A'
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString(undefined, options)
    }
  }
}
</script>

<style scoped>
.car-order-details {
  padding: 20px;
  max-width: 800px;
  margin: auto;
}

.car-info,
.order-info,
.user-info {
  margin-bottom: 20px;
}

.car-image,
.user-image {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
}

.loading {
  text-align: center;
  font-size: 1.5em;
}

.error {
  text-align: center;
  color: red;
  font-size: 1.2em;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 500px;
}

.car-list {
  width: 100%;
  margin-top: 20px;
}

.car-list th,
.car-list td {
  padding: 10px;
  text-align: left;
}

.search-bar {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
}
</style>
