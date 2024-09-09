import axios from 'axios'
import config from '../config.json' // Ensure the path is correct based on your project structure

export async function fetch90DayReportBusiness(searchString, page, size, status) {
  try {
    const token = sessionStorage.getItem('authToken')
    if (!token) {
      throw new Error('Authentication token is missing. Please log in.')
    }

    const response = await axios.get(`${config.baseurl}report90day/getAllReport90DayVisa`, {
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

export async function update90DayReportBusiness(id, newStatus) {
  try {
    const token = sessionStorage.getItem('authToken')
    if (!token) {
      throw new Error('Authentication token is missing. Please log in.')
    }

    let endpoint = ''

    // Determine which API endpoint to call based on the status
    if (newStatus === 'Cancel_Order') {
      endpoint = `report90day/cancelOrder/${id}`
    } else if (newStatus === 'ON_PROGRESS') {
      endpoint = `report90day/onProgress/${id}`
    } else if (newStatus === 'COMPLETED') {
      endpoint = `report90day/completed/${id}`
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

export async function getReport90DayOrderBySysKey(sysKey) {
  const token = sessionStorage.getItem('authToken');
  return axios.get(`${config.baseurl}report90day/getReport90DayOrderById/${sysKey}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}
