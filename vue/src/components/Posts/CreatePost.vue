<template>
  <BaseCard class="max-w-lg mx-auto mt-16 p-8">
    <form @submit.prevent="CreatePost" class="flex flex-col gap-5">
      <header>
        <h2 class="text-3xl text-[--color-text] font-bold">Create a Post</h2>
      </header>

      <div class="font-bold flex flex-col gap-1.5">
        <label for="title" class="text-[--color-text] font-semibold">Title</label>
        <input
          type="text"
          v-model="form.title"
          class="bg-green-100 border-2 border-[--color-border] rounded-lg p-3 text-base transition-colors focus:outline-none"
        />
      </div>
      <div v-if="errorMessages.length" class="mb-4 text-red-600">
        <p v-for="(msg, i) in errorMessages" :key="i">
          {{ msg.path === 'title' ? msg.msg : ''}}
        </p>
      </div>
      <div class="flex flex-col gap-1.5">
        <label for="body" class="text-[--color-text] font-semibold">Body</label>
        <textarea
          v-model="form.body"
          class="bg-green-100 border-2 border-[--color-border] rounded-lg p-3 text-base transition-colors focus:outline-none"
        />
      </div>
      <div v-if="errorMessages.length" class="mb-4 text-red-600">
        <p v-for="(msg, i) in errorMessages" :key="i">
          {{ msg.path === 'body' ? msg.msg : ''}}
        </p>
      </div>
      <div class="flex justify-end space-x-4 pt-4">
        <BaseButton type="button" @click="goBack">Cancel</BaseButton>
        <BaseButton type="submit">Post</BaseButton>
      </div>
    </form>
  </BaseCard>
</template>

  
<script setup>
  import { ref, reactive} from 'vue';
  import { useRouter } from 'vue-router';
  import BaseCard from '../UI/BaseCard.vue';
  import BaseButton from '../UI/BaseButton.vue';
  import api from '../../api/index.js';
  import { useNotification } from '../../helper/toastNotification.js';

 
  const router = useRouter();
  const errorMessages = ref([]);
  const form = reactive({
    title: '',
    body: '',
  });
  const { notify } = useNotification()

   async function CreatePost() {
    errorMessages.value = [];
    try {
      await api.post(`/posts`, {
        title: form.title,
        body:  form.body,
        author: '681534029deec520a926bd9d'
      });
      notify('success', 'Post created successfully.')
      router.push({ name: 'Home' });
    } catch (err) {
    const data = err.response?.data;
    if (Array.isArray(data?.errors)) {
      errorMessages.value = data.errors;
    } else {
      errorMessages.value = [data?.error || data?.message || 'Post creation failed.'];
    }
  }
} 
  
function goBack() {
  router.back(); 
}
</script>
  