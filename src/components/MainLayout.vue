<template>
  <div :class="['main-layout', { collapsed: isCollapsed }]">
    <SidebarNav @toggle="handleToggle" />
    <!-- Include the sidebar navigation -->
    <div class="content">
      <router-view />
      <!-- This is where the main content of each page will be rendered -->
    </div>
  </div>
</template>

<script>
import SidebarNav from './SidebarNav.vue' // Ensure the path is correct

export default {
  data() {
    return {
      isCollapsed: false
    }
  },
  components: {
    SidebarNav
  },
  methods: {
    handleToggle() {
      this.isCollapsed = !this.isCollapsed
    }
  }
}
</script>

<style scoped>
.main-layout {
  display: flex;
  height: 100vh;
}

.main-layout.collapsed .content {
  margin-left: 60px; /* Adjust this based on the collapsed width */
}

.content {
  flex-grow: 1;
  padding: 20px;
  background-color: #f0f2f5;
  overflow-y: auto;
}
</style>
