<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<template>
  <nav class="sidebar-nav" :class="{ collapsed: isCollapsed }">
    <button class="close-button" @click="toggleSidebar">
      <span v-if="!isCollapsed">×</span>
      <span v-else>☰</span>
    </button>
    <div v-if="!isCollapsed" class="user-info">
      <img :src="userImage" alt="User Image" class="user-image" v-if="userImage" />
      <div class="user-details">
        <h4>{{ userName }}</h4>
        <p>{{ userEmail }}</p>
      </div>
    </div>
    <div v-if="!isCollapsed" v-for="(item, index) in navItems" :key="index" class="nav-item">
      <div @click="toggleSubNav(index)" class="main-nav">
        <span :class="item.icon"></span> {{ item.title }}
      </div>
      <div v-if="activeMainNav === index" class="sub-nav">
        <router-link
          v-for="subItem in item.subNav"
          :key="subItem.title"
          :to="subItem.route"
          class="sub-nav-item"
          :class="{ active: isActive(subItem.route) }"
        >
          {{ subItem.title }}
        </router-link>
      </div>
    </div>
    <div v-if="!isCollapsed" class="settings">
      <!-- ? <router-link to="/settings"> <span class="icon-settings"></span> Settings </router-link> -->
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      userName: '',
      userEmail: '',
      userImage: '',
      activeMainNav: null,
      isCollapsed: false, // State to manage sidebar collapse
      navItems: [
        {
          title: 'Translators',
          icon: 'icon-translator',
          subNav: [
            { title: 'Create', route: '/translators/create' },
            { title: 'List', route: '/translators/list' }
          ]
        },
        {
          title: 'Car',
          icon: 'icon-car',
          subNav: [
            { title: 'Create', route: '/carrent/create' },
            { title: 'List', route: '/carrent/list' }
          ]
        },
        {
          title: 'Visa Services',
          icon: 'icon-visa',
          subNav: [
            { title: 'Create', route: '/visa/create' },
            { title: 'List', route: '/visa/list' }
          ]
        }
      ],
      activeRoute: ''
    }
  },
  created() {
    this.loadUserData()
  },
  methods: {
    toggleSubNav(index) {
      this.activeMainNav = this.activeMainNav === index ? null : index
    },
    isActive(route) {
      return this.activeRoute === route
    },
    loadUserData() {
      const user = JSON.parse(sessionStorage.getItem('user'))
      if (user) {
        this.userName = user.username
        this.userEmail = user.phoneNumber
        this.userImage = user.image || '' // Assuming 'image' is the URL or base64 string
      }
    },
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed
    }
  }
}
</script>

<style scoped>
.sidebar-nav {
  width: 250px;
  background-color: #f8f9fa;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: width 0.3s ease;
}

.sidebar-nav.collapsed {
  width: 60px; /* Adjust as needed */
}

.close-button {
  align-self: flex-end;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  margin-bottom: 10px;
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.user-image {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.user-details h4 {
  margin: 0;
}

.user-details p {
  margin: 0;
  color: gray;
}

.nav-item {
  margin-bottom: 10px;
}

.main-nav {
  cursor: pointer;
  padding: 10px;
  border-radius: 8px;
  background-color: #e9ecef;
  margin-bottom: 5px;
}

.sub-nav {
  padding-left: 20px;
}

.sub-nav-item {
  display: block;
  padding: 8px;
  margin: 5px 0;
  border-radius: 8px;
  text-decoration: none;
  color: #333;
  transition:
    background-color 0.3s,
    color 0.3s;
}

.sub-nav-item:hover {
  background-color: #d6d8db;
}

.sub-nav-item.active {
  background-color: #007bff;
  color: #fff;
}

.settings {
  margin-top: auto;
  border-top: 1px solid #ddd;
  padding-top: 10px;
}
</style>
