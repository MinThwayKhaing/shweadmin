import axios from 'axios'
import config from '../config.json' // Ensure the path is correct based on your project structure

export async function fetchMainOrders(searchString, page, size, status) {
  try {
    const token = sessionStorage.getItem('authToken')
    if (!token) {
      throw new Error('Authentication token is missing. Please log in.')
    }

    const response = await axios.get(`${config.baseurl}main-orders/paginated`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        searchString,
        status,
        page,
        size
      }
    })

    return response.data.content || [] // Return an empty array if no content
  } catch (err) {
    console.error('Failed to load orders:', err)

    if (err.response && err.response.status === 401) {
      throw new Error('Unauthorized access. Please log in again.')
    }

    throw new Error('Failed to load orders')
  }
}

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

export async function getOrderBySysKey(sysKey) {
  const token = sessionStorage.getItem('authToken');
  return axios.get(`${config.baseurl}tm30/getOrderBySysKey/${sysKey}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

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