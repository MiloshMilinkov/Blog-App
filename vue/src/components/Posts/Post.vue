<template>
    <li>
        <BaseCard class="max-w-xl mx-auto mt-16 p-8">
            <router-link :to="{name: 'PostDetail', params: {id: postId}}" class="link">
                <header><h3>{{ title }}</h3></header>
                <p>{{ body }}</p>
                <p v-if="author">Author: {{ author.username }}</p>
                <p>Created: {{ dateFormat(createdAt) }}</p>
                <p>Updated: {{ dateFormat(updatedAt) }}</p>
            </router-link>
            <div class="flex justify-end space-x-4 pt-4">
              <BaseButton  @click="onDelete(postId)">Delete</BaseButton>
              <BaseButton @click="$router.push({ name: 'EditPost', params: { id: postId } })">Edit</BaseButton>
            </div>
        </BaseCard>
    </li>
</template>
  
<script setup>
import { computed } from 'vue';
import BaseCard from '../UI/BaseCard.vue';
import BaseButton from '../UI/BaseButton.vue';
import moment from 'moment'
import dateFormat from '../../helper/dateFormat.js'

const { postId, title, body, author, createdAt, updatedAt } = defineProps({
    postId: { type: String, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    author: { type: Object, required: true },
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true }
});

const emit = defineEmits(['delete', 'edit']);
function onDelete(){
    emit('delete', postId);
}

</script>

<style scoped>
li {
  margin: auto;
  max-width: 40rem;
  margin-bottom: 2rem;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 0.5rem;
}

h3 {
  font-size: 1.5rem;
  color: var(--color-accent-dark);
  margin: 0;
}

p {
  margin: 0.5rem 0;
  color: var(--color-text);
}

.link {
  text-decoration: none;
  color: inherit;
  display: block;
  padding: 1rem 0;
}

.link:hover {
  background-color: #f8f6f4;
  border-radius: 8px;
  transition: background 0.3s;
}
</style>