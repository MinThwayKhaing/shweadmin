<template>
  <div class="translator-order-details">
    <!-- Show a loading message while data is being fetched -->
    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <!-- Display the details once the data is loaded -->
    <div v-if="!loading && !error">
      <h1>Translator Order Details</h1>

      <!-- Translator Info -->
      <div class="translator-info">
        <!-- Use default image if translatorImage is null or empty -->
        <img
          :src="order[15] ? order[15] : defaultImage"
          alt="User Image"
          class="translator-image"
        />
        <h2>{{ order[12] }}</h2>
        <a :href="order[11]" target="_blank">Chat with Translator</a>
      </div>

      <!-- Order Info -->
      <div class="order-info">
        <p><strong>Order Status:</strong> {{ order[1] }}</p>
        <p><strong>From Date:</strong> {{ formatDate(order[2]) }}</p>
        <p><strong>To Date:</strong> {{ formatDate(order[3]) }}</p>
        <p><strong>Meeting Date:</strong> {{ formatDate(order[4]) }}</p>
        <p><strong>Meeting Point:</strong> {{ order[5] }}</p>
        <p><strong>Phone Number:</strong> {{ order[6] }}</p>
        <p><strong>Used For:</strong> {{ order[7] }}</p>
        <p><strong>Meeting Time:</strong> {{ order[8] }}</p>

        <!-- Translator Info -->
        <div class="translator-info">
          <!-- Use default image if translatorImage is null or empty -->
          <img
            :src="order[10] ? order[10] : defaultImage"
            alt="Translator Image"
            class="translator-image"
          />
          <h2>{{ order[9] }}</h2>
          <a :href="order[11]" target="_blank">Chat with Translator</a>
          <button @click="openTranslatorModal">Choose Translator</button>
          <!-- Button to open modal -->
        </div>
        <!-- Update button -->
        <button @click="updateOrder">Update Order</button>
        <!-- Translator Modal -->
        <div v-if="showModal" class="modal">
          <div class="modal-content">
            <h2>Select Translator</h2>

            <!-- Search Bar -->
            <input
              v-model="searchString"
              @input="loadTranslator"
              type="text"
              class="search-bar"
              placeholder="Search translator by name"
            />

            <!-- Table -->
            <table class="translator-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Translator Name</th>
                  <th>Language</th>
                  <th>Specialist</th>
                  <th>ChatLink</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(translator, index) in translators"
                  :key="translator.id"
                  @click="selectTranslator(translator)"
                >
                  <td>{{ index + 1 }}</td>
                  <td>
                    <img
                      :src="translator.image || defaultImage"
                      alt="Translator Image"
                      class="translator-list-image"
                    />
                  </td>
                  <!-- Auto-increment number -->
                  <td>{{ translator.name }}</td>
                  <td>{{ translator.language }}</td>
                  <td>{{ translator.specialist }}</td>
                  <td>{{ translator.chatLink }}</td>
                </tr>
              </tbody>
            </table>

            <button @click="closeModal">Close</button>
          </div>
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
