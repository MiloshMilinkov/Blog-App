<template>
  <NavBar></NavBar>
  <router-view />
  <Footer></Footer>
</template>

<script setup>
import NavBar from './components/NavBar/NavBar.vue';
import Footer from './components/Footer/Footer.vue';
</script>