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

export async function sendNotificationToken(notifToken) {
  try {
    const token = sessionStorage.getItem('authToken')
    if (!token) {
      throw new Error('Authentication token is missing. Please log in.')
    }
    await axios.post(
      `${config.baseurl}auth/save-notif-token`,
      {
        notifToken: notifToken
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    console.log('Notification token sent to backend successfully.')
  } catch (error) {
    console.error('Failed to send notification token:', error)
  }
}
