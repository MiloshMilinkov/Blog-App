<template>
  <BaseCard v-if="isLoaded">
    <div v-if="errorMessages.length" class="mb-4">
      <p v-for="(msg, i) in errorMessages" :key="i">
        {{ msg }}
      </p>
    </div>
    <form @submit.prevent="updatePost">
      <header>
        <h2>Edit Post</h2>
      </header>
      <div class="title_container">
        <label for="title">Title</label>
        <input
        id="title"
        v-model="form.title"
        type="text"
        required
        />
      </div>

      <div class="body_container">
        <label for="body">Body</label>
        <textarea
        id="body"
        v-model="form.body"
        rows="6"
        required
        />
      </div>

      <div class="mb-4">
        <label>Author</label>
        <p>{{ post.author.username }}</p>
      </div>

      <div >
        <BaseButton type="button" @click="goBack">Cancel</BaseButton>
        <BaseButton type="submit">Save Changes</BaseButton>
      </div>
    </form>
  </BaseCard>

  <p v-else>Loading post for editing…</p>
</template>
  
<script setup>
  import { ref, reactive, onMounted  } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import BaseCard from '../UI/BaseCard.vue';
  import BaseButton from '../UI/BaseButton.vue';
  import api from '../../api/index.js';
  import { useNotification } from '../../helper/toastNotification.js';

  const route  = useRoute();
  const router = useRouter();
  const post    = ref(null);
  const isLoaded = ref(false);
  const errorMessages = ref([]);
  const form = reactive({
    title: '',
    body: '',
  });
  const { notify } = useNotification()
  
  onMounted(async () => {
    try {
      const res = await api.get(`/posts/${route.params.id}`);
      post.value = res.data;
    
      form.title = post.value.title;
      form.body  = post.value.body;

      isLoaded.value = true;
    } catch (err) {
      console.error('Failed to fetch post:', err);
      router.push({ name: 'Home' });
    }
  });
  
  async function updatePost() {
    errorMessages.value = [];
    try {
      await api.patch(`/posts/${route.params.id}`, {
        title: form.title,
        body:  form.body
      });
      notify('success', 'Post edited successfully.')
      router.push({ name: 'Home' });
    } catch (err) {
    const data = err.response?.data;
    if (Array.isArray(data?.errors)) {
      errorMessages.value = data.errors.map(e => e.msg);
    } else {
      errorMessages.value = [data?.error || data?.message || 'Update failed'];
    }
  }
}
  
function goBack() {
  router.back(); 
}
</script>
  
<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.title_container,
.body_container,
.mb-4 {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

input,
textarea {
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 0.75rem;
  font-size: 1rem;
  background-color: var(--color-surface);
  color: var(--color-text);
  transition: background-color 0.2s;
}

input:focus,
textarea:focus {
  background-color: #eceaea;
  outline: none;
}

label {
  font-weight: 600;
  color: var(--color-muted);
}

form > div:last-child {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}
</style>
  