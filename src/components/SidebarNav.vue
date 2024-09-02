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
    <!-- Main Navigation Items -->
    <div v-if="!isCollapsed">
      <div v-for="(mainNav, mainIndex) in mainNavItems" :key="mainIndex" class="main-nav-item">
        <div @click="toggleMainNav(mainIndex)" class="main-nav">
          <span :class="mainNav.icon"></span> {{ mainNav.title }}
        </div>
        <div v-if="activeMainNav === mainIndex" class="nav-item">
          <div v-for="(item, index) in mainNav.items" :key="index" class="nav-sub-item">
            <div @click="toggleSubNav(index)" class="main-nav">
              <span :class="item.icon"></span> {{ item.title }}
            </div>
            <div v-if="activeSubNav === index" class="sub-nav">
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
        </div>
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
      activeSubNav: null,
      isCollapsed: false, // State to manage sidebar collapse
      mainNavItems: [
        {
          title: 'Option',
          icon: 'icon-options',
          items: [
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
          title: 'News',
          icon: 'icon-news',
          subNav: [
            { title: 'Create', route: '/news/create' },
            { title: 'List', route: '/news/list' },

          ]
        },
            {
              title: 'Visa Services',
              icon: 'icon-visa',
              subNav: [
                { title: 'Create', route: '/visa/create' },
                { title: 'List', route: '/visa/list' }
              ]
            },
            {
              title: 'Visa Extension Type',
              icon: 'icon-visa-extension-type',
              subNav: [
                { title: 'Create', route: '/visa-extension-type/create' },
                { title: 'List', route: '/visa-extension-type/list' }
              ]
            },
            {
              title: 'Embassy Visa Type',
              icon: 'icon-embassy-letter-type',
              subNav: [
                { title: 'Create', route: '/embassy-letter-type/create' },
                { title: 'List', route: '/embassy-letter-type/list' }
              ]
            },
            {
              title: '90 Day Report Visa Type',
              icon: 'icon-embassy-letter-type',
              subNav: [
                { title: 'Create', route: '/Report90day-visa-type/create' },
                { title: 'List', route: '/Report90day-visa-type/list' }
              ]
            }
          ]
        },
        {
          title: 'Business',
          icon: 'icon-business',
          items: [
            {
              title: 'TM30',
              icon: 'icon-tm30',
              subNav: [
                { title: 'Create', route: '/tm30/create' },
                { title: 'List', route: '/tm30businesslist' }
              ]
            },
            {
              title: '90 Day Report',
              icon: 'icon-report-90day',
              subNav: [
                { title: 'Create', route: '/report90day/create' },
                { title: 'List', route: '/report90daybusinesslist' }
              ]
            },
            {
              title: 'Embassy Letter',
              icon: 'icon-embassy-letter',
              subNav: [
                { title: 'Create', route: '/embassyletter/create' },
                { title: 'List', route: '/embassyletterbusinesslist' }
              ]
            }
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
    toggleMainNav(index) {
      this.activeMainNav = this.activeMainNav === index ? null : index
    },
    toggleSubNav(index) {
      this.activeSubNav = this.activeSubNav === index ? null : index
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
/* Add your styles here */
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

.main-nav-item {
  margin-bottom: 10px;
}

.main-nav {
  cursor: pointer;
  padding: 10px;
  border-radius: 8px;
  background-color: #e9ecef;
  margin-bottom: 5px;
}

.nav-sub-item {
  margin-bottom: 10px;
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
