<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body {
  height: 100vh;
  margin: 0px;
}
#app {
  height: 100%;
}

#app > div {
  height: 100%;
}
</style>
