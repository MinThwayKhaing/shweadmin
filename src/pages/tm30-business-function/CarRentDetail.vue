<template>
  <div class="car-order-details max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
    <!-- Show loading or error messages -->
    <div v-if="loading" class="text-center text-xl">Loading...</div>
    <div v-if="error" class="text-center text-red-500">{{ error }}</div>

    <!-- Display the details once the data is loaded -->
    <div v-if="!loading && !error">
      <h1 class="text-2xl font-bold mb-6">Car Order Details</h1>

      <!-- Car Order Information -->
      <div class="mb-6">
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
      <div class="mb-6">
        <h2 class="text-xl font-semibold mb-4">Car Information</h2>
        <img
          :src="carOrder.carImage || defaultImage"
          alt="Car Image"
          class="w-36 h-36 rounded-full object-cover mb-4"
        />
        <p><strong>Car Name:</strong> {{ carOrder.carName }}</p>
        <p><strong>Owner Name:</strong> {{ carOrder.ownerName }}</p>
        <p><strong>Car No:</strong> {{ carOrder.carNo }}</p>
        <p><strong>License:</strong> {{ carOrder.license }}</p>
        <p><strong>Car Status:</strong> {{ carOrder.carStatus ? 'Active' : 'Inactive' }}</p>
        <p><strong>Driver Name:</strong> {{ carOrder.driverName }}</p>
        <p><strong>Driver Phone Number:</strong> {{ carOrder.driverPhoneNumber }}</p>
        <p><strong>Car Color:</strong> {{ carOrder.carColor }}</p>
      </div>

      <!-- Update button -->
      <button
        @click="updateCarOrder"
        class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 transition"
      >
        Update Car Order
      </button>

      <!-- User Information -->
      <div class="my-6">
        <h2 class="text-xl font-semibold mb-4">User Information</h2>
        <img
          :src="carOrder.userImage || defaultImage"
          alt="User Image"
          class="w-36 h-36 rounded-full object-cover mb-4"
        />
        <p><strong>User Name:</strong> {{ carOrder.userName }}</p>
      </div>

      <!-- Button to Open Car List Modal -->
      <button
        @click="openCarModal"
        class="mt-6 px-4 py-2 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600"
      >
        Choose Car
      </button>

      <!-- Modal for Car List -->
      <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div class="bg-white p-6 rounded-md w-full max-w-lg">
          <h2 class="text-xl font-semibold mb-4">Select Car</h2>

          <!-- Search Box -->
          <input
            v-model="searchString"
            @input="fetchCarList"
            type="text"
            class="w-full p-2 border border-gray-300 rounded-md mb-4"
            placeholder="Search by car name, owner, or number"
          />

          <!-- Car List Table -->
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-gray-100">
                <th class="p-2 border">Car Name</th>
                <th class="p-2 border">Owner</th>
                <th class="p-2 border">Car No</th>
                <th class="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="car in carList"
                :key="car.id"
                @click="selectCar(car)"
                class="hover:bg-gray-100 cursor-pointer"
              >
                <td class="p-2 border">{{ car.carName }}</td>
                <td class="p-2 border">{{ car.ownerName }}</td>
                <td class="p-2 border">{{ car.carNo }}</td>
              </tr>
            </tbody>
          </table>

          <!-- Close Modal -->
          <button
            @click="closeModal"
            class="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchCarOrderDetailsBySysKey, fetchCarRent,updateCarOrder } from '../../../services/carRentService'
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
      carUpdateData: [],
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
        this.carUpdateData = {
          sys_key: this.carOrder.sysKey,
          carId: this.carOrder.id,
        }
        this.loading = false
      } catch (err) {
        this.error = 'Failed to load car order details'
        this.loading = false
      }
    },
    async updateCarOrder() {
      try {
   
        // Call the updateCarRent API with the car ID and form data
        const response = await updateCarOrder(this.carOrder.sysKey, this.carUpdateData)
        
        console.log('Update successful:', response.data)
        alert('Car order updated successfully!')
        this.$router.push({ name: 'tm30-business-list' });
      } catch (err) {
        console.error('Failed to update car order:', err)
        alert('Failed to update car order. Please try again.')
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
      this.carOrder.carId=car.carId
      this.carOrder.carName = car.carName
      this.carOrder.ownerName = car.ownerName
      this.carOrder.carNo = car.carNo
      this.carOrder.license = car.license
      this.carOrder.carImage = car.image
      this.carOrder.carStatus = car.status
      this.carOrder.driverName = car.driverName
      this.carOrder.driverPhoneNumber = car.driverPhoneNumber
      this.carOrder.carColor = car.carColor
      this.carUpdateData = {
          sys_key: this.carOrder.sysKey,
          carId: this.carOrder.carId,
        }
        
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
.update-btn {
  padding: 10px 15px;
  background-color: #28a745;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 1em;
}

.update-btn:hover {
  background-color: #218838;
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
