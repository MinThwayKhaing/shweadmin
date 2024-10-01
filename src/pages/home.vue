<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="home">
    <div class="home-content">
      <section class="detailed-section">
        <h3 class="user-list-heading">User List</h3>
        <table class="user-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Username</th>
              <th>Phone Number</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in users" :key="user.username">
              <td>{{ index + 1 }}</td>
              <td>{{ user.username }}</td>
              <td>{{ user.phoneNumber }}</td>
              <td>{{ user.role }}</td>
              <td>
                <div class="action-buttons">
                  <button class="action-btn cursor-pointer p-2 rounded-lg mb-1 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 text-yellow-950 font-semibold shadow-xl" @click="editUser(user)">Edit</button>
                  <button class="action-btn cursor-pointer p-2 rounded-lg mb-1 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 text-yellow-950 font-semibold shadow-xl" @click="deleteUser(user)">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  </div>
</template>



<script>
import { getAllUsers } from '../../services/UserService';

export default {
  data() {
    return {
      users: []
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const data = await getAllUsers();
        this.users = data;
      } catch (error) {
        console.error('Error fetching users:', error.message);
        // You may also want to handle the error, e.g., show a notification to the user
      }
    }
  }
};
</script>

<style scoped>
.home {
  height: 100%;
  display: flex;
}

.home-content {
  flex-grow: 1;
  padding: 20px;
  background-color: #fff;
}

.home-header {
  background-color: #f1f1f1;
  color: #000;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
}

.detailed-section {
  text-align: center; /* Center align the section content */
}

.user-list-heading {
  font-size: 24px; /* Larger font size for the heading */
  margin-bottom: 20px; /* Add some space below the heading */
}

.overview {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.card {
  background-color: #fff;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  padding: 20px;
  border-radius: 8px;
  flex: 1;
  margin-right: 10px;
}

.card:last-child {
  margin-right: 0;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  border-radius: 8px;
  overflow: hidden; /* Ensure the rounded corners */
}

.user-table th, .user-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

.user-table th {
  background-color: #f2f2f2;
  color: #333;
  text-align: center;
  font-weight: bold;
}

.user-table td {
  background-color: #fff;
  color: #555;
}

.user-table tbody tr:nth-child(odd) td {
  background-color: #f9f9f9;
}

.action-buttons {
  display: flex; /* Use flexbox to align items */
  justify-content: center; /* Center the buttons */
  gap: 10px; /* Add some space between buttons */
}


.action-btn {
  padding: 10px 15px; /* Adjust the padding for a better look */
  border: none; /* Remove the default border */
  border-radius: 5px; /* Round the corners */
  cursor: pointer; /* Change cursor to pointer */
  transition: background-color 0.3s, transform 0.2s; /* Smooth transitions for hover effects */
}

/* Style for Edit button */



</style>
