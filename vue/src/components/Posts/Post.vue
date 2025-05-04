<template>
    <li>
        <BaseCard>
            <header><h3>{{ title }}</h3></header>
            <p>{{ body }}</p>
            <p v-if="author">Author: {{ author.username }}</p>
            <p>Created at: {{ formattedCreatedAt }}</p>
            <p>Last edited at: {{ formattedUpdatedAt }}</p>
        </BaseCard>
    </li>
</template>
  
<script setup>
import { computed } from 'vue';
import BaseCard from '../UI/BaseCard.vue';
import moment from 'moment'
const { title, body, author, createdAt, updatedAt } = defineProps({
    postId: { type: String, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    author: { type: Object, required: true },
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true }
});

const formattedCreatedAt = computed(() =>
    moment(createdAt).format('YYYY-MM-DD')
);

const formattedUpdatedAt = computed(() =>
    moment(updatedAt).format('YYYY-MM-DD')
);
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

</style>