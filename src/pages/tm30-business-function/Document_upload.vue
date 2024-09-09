<template>
    <div  v-if="businessService"  class="upload-document">
      <h1>Upload Documents</h1>
      <form @submit.prevent="submitDocuments">
          
        <div class="form-group">
          <label>Order Id:</label>
          <input v-model="businessService.order_id" type="text" readonly />
        </div>

        <!-- <div class="form-group">
          <label>Period:</label>
          <input v-model="businessService.period" type="text"  readonly/>
        </div> -->

      <!-- Example for TM30 Business Image Display -->
      <div class="form-group">
        <label>Passport Preview:</label>
        <img
          :src=" imagePreview ||businessService.passportBio || 'https://example.com/default-business-image.jpg'"
          alt="Business Image"
          class="business-image"
        />
      </div>

      <div class="form-group">
        <label>Visa Preview:</label>
        <img
          :src=" imagePreview ||businessService.visaPage || 'https://example.com/default-business-image.jpg'"
          alt="Business Image"
          class="business-image"
        />
      </div>

      <div class="form-group">
        <label>User Name:</label>
        <input v-model="businessService.userName" type="text" readonly />
      </div>

      <div class="form-group">
        <label>Contact Number:</label>
        <input v-model="businessService.contactNumber" type="text" readonly />
      </div>

        <div class="form-group">
          <label>Upload Images:</label>
          <input type="file" multiple @change="handleFileUpload" />
          <div class="image-previews">
            <div v-for="(file, index) in selectedFiles" :key="index" class="image-preview">
              <img :src="file.preview" :alt="'Image ' + index" class="preview-img" />
              <button type="button" @click="removeFile(index)" class="remove-file">×</button>
            </div>
          </div>
        </div>
        <button type="submit">Upload</button>
      </form>
      <div v-if="loading" class="loading">Loading...</div>
      <div v-if="error" class="error">{{ error }}</div>
      <div v-if="success" class="success">{{ success }}</div>
    </div>
  </template>
  
  <script>
  import {getOrderBySysKey, updateTM30Business } from '../../../services/tm30businessService';
  import { getReport90DayOrderBySysKey, update90DayReportBusiness} from '../../../services/90DayReportbusinessService';
  import { getVisaServiceSysKey, updateVisaServiceBusiness } from '../../../services//visaService';
  import { getEmbassyLetterSysKey, updateEmbassyLetter } from '../../../services/embassyLetterbusinessService';
  import { saveDocuments } from '../../../services/uploadDocumentService';

  export default {
    data() {
      return {
        businessService: null,
        selectedFiles: [],
        loading: false,
        error: null,
        success: null// Ensure sysKey is retrieved from route parameters
      };
    },
    created() {
    this.loadBusinessDetails();
    },
    methods: {


      async loadBusinessDetails() {
      const sysKey = this.$route.params.sysKey
      const prefix = sysKey.substring(0, 2); // Extracts "ER"
      console.log("SysKey is " + sysKey)
      this.loading = true
      this.error = null

      try {
        let response = null;

        switch(prefix) {
          case 'TM': //TM30 Business
          response = await getOrderBySysKey(sysKey);
          this.businessService = response.data;
          break;

          case 'RP': //90DayReport Business
          response = await getReport90DayOrderBySysKey(sysKey);
          this.businessService = response.data;
          break;

          case 'VE': //VisaExtension Business
          response = await getVisaServiceSysKey(sysKey);
          this.businessService = response.data;
          break;

          case 'ER': //EmbassyReport Business
          response = await getEmbassyLetterSysKey(sysKey);
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
          const reader = new FileReader();
          reader.onload = (e) => {
            file.preview = e.target.result;
            this.selectedFiles.push(file);
          };
        reader.readAsDataURL(file);
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
  