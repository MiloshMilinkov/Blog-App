<template>
    <li>
        <BaseCard>
            <router-link :to="{name: 'PostDetail', params: {id: postId}}" class="link">
                <header><h3>{{ title }}</h3></header>
                <p>{{ body }}</p>
                <p v-if="author">Author: {{ author.username }}</p>
                <p>Created: {{ dateFormat(createdAt) }}</p>
                <p>Updated: {{ dateFormat(updatedAt) }}</p>
            </router-link>
            <div>
                <BaseButton  @click="onDelete(postId)">Delete</BaseButton>
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

const emit = defineEmits(['delete']);
function onDelete(){
    emit('delete', postId);
}

</script>

<style scoped>
li {
    margin: auto;
    max-width: 40rem;
}

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

h3 {
    font-size: 1.25rem;
    margin: 0.5rem 0;
}

p {
    margin: 0.5rem 0;
}

.link{
    text-decoration: none;
}

</style>