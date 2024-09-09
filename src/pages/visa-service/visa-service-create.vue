<template>
    <div class="visa-service-create">
      <h1>Create Visa Service</h1>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="type">Image</label>
          <div class="form-group">
            <label>Upload Image</label>
            <input type="file" @change="handleImageUpload" accept=".jpeg, .png, .jpg, .pdf, .doc" />
            <img
              v-if="imagePreview"
              :src="imagePreview"
              alt="Visa Image"
              class="visa-image"
            />
          </div>
        </div>
        <div class="form-group">
          <label for="name">Name</label>
          <input
            type="text"
            id="name"
            v-model="form.name"
            required
            placeholder="Enter name"
          />
          <label for="description">Description:</label>
          <input
            type="text"
            id="description"
            v-model="form.description"
            required
            placeholder="Enter description"
          />
        </div>
        <button type="submit">Save Visa Service</button>
        <button type="button" @click="goHome">Cancel</button>
      </form>
    </div>
  </template>
  
  <script>
  import { saveVisa } from '../../../services/visaService'
  
  export default {
    name: 'VisaServiceCreate',
    data() {
      return {
        form: {
          name: '',
          description: ''
        },
        image: null, // To hold the uploaded visa image
        imagePreview: null, // To hold the visa image preview URL
      }
    },
    methods: {
      handleImageUpload(event) {
        const file = event.target.files[0];
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf', 'application/msword'];

        // Check if the uploaded file type is allowed
        if(!allowedTypes.includes(file.type)) {
          alert('Unsupported file type! Please upload a JPEG, PNG, JPG, PDF, or DOC file.')
          this.image = null
          this.imagePreview = null
          event.target.value = '' // Clear the file input
          return
        }
        this.image = file
        this.imagePreview = URL.createObjectURL(file)
      },
      async submitForm() {
        try {
          const formData = new FormData()
          formData.append('image', this.image)
          formData.append('name',this.form.name)
          formData.append('description',this.form.description)
          formData.append(
            'request',
            new Blob([JSON.stringify(this.form)], { type: 'application/json' })
          )
          const response = await saveVisa(formData)
          console.log(formData);
          if (response.status === 200) {
            this.success = response.data // Show success message
            this.$router.push({ name: 'visa-service-list' }) // Redirect to list
          } else {
            this.error = response.data // Show the error message returned from backend
          }
        } catch (error) {
          alert('Error saving visa service: ' + error.message)
        }
      },
      goHome() {
        // Redirect to home page
        this.$router.push({ name: 'home' })
      },
    },
  }
  </script>
  
  <style scoped>
  .visa-service-create {
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
  input[type="number"],
  textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  textarea {
    resize: vertical;
    min-height: 80px;
  }
  
  input[type="number"] {
    -moz-appearance: textfield; /* Hide spin buttons in Firefox */
  }
  
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  .visa-image {
    width: 100px;
    height: 100px;
    object-fit: cover; /* Ensures the image covers the container without distortion */
    border-radius: 8px;
    margin-top: 10px;
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
    margin-right: 10px; /* Add margin to the right of each button */
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  