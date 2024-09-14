<template>
  <div v-if="businessService" class="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
    <h1 class="text-2xl font-bold mb-6">Upload Documents</h1>
    <form @submit.prevent="submitDocuments">
      
      <!-- Order ID -->
      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-2">Order Id:</label>
        <input v-model="sysKey" type="text" readonly class="w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed" />
      </div>

      <!-- Passport Preview -->
      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-2">Passport Preview:</label>
        <img
          :src="imagePreview || businessService.passportBio || 'https://example.com/default-business-image.jpg'"
          alt="Passport Image"
          class="w-40 h-40 object-cover rounded-md border"
        />
      </div>

      <!-- Visa Preview -->
      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-2">Visa Preview:</label>
        <img
          :src="imagePreview || businessService.visaPage || 'https://example.com/default-business-image.jpg'"
          alt="Visa Image"
          class="w-40 h-40 object-cover rounded-md border"
        />
      </div>

      <!-- User Name -->
      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-2">User Name:</label>
        <input v-model="businessService.userName" type="text" readonly class="w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed" />
      </div>

      <!-- Contact Number -->
      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-2">Contact Number:</label>
        <input v-model="businessService.contactNumber" type="text" readonly class="w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed" />
      </div>

      <!-- File Upload -->
      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-2">Upload Images:</label>
        <input type="file" multiple @change="handleFileUpload" class="w-full p-2 border rounded-md" />
        <div class="flex m-4">
          <div v-for="(file, index) in selectedFiles" :key="index" class="relative mr-4">
            <img :src="file.preview" :alt="'Image ' + index" class="w-40 h-40 object-cover rounded-md border" />
            <div>{{ file.name }}</div>
            <button type="button" @click="removeFile(index)" class="absolute top-[-5px] left-[145px] bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center z-10">×</button>
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <button type="submit" class="w-full p-3 bg-yellow-500 text-yellow-950 font-bold rounded-md hover:bg-yellow-700 transition">Upload</button>
    </form>

    <!-- Loading and Status Messages -->
    <div v-if="loading" class="mt-4 text-blue-600">Loading...</div>
    <div v-if="error" class="mt-4 text-red-600">{{ error }}</div>
    <div v-if="success" class="mt-4 text-green-600">{{ success }}</div>
  </div>
</template>

  
  <script>
  import {getOrderBySysKey, updateTM30Business } from '../../../services/tm30businessService';
  import { getReport90DayOrderBySysKey, update90DayReportBusiness} from '../../../services/90DayReportbusinessService';
  import { getVisaServiceSysKey, updateVisaServiceBusiness } from '../../../services//visaService';
  import { getEmbassyLetterSysKey, updateEmbassyLetter } from '../../../services/embassyLetterbusinessService';
  import { saveDocuments } from '../../../services/uploadDocumentService';
  import pdfLogoUrl from '@/assets/pdffile.svg'; // Import the SVG file


  export default {
    data() {
      return {
        businessService: null,
        selectedFiles: [],
        loading: false,
        error: null,
        success: null,// Ensure sysKey is retrieved from route parameters
        sysKey: null,
        prefix: null,
        pdfLogoUrl,
      };
    },
    created() {
    this.loadBusinessDetails();
    },
    methods: {


      async loadBusinessDetails() {
      this.sysKey = this.$route.params.sysKey
      
      this.prefix = this.sysKey.substring(0, 2); // Extracts "ER"
      
      console.log("SysKey is " + this.sysKey)
      this.loading = true
      this.error = null

      try {
        let response = null;

        switch(this.prefix) {
          case 'TM': //TM30 Business
          response = await getOrderBySysKey(this.sysKey);
          this.businessService = response.data;
          break;

          case 'RP': //90DayReport Business
          response = await getReport90DayOrderBySysKey(this.sysKey);
          this.businessService = response.data;
          break;

          case 'VE': //VisaExtension Business
          response = await getVisaServiceSysKey(this.sysKey);
          this.businessService = response.data;
          break;

          case 'ER': //EmbassyReport Business
          response = await getEmbassyLetterSysKey(this.sysKey);
          this.businessService = response.data;
          break;

          default:
          throw new Error('Invalid sysKey prefix');

        }
        console.log("Response is " + response.data)
      } catch (err) {
        this.error = 'Failed to load business details.'
      } finally {
        this.loading = false
      }
    },


    handleFileUpload(event) {
        const files = Array.from(event.target.files);
        
        
        files.forEach((file) => {
          if (file.type === 'application/pdf') {
            file.preview = pdfLogoUrl; // Set the PDF logo for PDF files
            this.selectedFiles.push(file);
            
          } else {
            // Generate image preview
            const reader = new FileReader();
            reader.onload = (e) => {
            file.preview = e.target.result;
            this.selectedFiles.push(file);
          };
          reader.readAsDataURL(file);
          return;
          }
        });
    },


    removeFile(index) {
      this.selectedFiles.splice(index, 1);
    },


    async submitDocuments() {
      this.loading = true;
      this.error = null;
      this.success = null;

      try {
        const formData = new FormData();
        this.selectedFiles.forEach((file) => {
          formData.append('images', file);
        });
        
        // Retrieve the sysKey from route parameters
        

        // Upload documents
        await saveDocuments(this.sysKey,formData);
        
        // Update the status to Completed
        switch (this.prefix) {
          case 'TM': //TM30 Business
            await updateTM30Business(this.businessService.id, 'COMPLETED');
          break;

          case 'RP': //90DayReport Business
            await update90DayReportBusiness(this.businessService.id, 'COMPLETED');
          break;

          case 'VE': //VisaExtension Business
            await updateVisaServiceBusiness(this.businessService.id, 'COMPLETED');
          break;

          case 'ER': //EmbassyReport Business
            await updateEmbassyLetter(this.businessService.id, 'COMPLETED');
          break;

          default:
          throw new Error('Invalid sysKey prefix');

        }
        this.success = 'Documents uploaded and status updated to Completed successfully.';
        this.selectedFiles = []; // Clear the selected files

        // Navigate back to the main order list
        this.$router.push({ name: 'tm30-business-list' }); // Adjust the route name as necessary
      } catch (error) {
        this.error = error.message || 'Failed to upload documents.';
        console.error('Error:', error);
      } finally {
        this.loading = false;
      }
    }
,
    },
  };
  </script>
  
  
  <style scoped>
  .upload-document {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background: #f9f9f9;
  }
  
  .upload-document h1 {
    margin-bottom: 20px;
    text-align: center;
  }
  
  .upload-document .form-group {
    margin-bottom: 15px;
  }
  
  .upload-document input[type="file"] {
    display: block;
    margin: 20px auto;
  }
  
  .upload-document .image-previews {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 10px;
  }
  
  .upload-document .image-preview {
    position: relative;
    display: inline-block;
  }
  
  .upload-document .preview-img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .upload-document .remove-file {
    position: absolute;
    top: 5px;
    right: 5px;
    background: none;
    border: none;
    color: red;
    font-size: 20px;
    cursor: pointer;
  }
  
  .upload-document button {
    display: block;
    width: 100%;
    padding: 10px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .upload-document button:hover {
    background-color: #218838;
  }
  
  .upload-document .loading {
    text-align: center;
    font-weight: bold;
  }
  
  .upload-document .error {
    color: red;
    text-align: center;
    font-weight: bold;
  }
  
  .upload-document .success {
    color: green;
    text-align: center;
    font-weight: bold;
  }
  </style>
  