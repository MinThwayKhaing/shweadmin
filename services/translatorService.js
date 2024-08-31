import axios from 'axios'
import config from '../config.json' // Ensure the path is correct based on your project structure

export async function fetchTranslators(searchString, page, size) {
  try {
    const token = sessionStorage.getItem('authToken')
    console.log('token', token)
    // Check if the token exists before making the request
    if (!token) {
      throw new Error('Authentication token is missing. Please log in.')
    }

    const response = await axios.get(`${config.baseurl}translator/searchTranslator`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        searchString,
        page,
        size
      }
    })

    // Return the list of translators, assuming it's paginated in `content`
    return response.data.content || [] // Return an empty array if no content
  } catch (err) {
    console.error('Failed to load translators:', err)

    // Check if the error is due to authentication
    if (err.response && err.response.status === 401) {
      throw new Error('Unauthorized access. Please log in again.')
    }

    // Throw a general error if it's a different issue
    throw new Error('Failed to load translators')
  }
}

export async function saveTranslator(formData) {
  try {
    const token = sessionStorage.getItem('authToken')

    // Check if the token exists before making the request
    if (!token) {
      throw new Error('Authentication token is missing. Please log in.')
    }

    const response = await axios.post(`${config.baseurl}translator/translatorSave`, formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    // Return the response data from the backend
    return response
  } catch (err) {
    console.error('Failed to create translator:', err)

    // Check if the error is due to authentication
    if (err.response && err.response.status === 401) {
      throw new Error('Unauthorized access. Please log in again.')
    }

    // Throw a general error if it's a different issue
    throw new Error('Failed to create translator')
  }
}

export async function deleteTranslator(translatorId) {
  try {
    const token = sessionStorage.getItem('authToken')

    // Check if the token exists before making the request
    if (!token) {
      throw new Error('Authentication token is missing. Please log in.')
    }

    const response = await axios.delete(
      `${config.baseurl}translator/deleteTranslator/${translatorId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

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

export async function getTranslatorById(id) {
  const token = sessionStorage.getItem('authToken')
  return axios.get(`${config.baseurl}translator/getTransaltorById/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export async function updateTranslator(id, formData) {
  const token = sessionStorage.getItem('authToken')
  return axios.put(`${config.baseurl}translator/updateTranslator/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`
      // No need to set 'Content-Type' manually; let the browser set it
    }
  })
}
