<template> 
  <BaseCard class="max-w-md mx-auto mt-16 p-8">
    <form @submit.prevent="LoginUser" class="flex flex-col gap-6">
      <header>
        <h2 class="text-3xl font-bold text-center text-[--color-text]">Login</h2>
      </header>

      <div v-if="errorMessages.length" class="text-red-600 space-y-2">
        <p v-for="(msg, i) in errorMessages" :key="i">{{ msg.msg }}</p>
      </div>

      <div class="flex flex-col">
        <label for="email" class="mb-2 font-semibold text-[--color-text]">Email</label>
        <input
          id="email"
          type="email"
          v-model="form.email"
          placeholder="you@example.com"
          class="p-3 bg-green-100 border-2 border-[--color-border] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          required
        />
      </div>

      <div class="flex flex-col">
        <label for="password" class="mb-2 font-semibold text-[--color-text]">Password</label>
        <input
          id="password"
          type="password"
          v-model="form.password"
          placeholder="Enter your password."
          class="p-3 bg-green-100 border-2 border-[--color-border] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          required
        />
      </div>

      <div class="flex justify-end space-x-4 pt-4">
        <BaseButton type="button" @click="goBack">Cancel</BaseButton>
        <BaseButton type="submit">Login</BaseButton>
      </div>

      <div class="text-right pt-4 text-sm">
        <p>
          Don’t have an account?
          <router-link :to="{ name: 'RegisterUser' }" class="text-blue-600 hover:underline"> Register</router-link>
        </p>
      </div>
    </form>
  </BaseCard>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import BaseCard from '../UI/BaseCard.vue';
import BaseButton from '../UI/BaseButton.vue';
import api from '../../api/index.js';
import { useNotification } from '../../helper/toastNotification.js';

const router = useRouter();
const errorMessages = ref([]);
const form = reactive({
  email: '',
  password: ''
});
const { notify } = useNotification();

async function LoginUser() {
  errorMessages.value = [];
  try {
    const { data } = await api.post(`/users/login`, {
      email: form.email,
      password: form.password
    });

    notify('success', 'You have logged in successfully.');
    router.push({ name: 'Home', params: { id: data.userId } });
  } catch (err) {
    const data = err.response?.data;
    errorMessages.value = Array.isArray(data?.errors)
      ? data.errors
      : [{ msg: data?.error || data?.message || 'User login failed.' }];
  }
}

function goBack() {
  router.back();
}
</script>
  