import axios from 'axios'
import config from '../config.json' // Adjust the path based on your project structure

export async function fetchNews(searchString, page, size) {
  try {
    const token = sessionStorage.getItem('authToken')

    if (!token) {
      throw new Error('Authentication token is missing. Please log in.')
    }

    const response = await axios.get(`${config.baseurl}news/showAllNews`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        searchString,
        page,
        size
      }
    })
    console.log('Response from servcie' + response)
    return response.data.content || [] // Return an empty array if no content
  } catch (err) {
    console.error('Failed to load news:', err)

    if (err.response && err.response.status === 401) {
      throw new Error('Unauthorized access. Please log in again.')
    }

    throw new Error('Failed to load news')
  }
}

export async function saveNews(formData) {
  try {
    const token = sessionStorage.getItem('authToken')

    if (!token) {
      throw new Error('Authentication token is missing. Please log in.')
    }

    const response = await axios.post(`${config.baseurl}news/saveNews`, formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.data // Return the response data from the backend
  } catch (err) {
    console.error('Failed to create news:', err)

    if (err.response && err.response.status === 401) {
      throw new Error('Unauthorized access. Please log in again.')
    }

    throw new Error('Failed to create news')
  }
}

export async function deleteNews(newsId) {
  try {
    const token = sessionStorage.getItem('authToken')

    if (!token) {
      throw new Error('Authentication token is missing. Please log in.')
    }

    const response = await axios.delete(`${config.baseurl}news/deleteNews/${newsId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.data // Return the response data from the backend
  } catch (err) {
    console.error('Failed to delete news:', err)

    if (err.response && err.response.status === 401) {
      throw new Error('Unauthorized access. Please log in again.')
    }

    throw new Error('Failed to delete news')
  }
}

export async function getNewsById(id) {
  try {
    const token = sessionStorage.getItem('authToken')

    if (!token) {
      throw new Error('Authentication token is missing. Please log in.')
    }

    const response = await axios.get(`${config.baseurl}news/getNewsById/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.data // Return the response data from the backend
  } catch (err) {
    console.error('Failed to load news by ID:', err)

    if (err.response && err.response.status === 401) {
      throw new Error('Unauthorized access. Please log in again.')
    }

    throw new Error('Failed to load news by ID')
  }
}

export async function updateNews(id, formData) {
  try {
    const token = sessionStorage.getItem('authToken')

    if (!token) {
      throw new Error('Authentication token is missing. Please log in.')
    }

    const response = await axios.put(`${config.baseurl}news/updateNews/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response // Return the response data from the backend
  } catch (err) {
    console.error('Failed to update news:', err)

    if (err.response && err.response.status === 401) {
      throw new Error('Unauthorized access. Please log in again.')
    }

    throw new Error('Failed to update news')
  }
}
