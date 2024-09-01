import axios from 'axios';
import config from '../config.json'; // Ensure the path is correct based on your project structure

// Create a new 90 Day Report Visa Type
export async function create90DayReportVisaType(formData) {
  try {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      throw new Error('Authentication token is missing. Please log in.');
    }

    const response = await axios.post(`${config.baseurl}report-visa-type/save90DayReportType`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (err) {
    handleError(err, 'Failed to create 90 Day Report Visa Type');
  }
}

// Delete a 90 Day Report Visa Type by ID
export async function delete90DayReportVisaType(visaTypeId) {
  try {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      throw new Error('Authentication token is missing. Please log in.');
    }

    await axios.delete(`${config.baseurl}report-visa-type/delete90DayReportType/${visaTypeId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (err) {
    handleError(err, 'Failed to delete 90 Day Report Visa Type');
  }
}

// Get a 90 Day Report Visa Type by ID
export async function get90DayReportVisaTypeById(id) {
  try {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      throw new Error('Authentication token is missing. Please log in.');
    }

    const response = await axios.get(`${config.baseurl}report-visa-type/get90DatReportVisaTypeById/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  } catch (err) {
    handleError(err, 'Failed to get 90 Day Report Visa Type by ID');
  }
}

// Update an existing 90 Day Report Visa Type
export async function update90DayReportVisaType(id, formData) {
  try {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      throw new Error('Authentication token is missing. Please log in.');
    }

    const response = await axios.put(`${config.baseurl}report-visa-type/update90DayReportType/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (err) {
    handleError(err, 'Failed to update 90 Day Report Visa Type');
  }
}

// Get all 90 Day Report Visa Types
export async function get90DayReportVisaTypes() {
  try {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      throw new Error('Authentication token is missing. Please log in.');
    }

    const response = await axios.get(`${config.baseurl}report-visa-type/getAll90DayReportType`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  } catch (err) {
    handleError(err, 'Failed to get all 90 Day Report Visa Types');
  }
}

// Helper function to handle errors
const handleError = (err, message) => {
  console.error(message, err);
  if (err.response && err.response.status === 401) {
    throw new Error('Unauthorized access. Please log in again.');
  }
  throw new Error(message);
};
