<template>
  <BaseCard>
    <form @submit.prevent="RegisterUser" class="flex flex-col gap-5">
      <header>
        <h2 class="text-3xl text-[--color-text] font-bold">Register</h2>
      </header>

      <div class="font-bold flex flex-col gap-1.5">
        <label for="title" class="text-[--color-text] font-semibold">Username</label>
        <input
          type="text"
          v-model="form.username"
          class="bg-green-100 border-2 border-[--color-border] rounded-lg p-3 text-base transition-colors focus:outline-none"
        />
      </div>
      <div v-if="errorMessages.length" class="mb-4 text-red-600">
        <p v-for="(msg, i) in errorMessages" :key="i">
          {{ msg.path === 'title' ? msg.msg : ''}}
        </p>
      </div>
      <div class="flex flex-col gap-1.5">
        <label for="body" class="text-[--color-text] font-semibold">Email</label>
        <textarea
          v-model="form.email"
          class="bg-green-100 border-2 border-[--color-border] rounded-lg p-3 text-base transition-colors focus:outline-none"
        />
      </div>
            <div class="flex flex-col gap-1.5">
        <label for="body" class="text-[--color-text] font-semibold">Password</label>
        <textarea
          v-model="form.password"
          class="bg-green-100 border-2 border-[--color-border] rounded-lg p-3 text-base transition-colors focus:outline-none"
        />
      </div>
      <div v-if="errorMessages.length" class="mb-4 text-red-600">
        <p v-for="(msg, i) in errorMessages" :key="i">
          {{ msg.path === 'body' ? msg.msg : ''}}
        </p>
      </div>
      <div class="flex flex-row gap-1.5">
        <BaseButton type="button" @click="goBack">Cancel</BaseButton>
        <BaseButton type="submit">Register</BaseButton>
      </div>
    </form>
  </BaseCard>
</template>

  
<script setup>
  import { ref, reactive  } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import BaseCard from '../UI/BaseCard.vue';
  import BaseButton from '../UI/BaseButton.vue';
  import api from '../../api/index.js';

  const router = useRouter();
  const errorMessages = ref([]);
  const form = reactive({
    username: '',
    email: '',
    password:''
  });
  
   async function RegisterUser() {
    errorMessages.value = [];
    try {
      await api.post(`/users/register`, {
        username: form.username,
        email:  form.email,
        password: form.password,
      });
      router.push({ name: 'Home' });
    } catch (err) {
    const data = err.response?.data;
    if (Array.isArray(data?.errors)) {
      errorMessages.value = data.errors;
    } else {
      errorMessages.value = [data?.error || data?.message || 'User registration failed.'];
    }
  }
} 
  
function goBack() {
  router.back(); 
}
</script>
  