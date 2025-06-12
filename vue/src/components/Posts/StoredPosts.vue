<template>
    <div class="flex justify-center">
      <input
        v-model="searchTerm"
        type="search"
        placeholder="Search posts…"
        class="pl-3 pr-4 py-1.5 rounded-full w-100 bg-gray-100 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
        aria-label="Search posts"
      />
    </div>
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
        <li v-if="!posts.length" class="py-4 text-gray-500 text-center">
          No results for “{{ searchTerm }}”
        </li>
    </ul>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { debounce } from 'lodash-es'
import api from '../../api/index.js'
import Post from './Post.vue'

const posts = ref([])
const searchTerm = ref('')

async function fetchPosts(q = '') {
  const res = await api.get('/posts', { params: q ?{ search: q } : '' })
  posts.value = res.data
}

const debouncedFetch = debounce(fetchPosts, 500)

onMounted(() => fetchPosts())

watch(
  searchTerm,
  term => {
    if (term.trim().length === 0 || term.trim().length >= 3) {
      debouncedFetch(term.trim())
    }
  }
)

async function deletePost(id) {
  try {
    await api.delete(`/posts/${id}`)
    posts.value = posts.value.filter(p => p.id !== id)
  } catch (e) {
    console.error('Failed to delete', e)
  }
}
</script>