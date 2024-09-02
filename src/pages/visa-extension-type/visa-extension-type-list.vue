<template>
  <div class="visa-extension-type-list">
    <h1>Visa Extension Types</h1>
    <table>
      <thead>
        <tr>
          <th>Description</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="type in visaExtensionTypes" :key="type.id">
          <td>{{ type.description }}</td>
          <td>{{ type.price.toFixed(2) }}</td>
          <td>
            <button @click="editType(type.id)">Edit</button>
            <button @click="deleteType(type.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <button @click="fetchVisaExtensionTypes">Refresh List</button>
    <button @click="goHome">Go to Home</button>
  </div>
</template>

<script>
import { getVisaExtensionTypes, deleteVisaExtensionType } from '../../../services/visaExtensionTypeService'

export default {
  name: 'VisaExtensionTypeList',
  data() {
    return {
      visaExtensionTypes: []
    }
  },
  async created() {
    await this.fetchVisaExtensionTypes()
  },
  methods: {
    async fetchVisaExtensionTypes() {
      try {
        this.visaExtensionTypes = await getVisaExtensionTypes()
      } catch (error) {
        alert('Error fetching visa extension types: ' + error.message)
      }
    },
    async deleteType(id) {
      if (confirm('Are you sure you want to delete this visa extension type?')) {
        try {
          await deleteVisaExtensionType(id)
          this.fetchVisaExtensionTypes() // Refresh the list after deletion
          alert('Visa extension type deleted successfully!')
        } catch (error) {
          alert('Error deleting visa extension type: ' + error.message)
        }
      }
    },
    editType(id) {
      // Redirect to edit page
      this.$router.push({ name: 'visa-extension-type-edit', params: { id } })
    },
    goHome() {
      // Redirect to home page
      this.$router.push({ name: 'home' })
    }
  }
}
</script>

<style scoped>
.visa-extension-type-list {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

button {
  padding: 5px 10px;
  font-size: 14px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-right: 5px;
}

button:hover {
  background-color: #0056b3;
}
</style>
