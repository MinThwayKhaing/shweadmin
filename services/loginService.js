import axios from 'axios'
import config from '../config.json'

export async function login(phoneNumber, password) {
  try {
    const response = await axios.post(`${config.baseurl}auth/login`, {
      phoneNumber,
      password
    })

    sessionStorage.setItem('authToken', response.data.token)
    sessionStorage.setItem('refreshToken', response.data.refreshToken)
    sessionStorage.setItem('user', JSON.stringify(response.data.user))

    return response.data
  } catch (error) {
    console.error('Login error:', error)
    // Throw error so that the calling component can handle it
    throw error.response?.data || 'An error occurred during login'
  }

  // "baseurl": "https://api.shweapps.com/api/v1/"
}
