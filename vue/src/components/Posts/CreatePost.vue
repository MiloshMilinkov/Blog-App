<template>
  <BaseCard>
    <div v-if="errorMessages.length" class="mb-4">
      <p v-for="(msg, i) in errorMessages" :key="i">
        {{ msg }}
      </p>
    </div>
    <form @submit.prevent="updatePost">
      <header>
        <h2 class="text-3xl text-(--color-text) font-bold">Create a Post</h2>
      </header>
      <div class="title_container font-bold">
        <label for="title" class="text-(--color-text)">Title</label>
        <input type="text" class="bg-green-100 border-2 border-(--color-border) rounded-lg">
      </div>

      <div class="body_container">
        <label for="body" class="text-(--color-text) font-bold">Body</label>
        <textarea class="bg-green-100 border-2 border-(--color-border) rounded-lg"/>
      </div>

      <div >
        <BaseButton type="button" @click="goBack">Cancel</BaseButton>
        <BaseButton type="submit">Save Changes</BaseButton>
      </div>
    </form>
  </BaseCard>
</template>
  
<script setup>
  import { ref, reactive, onMounted  } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import BaseCard from '../UI/BaseCard.vue';
  import BaseButton from '../UI/BaseButton.vue';
  import api from '../../api/index.js';

  const route  = useRoute();
  const router = useRouter();
  const post    = ref(null);
  const isLoaded = ref(false);
  const errorMessages = ref([]);
  const form = reactive({
    title: '',
    body: '',
  });
  
  
  
function goBack() {
  router.back(); 
}
</script>
  
<style scoped>
@import "tailwindcss";
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
  padding: 0.75rem;
  font-size: 1rem;
  transition: background-color 0.2s;
}

input:focus,
textarea:focus {
  outline: none;
}

label {
  font-weight: 600;
}

form > div:last-child {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}
</style>
  