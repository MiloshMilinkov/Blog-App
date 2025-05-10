<template>
    <ul>
        <Post v-for="post in posts"
        :key="post.id" 
        :post-id="post.id"
        :title="post.title"
        :body="post.body"
        :createdAt="post.createdAt"
        :updatedAt="post.updatedAt"
        :author="post.author"
        @delete="deletePost"
        >
        </Post>
    </ul>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../../api/index.js'
import Post from './Post.vue'

const posts = ref([]);

onMounted(async () => {
const res = await api.get('/posts');
posts.value = res.data;
});

async function deletePost(id) {
  try {
    await api.delete(`/posts/${id}`);
    posts.value = posts.value.filter(p => p.id !== id);
  } catch (e) {
    console.error('Failed to delete', e);
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0 auto;
  padding: 0;
  width: 50%;
}
</style>
