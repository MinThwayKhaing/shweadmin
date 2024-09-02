import axios from 'axios'
import config from '../config.json' // Ensure the path is correct based on your project structure

// Fetch a list of visa extension types with pagination and optional search
export async function fetchVisaExtensionTypes(searchString, page, size) {
  try {
    const token = sessionStorage.getItem('authToken')
    if (!token) {
      throw new Error('Authentication token is missing. Please log in.')
    }

    const response = await axios.get(`${config.baseurl}visa-extension-type/searchVisaExtensionType`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        searchString,
        page,
        size
      }
    })

    return response.data.content || [] // Return an empty array if no content
  } catch (err) {
    console.error('Failed to load visa extension types:', err)

    if (err.response && err.response.status === 401) {
      throw new Error('Unauthorized access. Please log in again.')
    }

    throw new Error('Failed to load visa extension types')
  }
}

// Create a new visa extension type
export async function createVisaExtensionType(formData) {
  try {
    const token = sessionStorage.getItem('authToken')
    if (!token) {
      throw new Error('Authentication token is missing. Please log in.')
    }

    const response = await axios.post(`${config.baseurl}visa-extension-type/saveVisaType`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    return response.data // Assuming the backend returns some relevant response data
  } catch (err) {
    console.error('Failed to create visa extension type:', err)

    if (err.response && err.response.status === 401) {
      throw new Error('Unauthorized access. Please log in again.')
    }

    throw new Error('Failed to create visa extension type')
  }
}

// Delete a visa extension type by ID
export async function deleteVisaExtensionType(visaTypeId) {
  try {
    const token = sessionStorage.getItem('authToken')
    if (!token) {
      throw new Error('Authentication token is missing. Please log in.')
    }

    await axios.delete(`${config.baseurl}visa-extension-type/deleteVisaType/${visaTypeId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  } catch (err) {
    console.error('Failed to delete visa extension type:', err)

    if (err.response && err.response.status === 401) {
      throw new Error('Unauthorized access. Please log in again.')
    }

    throw new Error('Failed to delete visa extension type')
  }
}

// Get a visa extension type by ID
export async function getVisaExtensionTypeById(id) {
  const token = sessionStorage.getItem('authToken')
  return axios.get(`${config.baseurl}visa-extension-type/getVisaExtensionTypeById/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

// Update an existing visa extension type
export async function updateVisaExtensionType(id, formData) {
  const token = sessionStorage.getItem('authToken')
  return axios.put(`${config.baseurl}visa-extension-type/updateVisaType/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
}

export async function getVisaExtensionTypes() {
  try {
    const token = sessionStorage.getItem('authToken')
    if (!token) {
      throw new Error('Authentication token is missing. Please log in.')
    }

    const response = await axios.get(`${config.baseurl}visa-extension-type/getAllVisaType`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.data
  } catch (err) {
    console.error('Failed to get all visa extension types:', err)

    if (err.response && err.response.status === 401) {
      throw new Error('Unauthorized access. Please log in again.')
    }

    throw new Error('Failed to get all visa extension types')
  }
}

