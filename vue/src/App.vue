<template>
  <div class="flex flex-col min-h-screen">
    <NavBar />
    <main class="flex-1">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import NavBar from './components/NavBar/NavBar.vue';
import Footer from './components/Footer/Footer.vue';
</script>
