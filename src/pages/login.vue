<!-- <template>
  <div class="h-screen w-screen flex items-center justify-center bg-gray-100">
    <h2 class="title">Login</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="phoneNumber">Phone Number</label>
        <input type="text" id="phoneNumber" v-model="phoneNumber" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
      <p v-if="errorMessage">{{ errorMessage }}</p>
    </form>
  </div>
</template> --> 

<template>
  <div class="h-screen w-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 class="title text-2xl font-semibold mb-6 text-center">Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label for="phoneNumber" class="block text-sm font-medium text-gray-700">Phone Number</label>
          <input type="text" id="phoneNumber" v-model="phoneNumber" required class="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" id="password" v-model="password" required class="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <button type="submit" class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors">Login</button>
        <p v-if="errorMessage" class="mt-4 text-red-500 text-sm">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import { login,sendNotificationToken } from '../../services/loginService'
import { messaging, getToken } from '../firebase'; // Import messaging and necessary functions
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Login',
  data() {
    return {
      phoneNumber: '',
      password: '',
      errorMessage: ''
    }
  },
  methods: {
    async handleLogin() {
      try {
        const data = await login(this.phoneNumber, this.password)
        console.log('Login successful:', data)
        sessionStorage.setItem('authToken', data.token)
        sessionStorage.setItem('refreshToken', data.refreshToken)
        sessionStorage.setItem('user', JSON.stringify(data.user))
        const notifToken = await this.getToken();
        if (notifToken) {
      // Send notifToken to backend
      await sendNotificationToken(notifToken);
    }
        this.$router.push({ name: 'home' })
      } catch (error) {
        this.errorMessage = error
      }
    },
    getToken() {
      getToken(messaging, { vapidKey: 'BJYXln9oYd2v5NJReG-Buks8eEI9AZjfVy3Qt0HOHuGUuqtyI20W9Q8ChKVOq3UuogzsgAQ_TgsSzKFJ7ld64iw' })
        .then((currentToken) => {
          if (currentToken) {
            console.log("Token received:", currentToken);
            sendNotificationToken(currentToken)
          } else {
            console.error('No registration token available. Request permission to generate one.');
          }
        })
        .catch((err) => {
          console.error('An error occurred while retrieving token. ', err);
        });
    }
  }
}
</script>

<style scoped>
body {
  background-color: #1e1e1e; /* Dark background for entire body */
  color: #ffffff; /* White text color for body */
  font-family: 'Arial', sans-serif;
}

.login-container {
  max-width: 400px;
  margin: auto;
  padding: 30px;
  border: 2px solid #d4af37; /* Gold border */
  border-radius: 10px;
  background-color: #2b2b2b; /* Slightly lighter dark background for contrast */
  color: #ffffff;
  text-align: center;
}

.title {
  font-size: 24px;
  margin-bottom: 20px;
  color: #d4af37; /* Gold color for title */
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #d4af37; /* Gold color for labels */
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid #d4af37; /* Gold border */
  background-color: #333333; /* Dark input background */
  color: #ffffff;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #d4af37; /* Gold button */
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #b3862b; /* Darker gold for hover */
}

p {
  color: #ff4d4f;
  margin-top: 10px;
  font-weight: bold;
}
</style>
