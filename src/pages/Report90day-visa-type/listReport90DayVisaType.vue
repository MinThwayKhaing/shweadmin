<template>
    <div class="report-90-day-visa-type-list">
      <h1>90 Day Visa Types</h1>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="visaType in visaTypes" :key="visaType.id">
            <td>{{ visaType.description }}</td>
            <td>{{ visaType.price.toFixed(2) }}</td>
            <td>
              <button @click="editVisaType(visaType.id)">Edit</button>
              <button @click="deleteVisaType(visaType.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button @click="fetchVisaTypes">Refresh List</button>
      <button @click="goHome">Go to Home</button>
    </div>
  </template>
  
  <script>
  import { get90DayReportVisaTypes, delete90DayReportVisaType } from '../../../services/90DayReportVisaTypeService'
  
  export default {
    name: 'Report90DayVisaTypeList',
    data() {
      return {
        visaTypes: []
      }
    },
    async created() {
      await this.fetchVisaTypes()
    },
    methods: {
      async fetchVisaTypes() {
        try {
          this.visaTypes = await get90DayReportVisaTypes()
        } catch (error) {
          alert('Error fetching 90 Day Visa Types: ' + error.message)
        }
      },
      async deleteVisaType(id) {
        if (confirm('Are you sure you want to delete this 90 Day Visa Type?')) {
          try {
            await delete90DayReportVisaType(id)
            this.fetchVisaTypes() // Refresh list after deletion
            alert('90 Day Visa Type deleted successfully!')
          } catch (error) {
            alert('Error deleting 90 Day Visa Type: ' + error.message)
          }
        }
      },
      editVisaType(id) {
        this.$router.push({ name: 'editReport90DayVisaType', params: { id } })
      },
      goHome() {
        this.$router.push({ name: 'home' })
      }
    }
  }
  </script>
  
  <style scoped>
  .report-90-day-visa-type-list {
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
  
  thead {
    background-color: #007bff;
    color: #fff;
  }
  
  th, td {
    padding: 10px;
    text-align: left;
    border: 1px solid #ddd;
  }
  
  button {
    padding: 8px 16px;
    font-size: 14px;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 8px;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  button[type="button"] {
    background-color: #6c757d;
  }
  
  button[type="button"]:hover {
    background-color: #5a6268;
  }
  </style>
  