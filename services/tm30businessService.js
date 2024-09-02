import axios from 'axios'
import config from '../config.json' // Ensure the path is correct based on your project structure

export async function fetchTM30Business(searchString, page, size, status) {
  try {
    const token = sessionStorage.getItem('authToken')
    if (!token) {
      throw new Error('Authentication token is missing. Please log in.')
    }

    const response = await axios.get(`${config.baseurl}tm30/getAllTm30`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        searchString,
        page,
        size,
        status // Pass the status to the backend
      }
    })

    return response.data.content || [] // Return an empty array if no content
  } catch (err) {
    console.error('Failed to load CarRent:', err)

    if (err.response && err.response.status === 401) {
      throw new Error('Unauthorized access. Please log in again.')
    }

    throw new Error('Failed to load CarRent')
  }
}

export async function updateTM30Business(id, newStatus) {
  try {
    const token = sessionStorage.getItem('authToken')
    if (!token) {
      throw new Error('Authentication token is missing. Please log in.')
    }

    let endpoint = ''

    // Determine which API endpoint to call based on the status
    if (newStatus === 'Cancel_Order') {
      endpoint = `tm30/cancelOrder/${id}`
    } else if (newStatus === 'ON_PROGRESS') {
      endpoint = `tm30/onProgress/${id}`
    } else if (newStatus === 'COMPLETED') {
      endpoint = `tm30/completed/${id}`
    } else {
      throw new Error('Invalid status')
    }

    const response = await axios.put(
      `${config.baseurl}${endpoint}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    return response.data
  } catch (err) {
    console.error('Failed to update TM30 status:', err)

    if (err.response && err.response.status === 401) {
      throw new Error('Unauthorized access. Please log in again.')
    }

    throw new Error('Failed to update TM30 status')
  }
}
