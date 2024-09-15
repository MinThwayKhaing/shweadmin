<template>
  <div class="translator-order-details max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
    <!-- Show a loading message while data is being fetched -->
    <div v-if="loading" class="loading text-center text-blue-500 font-semibold">Loading...</div>
    <div v-if="error" class="error text-center text-red-500">{{ error }}</div>

    <!-- Display the details once the data is loaded -->
    <div v-if="!loading && !error">
      <h1 class="text-2xl font-bold text-gray-800 mb-6">Translator Order Details</h1>

      <!-- Translator Info -->
      <div class="translator-info mb-8">
        <img
          :src="order[15] ? order[15] : defaultImage"
          alt="User Image"
          class="translator-image w-24 h-24 object-cover rounded-full border mb-4"
        />
        <h2 class="text-lg font-semibold text-gray-700">{{ order[12] }}</h2>
        <a
          :href="order[11]"
          target="_blank"
          class="text-blue-500 hover:underline"
        >Chat with Translator</a>
      </div>

      <!-- Order Info -->
      <div class="order-info space-y-4">
        <p><strong>Order Status:</strong> {{ order[1] }}</p>
        <p><strong>From Date:</strong> {{ formatDate(order[2]) }}</p>
        <p><strong>To Date:</strong> {{ formatDate(order[3]) }}</p>
        <p><strong>Meeting Date:</strong> {{ formatDate(order[4]) }}</p>
        <p><strong>Meeting Point:</strong> {{ order[5] }}</p>
        <p><strong>Phone Number:</strong> {{ order[6] }}</p>
        <p><strong>Used For:</strong> {{ order[7] }}</p>
        <p><strong>Meeting Time:</strong> {{ order[8] }}</p>
      </div>

      <!-- Translator Info -->
      <div class="translator-info mt-8">
        <img
          :src="order[10] ? order[10] : defaultImage"
          alt="Translator Image"
          class="translator-image w-24 h-24 object-cover rounded-full border mb-4"
        />
        <h2 class="text-lg font-semibold text-gray-700">{{ order[9] }}</h2>
        <a
          :href="order[11]"
          target="_blank"
          class="text-blue-500 hover:underline"
        >Chat with Translator</a>
        <button
          @click="openTranslatorModal"
          class="ml-4 px-4 py-2 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 mt-4"
        >
          Choose Translator
        </button>
      </div>

      <!-- Update button -->
      <button
        @click="updateOrder"
        class="mt-6 px-4 py-2 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600"
      >
        Update Order
      </button>

      <!-- Translator Modal -->
      <div v-if="showModal" class="modal fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
        <div class="modal-content bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
          <h2 class="text-xl font-semibold mb-4">Select Translator</h2>

          <!-- Search Bar -->
          <input
            v-model="searchString"
            @input="loadTranslator"
            type="text"
            class="w-full p-2 border rounded-md mb-4"
            placeholder="Search translator by name"
          />

          <!-- Table -->
          <div class="overflow-x-auto">
            <table class="translator-table w-full table-auto">
              <thead>
                <tr class="bg-gray-100">
                  <th class="p-2 text-left">#</th>
                  <th class="p-2 text-left">Image</th>
                  <th class="p-2 text-left">Translator Name</th>
                  <th class="p-2 text-left">Language</th>
                  <th class="p-2 text-left">Specialist</th>
                  <th class="p-2 text-left">ChatLink</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(translator, index) in translators"
                  :key="translator.id"
                  @click="selectTranslator(translator)"
                  class="border-t hover:bg-gray-50 cursor-pointer"
                >
                  <td class="p-2">{{ index + 1 }}</td>
                  <td class="p-2">
                    <img
                      :src="translator.image || defaultImage"
                      alt="Translator Image"
                      class="w-12 h-12 object-cover rounded-full"
                    />
                  </td>
                  <td class="p-2">{{ translator.name }}</td>
                  <td class="p-2">{{ translator.language }}</td>
                  <td class="p-2">{{ translator.specialist }}</td>
                  <td class="p-2">{{ translator.chatLink }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <button
            @click="closeModal"
            class="mt-6 px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import {
  fetchTranslatorOrderBySysKey,
  updateTranslatorOrderFromAdmin,
  fetchTranslators
} from '../../../services/translatorService'
import defaultImage from '@/assets/default.jpg'

export default {
  data() {
    return {
      searchString: '',
      translatorId: 0,
      order: [], // Expect an array of order details
      translators: [], // List of translators to display in modal
      loading: true, // To handle loading state
      error: null, // To handle error state
      defaultImage, // Assign the imported default image to use in the template
      showModal: false // To control modal visibility
    }
  },
  created() {
    this.fetchOrderDetails()
  },
  methods: {
    async fetchOrderDetails() {
      try {
        const sysKey = this.$route.params.sysKey // Get sysKey from route params
        const response = await fetchTranslatorOrderBySysKey(sysKey) // Use the service method to fetch data
        this.order = response[0]
        console.log('order', this.order)
        this.loading = false // Set loading to false when data is fetched
      } catch (err) {
        this.error = 'Failed to load order details'
        this.loading = false
      }
    },
    async loadTranslator() {
      try {
        this.translators = await fetchTranslators(this.searchString, this.page, this.size)
      } catch (err) {
        this.error = err.message
        console.log(err.message)
      }
    },
    async updateOrder() {
      try {
        const sysKey = this.$route.params.sysKey

        const updatePayload = {
          translator_id: this.order[14], // Ensure translatorId is set correctly
          sysKey: sysKey
        }
        console.log(this.order[13])
        // Call API to update the order
        await updateTranslatorOrderFromAdmin(this.order[13], updatePayload)
        this.$router.push({ name: 'tm30-business-list' });
        alert('Order updated successfully')
      } catch (err) {
        console.error('Failed to update order:', err)
        alert('Failed to update order')
      }
    },
    // Fetch translators list and open modal
    async openTranslatorModal() {
      try {
        const response = await fetchTranslators('', 1, 10) // Fetch the first 10 translators
        this.translators = response
        this.showModal = true // Show modal
      } catch (err) {
        this.error = 'Failed to load translators'
      }
    },
    // Handle the selection of a translator
    selectTranslator(translator) {
      this.order[14] = translator.id
      this.order[9] = translator.name
      this.order[10] = translator.image
      this.order[11] = translator.chatLink
      this.showModal = false // Close modal after selection
    },
    closeModal() {
      this.showModal = false
    },
    // Format date for display
    formatDate(date) {
      if (!date) return 'N/A'
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString(undefined, options)
    }
  }
}
</script>

<style scoped>
.translator-order-details {
  padding: 20px;
  max-width: 800px;
  margin: auto;
}

.translator-info {
  margin-bottom: 20px;
}

.translator-image {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
}

.order-info {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
}

.order-info p {
  margin: 10px 0;
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

/* Modal Styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
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

.translator-list-image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
}
</style>
