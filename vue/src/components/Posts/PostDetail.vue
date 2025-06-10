<template>
  <BaseCard v-if="post" class="max-w-3xl mx-auto mt-16 p-8">
    <header class="border-b pb-1 border-[--color-border]">
      <h2 class="text-3xl text-[--color-accent-dark] mb-3">{{ post.title }}</h2>
    </header>
    <p class="m-1.5 text-[--color-text]">{{ post.body }}</p>
    <p class="m-1.5 text-[--color-text]">Author: {{ post.author.username }}</p>
    <p class="m-1.5 text-[--color-text]">Created: {{ dateFormat(post.createdAt) }}</p>
    <p class="m-1.5  text-[--color-text]">Updated: {{ dateFormat(post.updatedAt) }}</p>
    <div class="flex justify-end space-x-4 pt-4">
      <BaseButton @click="goBack">Back to list</BaseButton>
    </div>

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