<template>
  <div id="app">
    <!-- Navbar start here -->
   <Navbar/>
   <!-- Navbar end here -->
    <router-view />
  </div>
</template>

<script>
// import vue file here
import Navbar from '@/components/Navbar.vue';
export default {
  name: 'app',
  components: {
    Navbar,
  },
  data: () => ({
    //
  }),
}
</script>

<style>
@import './assets/css/style.css';
</style>
