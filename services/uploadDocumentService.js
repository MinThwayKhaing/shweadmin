import axios from 'axios'
import config from '../config.json' // Ensure the path is correct based on your project structure


export async function saveDocuments( syskey,formData) {
    try {
      const token = sessionStorage.getItem('authToken');
  
      if (!token) {
        throw new Error('Authentication token is missing. Please log in.');
      }
  
      const response = await axios.post(`${config.baseurl}documents/saveDocuments/${syskey}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
  
      return response.data; // Return the response data from the backend
    } catch (err) {
      console.error('Failed to save documents:', err);
  
      if (err.response && err.response.status === 401) {
        throw new Error('Unauthorized access. Please log in again.');
      }
  
      throw new Error('Failed to save documents');
    }
  }
  
  export async function getDocumentsBySyskey(syskey) {
    const token = sessionStorage.getItem('authToken')
    return axios.get(`${config.baseurl}documents/getDocuments/${syskey}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }