import axios from 'axios'
import config from '../config.json' // Ensure the path is correct based on your project structure

export async function fetchEmbassyLetter(searchString, page, size, status) {
  try {
    const token = sessionStorage.getItem('authToken')
    if (!token) {
      throw new Error('Authentication token is missing. Please log in.')
    }

    const response = await axios.get(`${config.baseurl}embassy-letter/getAllEmbassyVisaOrder`, {
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

export async function updateEmbassyLetter(id, newStatus) {
  try {
    const token = sessionStorage.getItem('authToken')
    if (!token) {
      throw new Error('Authentication token is missing. Please log in.')
    }

    let endpoint = ''

    // Determine which API endpoint to call based on the status
    if (newStatus === 'Cancel_Order') {
      endpoint = `embassy-letter/cancelOrder/${id}`
    } else if (newStatus === 'ON_PROGRESS') {
      endpoint = `embassy/onProgress/${id}`
    } else if (newStatus === 'COMPLETED') {
      endpoint = `embassy/completed/${id}`
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