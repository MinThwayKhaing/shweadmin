<template>
    <div class="embassy-letter-type-list">
      <h1>Embassy Letter Types</h1>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="letterType in embassyLetterTypes" :key="letterType.id">
            <td>{{ letterType.description }}</td>
            <td>{{ letterType.price.toFixed(2) }}</td>
            <td>
              <button @click="editLetterType(letterType.id)">Edit</button>
              <button @click="deleteLetterType(letterType.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button @click="fetchEmbassyLetterTypes">Refresh List</button>
      <button @click="goHome">Go to Home</button>
    </div>
  </template>
  
  <script>
  import { getEmbassyLetterTypes, deleteEmbassyLetterType } from '../../../services/embassyLetterTypeService'
  
  export default {
    name: 'EmbassyLetterTypeList',
    data() {
      return {
        embassyLetterTypes: []
      }
    },
    async created() {
      await this.fetchEmbassyLetterTypes()
    },
    methods: {
      async fetchEmbassyLetterTypes() {
        try {
          this.embassyLetterTypes = await getEmbassyLetterTypes()
        } catch (error) {
          alert('Error fetching embassy letter types: ' + error.message)
        }
      },
      async deleteLetterType(id) {
        if (confirm('Are you sure you want to delete this embassy letter type?')) {
          try {
            await deleteEmbassyLetterType(id)
            this.fetchEmbassyLetterTypes() // Refresh the list after deletion
            alert('Embassy letter type deleted successfully!')
          } catch (error) {
            alert('Error deleting embassy letter type: ' + error.message)
          }
        }
      },
      editLetterType(id) {
        // Redirect to edit page or open edit modal
        this.$router.push({ name: 'embassy-letter-type-edit', params: { id } })
      },
      goHome() {
        // Redirect to home page
        this.$router.push({ name: 'home' })
      }
    }
  }
  </script>
  
  <style scoped>
  .embassy-letter-type-list {
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
  