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
</script>

<style scoped>
ul {
    list-style: none;
    margin: 0;
    padding: 0;
    margin: auto;
    max-width: 40rem;
}
</style>
