<!-- eslint-disable vue/multi-word-component-names -->
 <template>
  <div class="car-rent-create">
    <h1 class="text-2xl font-bold mb-4">Create New Car Rent</h1>

    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error text-red-500 mb-4">{{ error }}</div>
    <div v-if="success" class="success text-green-500 mb-4">{{ success }}</div>

    <div class="details-form">
      <form @submit.prevent="createCarRent">
        <!-- Image Upload -->
        <div class="form-group mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">Upload Car Image:</label>
          <input type="file" @change="handleImageUpload" class="cursor-pointer p-2 rounded-lg mb-1 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 text-yellow-950 font-semibold shadow-xl" />
          <img v-if="imagePreview" :src="imagePreview" alt="Car Image" class="car-image mt-2" />
        </div>

        <div class="form-group mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">Car Name:</label>
          <input v-model="carRent.carName" type="text" required class="cursor-pointer p-2 rounded-lg mb-1 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 text-yellow-950 font-semibold shadow-xl" />
        </div>

        <div class="form-group mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">Owner Name:</label>
          <input v-model="carRent.ownerName" type="text" required class="cursor-pointer p-2 rounded-lg mb-1 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 text-yellow-950 font-semibold shadow-xl" />
        </div>

        <div class="form-group mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">Car Number:</label>
          <input v-model="carRent.carNo" type="text" required class="cursor-pointer p-2 rounded-lg mb-1 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 text-yellow-950 font-semibold shadow-xl" />
        </div>

        <div class="form-group mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">Status:</label>
          <input v-model="carRent.status" type="checkbox" class="cursor-pointer p-2 rounded-lg mb-1 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 text-yellow-950 font-semibold shadow-xl" />
        </div>

        <div class="form-group mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">License:</label>
          <input v-model="carRent.license" type="text" required class="cursor-pointer p-2 rounded-lg mb-1 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 text-yellow-950 font-semibold shadow-xl" />
        </div>

        <div class="form-group mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">Review:</label>
          <input v-model="carRent.review" type="text" class="cursor-pointer p-2 rounded-lg mb-1 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 text-yellow-950 font-semibold shadow-xl" />
        </div>

        <div class="form-group mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">Driver Name:</label>
          <input v-model="carRent.driverName" type="text" class="cursor-pointer p-2 rounded-lg mb-1 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 text-yellow-950 font-semibold shadow-xl" />
        </div>

        <div class="form-group mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">Driver Phone Number:</label>
          <input v-model="carRent.driverPhoneNumber" type="text" class="cursor-pointer p-2 rounded-lg mb-1 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 text-yellow-950 font-semibold shadow-xl" />
        </div>

        <div class="form-group mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">Car Color:</label>
          <input v-model="carRent.carColor" type="text" required class="cursor-pointer p-2 rounded-lg mb-1 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 text-yellow-950 font-semibold shadow-xl" />
        </div>

        <div class="form-group mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">Car Type:</label>
          <div class="radio-group">
            <label v-for="option in carTypeOptions" :key="option" class="radio-label">
              <input type="radio" v-model="carRent.carType" :value="option" required class="cursor-pointer p-2 rounded-lg mb-1 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 text-yellow-950 font-semibold shadow-xl" />
              {{ option }}
            </label>
          </div>
        </div>

        <button type="submit" class="cursor-pointer p-2 rounded-lg mb-1 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 text-yellow-950 font-semibold shadow-xl">Create Car Rent</button>
      </form>
    </div>
  </div>
</template>

<script>
import { saveCarRent } from '../../../services/carRentService'

export default {
  data() {
    return {
      carRent: {
        carName: '',
        ownerName: '',
        carNo: '',
        status: false,
        license: '',
        review: '',
        driverName: '',
        driverPhoneNumber: '',
        carColor: '',
        carType: null
      },
      carTypeOptions: [2, 4, 6, 8, 9, 11],
      image: null, // To hold the uploaded car image
      imagePreview: null, // To hold the car image preview URL
      loading: false,
      error: null,
      success: null // To hold the success message
    }
  },
  methods: {
    handleImageUpload(event) {
      const file = event.target.files[0]
      this.image = file
      this.imagePreview = URL.createObjectURL(file)
    },
    async createCarRent() {
      this.loading = true
      this.error = null
      this.success = null

      try {
        const formData = new FormData()
        formData.append('image', this.image)
        formData.append(
          'dto',
          new Blob([JSON.stringify(this.carRent)], { type: 'application/json' })
        )

        const response = await saveCarRent(formData)

        if (response.status === 200) {
          this.success = response.data // Show success message
          this.$router.push({ name: 'car-rent-list' }) // Redirect to list
        } else {
          this.error = response.data // Show the error message returned from backend
        }
      } catch (err) {
        console.log('error:', err)
        this.error = 'Failed to create car rent.'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.car-rent-create {
  padding: 20px;
}

.details-form {
  margin-top: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #4A5568; /* text-gray-700 */
  font-weight: bold;
}

.form-group input[type='text'],
.form-group input[type='checkbox'],
.form-group select,
.form-group input[type='radio'] {
  width: 100%;
  max-width: 300px; /* Adjust the max-width as needed */
  padding: 8px;
  box-sizing: border-box;
  cursor: pointer;
  border-radius: 8px;
  background: linear-gradient(to right, #D69E2E, #F6E05E, #D69E2E); /* bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 */
  color: #1A202C; /* text-yellow-950 */
  font-weight: bold;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* shadow-xl */
}

.car-image {
  width: 120px;
  height: 120px;
  border-radius: 16px;
  object-fit: cover;
  margin-top: 10px;
}

.radio-group {
  display: flex;
  flex-wrap: wrap;
}

.radio-label {
  margin-right: 10px; /* Adds some spacing between the radio buttons */
  display: flex;
  align-items: center;
}

.loading {
  color: #D69E2E; /* text-yellow-600 */
  font-size: 18px;
  font-weight: bold;
}

.error {
  color: #E53E3E; /* text-red-500 */
}

.success {
  color: #38A169; /* text-green-500 */
}
</style>
