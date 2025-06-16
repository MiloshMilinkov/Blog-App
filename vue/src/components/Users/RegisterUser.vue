<template>
    <BaseCard class="max-w-md mx-auto mt-16 p-8">
        <form @submit.prevent="RegisterUser" class="flex flex-col gap-6">
            <header>
                <h2 class="text-3xl font-bold text-center text-[--color-text] ">Register</h2>
            </header>
            <div v-if="errorMessages.length" class="text-red-600 space-y-2">
                <p v-for="(msg, i) in errorMessages" :key="i">{{ msg.msg }}</p>
            </div>
            <div class="flex flex-col">
                <label for="title" class="mb-2 font-semibold text-[--color-text]">Username</label>
                <input
                type="text"
                v-model="form.username"
                placeholder="Your username"
                class="p-3 bg-green-100 border-2 border-[--color-border] rounded-lg text-base transition-colors focus:outline-none"
                required
                />
            </div>
            <div v-if="errorMessages.length" class="mb-4 text-red-600">
                <p v-for="(msg, i) in errorMessages" :key="i">
                    {{ msg.path === 'title' ? msg.msg : ''}}
                </p>
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
                    placeholder="Choose a strong password"
                    class="p-3 bg-green-100 border-2 border-[--color-border] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    required
                />
            </div>
            <div class="flex justify-end space-x-4 pt-4">
                <BaseButton type="button" @click="goBack">Cancel</BaseButton>
                <BaseButton type="submit">Register</BaseButton>
            </div>
            <div class="flex justify-end space-x-4 pt-4">
            <p>Already have an account? <router-link :to="{ name: 'LoginUser' }">Sign in</router-link>!</p>
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
  username: '',
  email: '',
  password: ''
});
const userId = ref(null)
const { notify } = useNotification()

async function RegisterUser() {
  errorMessages.value = [];
  try {
    const response = await api.post(`/users/register`, {
      username: form.username,
      email: form.email,
      password: form.password
    });
    userId.value = response.data.userId
    notify('success', 'You have registered successfully.')
    router.push({ name: 'Home', params: { id: userId.value } })
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
  