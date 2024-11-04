import axios from 'axios'
import config from '../config.json' // Ensure this path is correct for your project structure

// Utility function to get the auth token from sessionStorage
function getAuthToken() {
  return sessionStorage.getItem('authToken')
}

// Fetch translator orders by sysKey
export async function fetchTranslatorOrderBySysKey(sysKey) {
  try {
    const token = getAuthToken()
    if (!token) {
      throw new Error('Authentication token is missing. Please log in.')
    }

    const response = await axios.get(`${config.baseurl}translatorOrder/find-by-syskey/${sysKey}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.data // Return fetched order data
  } catch (err) {
    console.error('Failed to load translator order:', err)
    throw new Error(err.response?.data?.message || 'Failed to load translator order')
  }
}

// Update Translator Order
export async function updateTranslatorOrderFromAdmin(id, updatePayload) {
  console.log('id::', id)
  try {
    const token = getAuthToken()
    if (!token) {
      throw new Error('Authentication token is missing. Please log in.')
    }

    const response = await axios.put(
      `${config.baseurl}translatorOrder/updateOrderFromAdmin/${id}`,
      updatePayload,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    return response.data // Return the update response
  } catch (err) {
    console.error('Failed to update order:', err)
    throw new Error(err.response?.data?.message || 'Failed to update order')
  }
}

// Fetch translators by search string
export async function fetchTranslators(searchString, page, size) {
  try {
    const token = getAuthToken()
    if (!token) {
      throw new Error('Authentication token is missing. Please log in.')
    }

    const response = await axios.get(`${config.baseurl}translator/searchTranslator`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: { searchString, page, size }
    })

    return response.data.content || [] // Return the list of translators
  } catch (err) {
    console.error('Failed to load translators:', err)
    throw new Error(err.response?.data?.message || 'Failed to load translators')
  }
}

// Save new translator
export async function saveTranslator(formData) {
  try {
    const token = getAuthToken()
    if (!token) {
      throw new Error('Authentication token is missing. Please log in.')
    }

    const response = await axios.post(`${config.baseurl}translator/translatorSave`, formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response // Return the saved translator response
  } catch (err) {
    console.error('Failed to save translator:', err)
    throw new Error(err.response?.data?.message || 'Failed to save translator')
  }
}

// Update translator
export async function updateTranslator(id, formData) {
  try {
    const token = getAuthToken()
    if (!token) {
      throw new Error('Authentication token is missing. Please log in.')
    }

    const response = await axios.put(
      `${config.baseurl}translator/updateTranslator/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    return response.data // Return the updated translator response
  } catch (err) {
    console.error('Failed to update translator:', err)
    throw new Error(err.response?.data?.message || 'Failed to update translator')
  }
}

// Delete translator
export async function deleteTranslator(translatorId) {
  try {
    const token = getAuthToken()
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

    return response.data // Return the deletion confirmation
  } catch (err) {
    console.error('Failed to delete translator:', err)
    throw new Error(err.response?.data?.message || 'Failed to delete translator')
  }
}

// Get translator by ID
// export async function getTranslatorById(id) {
//   try {
//     const token = getAuthToken()
//     if (!token) {
//       throw new Error('Authentication token is missing. Please log in.')
//     }

//     const response = await axios.get(`${config.baseurl}translator/getTranslatorById/${id}`, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     })

//     return response.data // Return the translator by ID
//   } catch (err) {
//     console.error('Failed to load translator by ID:', err)
//     throw new Error(err.response?.data?.message || 'Failed to load translator by ID')
//   }
// }

export async function getTranslatorById(id) {
  const token = sessionStorage.getItem('authToken')
  try {
    return await axios.get(`${config.baseurl}translator/getTranslatorById/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  } catch (error) {
    console.error('Failed to detail translator:', error)
    throw new Error(error.response?.data?.message || 'Failed to detail translator')
  }
}
