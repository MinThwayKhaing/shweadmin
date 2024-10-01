import axios from 'axios'
import config from '../config.json' // Ensure the path is correct based on your project structure

export async function updateCarOrder(sysKey, formData) {
  const token = sessionStorage.getItem('authToken')
  return axios.put(`${config.baseurl}carOrders/updateCarOrderFromAdmin/${sysKey}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export async function fetchCarRent(searchString, page, size) {
  try {
    const token = sessionStorage.getItem('authToken')
    // Check if the token exists before making the request
    if (!token) {
      throw new Error('Authentication token is missing. Please log in.')
    }

    const response = await axios.get(`${config.baseurl}carRent/showAllCarsAndSearch`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        searchString,
        page,
        size
      }
    })
    console.log('API Response:', response.data)
    // Return the list of CarRent, assuming it's paginated in `content`
    return response.data.content || [] // Return an empty array if no content
  } catch (err) {
    console.error('Failed to load CarRent:', err)

    // Check if the error is due to authentication
    if (err.response && err.response.status === 401) {
      throw new Error('Unauthorized access. Please log in again.')
    }

    // Throw a general error if it's a different issue
    throw new Error('Failed to load CarRent')
  }
}

export async function saveCarRent(formData) {
  try {
    const token = sessionStorage.getItem('authToken')

    // Check if the token exists before making the request
    if (!token) {
      throw new Error('Authentication token is missing. Please log in.')
    }

    const response = await axios.post(`${config.baseurl}carRent/carRentSave`, formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    // Return the response data from the backend
    return response
  } catch (err) {
    console.error('Failed to create CarRent:', err)

    // Check if the error is due to authentication
    if (err.response && err.response.status === 401) {
      throw new Error('Unauthorized access. Please log in again.')
    }

    // Throw a general error if it's a different issue
    throw new Error('Failed to create CarRent')
  }
}

export async function deleteCarRent(id) {
  try {
    const token = sessionStorage.getItem('authToken')

    // Check if the token exists before making the request
    if (!token) {
      throw new Error('Authentication token is missing. Please log in.')
    }

    const response = await axios.delete(`${config.baseurl}carRent/deleteCar/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    // Return the response data from the backend
    return response.data
  } catch (err) {
    console.error('Failed to delete translator:', err)

    // Check if the error is due to authentication
    if (err.response && err.response.status === 401) {
      throw new Error('Unauthorized access. Please log in again.')
    }

    // Throw a general error if it's a different issue
    throw new Error('Failed to delete translator')
  }
}

export async function getCarById(id) {
  const token = sessionStorage.getItem('authToken')
  return axios.get(`${config.baseurl}carRent/getCarById/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
export async function fetchCarOrderDetailsBySysKey(sysKey) {
  const token = sessionStorage.getItem('authToken')
  try {
    const response = await axios.get(`${config.baseurl}carOrders/details/${sysKey}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response
  } catch (err) {
    console.error('Failed to fetch car order details:', err)
    throw new Error('Failed to fetch car order details')
  }
}
export async function updateCarRent(id, formData) {
  const token = sessionStorage.getItem('authToken')
  return axios.put(`${config.baseurl}carRent/updateCarRent/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`
      // No need to set 'Content-Type' manually; let the browser set it
    }
  })
}
