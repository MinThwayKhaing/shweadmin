<template>
    <div class="report-90-day-visa-type-edit">
      <h1>Edit 90 Day Visa Type</h1>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="description">Description:</label>
          <input
            type="text"
            id="description"
            v-model="form.description"
            required
            placeholder="Enter description"
          />
        </div>
        <div class="form-group">
          <label for="price">Price:</label>
          <input
            type="number"
            id="price"
            v-model="form.price"
            required
            min="0"
            step="0.01"
            placeholder="Enter price"
          />
        </div>
        <button type="submit">Update 90 Day Visa Type</button>
        <button type="button" @click="goBack">Cancel</button>
      </form>
    </div>
  </template>
  
  <script>
  import { get90DayReportVisaTypeById, update90DayReportVisaType } from '../../../services/90DayReportVisaTypeService'
  
  export default {
    name: 'Report90DayVisaTypeEdit',
    data() {
      return {
        form: {
          description: '',
          price: 0
        }
      }
    },
    async created() {
      await this.fetchVisaType()
    },
    methods: {
      async fetchVisaType() {
        try {
          const id = this.$route.params.id
          const response = await get90DayReportVisaTypeById(id)
          this.form = response // Adjust based on response structure
        } catch (error) {
          alert('Error fetching 90 Day Visa Type: ' + error.message)
        }
      },
      async submitForm() {
        try {
          const id = this.$route.params.id
          await update90DayReportVisaType(id, this.form)
          alert('90 Day Visa Type updated successfully!')
          this.$router.push({ name: 'listReport90DayVisaType' }) // Redirect to list page
        } catch (error) {
          alert('Error updating 90 Day Visa Type: ' + error.message)
        }
      },
      goBack() {
        this.$router.push({ name: 'report-90-day-visa-type-list' }) // Redirect to list page
      }
    }
  }
  </script>
  
  <style scoped>
  .report-90-day-visa-type-edit {
    max-width: 600px;
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
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  input[type="text"],
  input[type="number"] {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  input[type="number"] {
    -moz-appearance: textfield; /* Hide spin buttons in Firefox */
  }
  
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  button {
    padding: 10px 20px;
    font-size: 16px;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-right: 10px;
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
  