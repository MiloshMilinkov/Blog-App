<template>
  <BaseCard v-if="isLoaded" class="max-w-xl mx-auto mt-16 p-8">
    <div v-if="errorMessages.length" class="mb-4">
      <p v-for="(msg, i) in errorMessages" :key="i">
        {{ msg }}
      </p>
    </div>
    <form @submit.prevent="updatePost" class="flex flex-col gap-5">
      <header>
        <h2 class="text-3xl text-[--color-text] font-bold">Edit Post</h2>
      </header>
      <div class="flex flex-col gap-1.5">
        <label for="title" class="text-[--color-text] font-semibold">Title</label>
        <input
        id="title"
        v-model="form.title"
        type="text"
        required
        class="border-1 border-[--color-border] p-2 rounded-lg focus:bg-[#eceaea]"
        />
      </div>

      <div class="flex flex-col gap-5">
        <label for="body" class="text-[--color-text] font-semibold">Body</label>
        <textarea
        id="body"
        v-model="form.body"
        rows="6"
        required
        class="border-1 border-[--color-border] p-2 rounded-lg focus:bg-[#eceaea]"
        />
      </div>

      <div class="flex flex-col gap-5">
        <label class="text-[--color-text] font-semibold">Author</label>
        <p>{{ post.author.username }}</p>
      </div>

      <div class="flex justify-end space-x-4 pt-4">
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
