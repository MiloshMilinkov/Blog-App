<template>
  <BaseCard v-if="post">
    <header><h2>{{ post.title }}</h2></header>
    <p>{{ post.body }}</p>
    <p>Author: {{ post.author.username }}</p>
    <p>Created: {{ dateFormat(post.createdAt) }}</p>
    <p>Updated: {{ dateFormat(post.updatedAt) }}</p>
    <BaseButton @click="goBack">Back to list</BaseButton>
  </BaseCard>
  <p v-else>Loading post detail…</p>
</template>
  
<script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import BaseCard from '../UI/BaseCard.vue';
  import BaseButton from '../UI/BaseButton.vue';
  import api from '../../api/index.js';
  import dateFormat from '../../helper/dateFormat.js'

  const route  = useRoute();
  const router = useRouter();
  const post = ref(null);
  
  onMounted(async () => {
    try {
      const res = await api.get(`/posts/${route.params.id}`);
      post.value = res.data;
    } catch (err) {
      console.error(err);
    }
  });
  
  function goBack() {
    router.push({ name: 'Home' });
  }
  </script>
  