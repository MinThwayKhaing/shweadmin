import axios from 'axios'
import config from '../config.json' // Ensure the path is correct based on your project structure

// Create a new Embassy Visa Type
export async function createEmbassyLetterType(formData) {
  try {
    const token = sessionStorage.getItem('authToken')
    if (!token) {
      throw new Error('Authentication token is missing. Please log in.')
    }

    const response = await axios.post(`${config.baseurl}embassy-visa-type/saveVisaType`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    return response.data // Assuming the backend returns some relevant response data
  } catch (err) {
    console.error('Failed to create Embassy Visa Type:', err)

    if (err.response && err.response.status === 401) {
      throw new Error('Unauthorized access. Please log in again.')
    }

    throw new Error('Failed to create Embassy Visa Type')
  }
}

// Delete an Embassy Visa Type by ID
export async function deleteEmbassyLetterType(visaTypeId) {
  try {
    const token = sessionStorage.getItem('authToken')
    if (!token) {
      throw new Error('Authentication token is missing. Please log in.')
    }

    await axios.delete(`${config.baseurl}embassy-visa-type/deleteVisaType/${visaTypeId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  } catch (err) {
    console.error('Failed to delete Embassy Visa Type:', err)

    if (err.response && err.response.status === 401) {
      throw new Error('Unauthorized access. Please log in again.')
    }

    throw new Error('Failed to delete Embassy Visa Type')
  }
}

// Get an Embassy Visa Type by ID
export async function getEmbassyLetterTypeById(id) {
  try {
    const token = sessionStorage.getItem('authToken')
    if (!token) {
      throw new Error('Authentication token is missing. Please log in.')
    }

    const response = await axios.get(`${config.baseurl}embassy-visa-type/getEmbassyVisaTypeById/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.data
  } catch (err) {
    console.error('Failed to get Embassy Visa Type by ID:', err)

    if (err.response && err.response.status === 401) {
      throw new Error('Unauthorized access. Please log in again.')
    }

    throw new Error('Failed to get Embassy Visa Type by ID')
  }
}

// Update an existing Embassy Visa Type
export async function updateEmbassyLetterType(id, formData) {
  try {
    const token = sessionStorage.getItem('authToken')
    if (!token) {
      throw new Error('Authentication token is missing. Please log in.')
    }

    const response = await axios.put(`${config.baseurl}embassy-visa-type/updateVisaType/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    return response.data
  } catch (err) {
    console.error('Failed to update Embassy Visa Type:', err)

    if (err.response && err.response.status === 401) {
      throw new Error('Unauthorized access. Please log in again.')
    }

    throw new Error('Failed to update Embassy Visa Type')
  }
}

// Get all Embassy Visa Types
export async function getEmbassyLetterTypes() {
  try {
    const token = sessionStorage.getItem('authToken')
    if (!token) {
      throw new Error('Authentication token is missing. Please log in.')
    }

    const response = await axios.get(`${config.baseurl}embassy-visa-type/getAllVisaType`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.data
  } catch (err) {
    console.error('Failed to get all Embassy Visa Types:', err)

    if (err.response && err.response.status === 401) {
      throw new Error('Unauthorized access. Please log in again.')
    }

    throw new Error('Failed to get all Embassy Visa Types')
  }
}
