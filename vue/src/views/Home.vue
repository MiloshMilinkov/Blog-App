<template>
    <h1>All Posts</h1>
    <ul>
      <li v-for="post in posts" :key="post.id">
          {{ post.title }}
      </li>
    </ul>
</template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import api from '../api';
  
  const posts = ref([]);
  
  onMounted(async () => {
    const res = await api.get('/posts');
    posts.value = res.data;
  });
  </script>
  