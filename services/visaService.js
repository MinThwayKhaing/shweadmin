import axios from 'axios';
import config from '../config.json'; // Ensure the path is correct based on your project structure

export async function fetchAllVisa() {
    try {
      const token = sessionStorage.getItem('authToken');
      if (!token) {
        throw new Error('Authentication token is missing. Please log in.');
      }
  
      const response = await axios.get(`${config.baseurl}visa/getAllVisa`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      return response.data;
    } catch (err) {
      console.error('Failed to load Visa:', err);
  
      if (err.response && err.response.status === 401) {
        throw new Error('Unauthorized access. Please log in again.');
      }
  
      throw new Error('Failed to load Visa');
    }
  }
  

// Save a new Visa entry
export async function saveVisa(formData) {
  try {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      throw new Error('Authentication token is missing. Please log in.');
    }

    const response = await axios.post(`${config.baseurl}visa/saveVisa`, formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response;
  } catch (err) {
    console.error('Failed to create Visa:', err);

    if (err.response && err.response.status === 401) {
      throw new Error('Unauthorized access. Please log in again.');
    }

    throw new Error('Failed to create Visa');
  }
}

// Delete a Visa entry by ID
export async function deleteVisa(id) {
  try {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      throw new Error('Authentication token is missing. Please log in.');
    }

    const response = await axios.delete(`${config.baseurl}visa/deleteVisa/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  } catch (err) {
    console.error('Failed to delete Visa:', err);

    if (err.response && err.response.status === 401) {
      throw new Error('Unauthorized access. Please log in again.');
    }

    throw new Error('Failed to delete Visa');
  }
}

// Get Visa details by ID
export async function getVisaById(id) {
  const token = sessionStorage.getItem('authToken');
  return axios.get(`${config.baseurl}visa/getVisaById/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

// Update an existing Visa entry by ID
export async function updateVisaService(id, formData) {
  const token = sessionStorage.getItem('authToken');
  return axios.put(`${config.baseurl}visa/updateVisa/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}
