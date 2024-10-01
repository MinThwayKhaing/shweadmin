import axios from 'axios';
import config from '../config.json'; 

export async function getAllUsers() {
  try {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      throw new Error('Authentication token is missing. Please log in.');
    }

    const response = await axios.get(`${config.baseurl}user/getAllUser`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  } catch (err) {
    console.error('Failed to load users:', err);

    if (err.response && err.response.status === 401) {
      throw new Error('Unauthorized access. Please log in again.');
    }

    throw new Error('Failed to load users');
  }
}
