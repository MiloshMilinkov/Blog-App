<template>
    <li>
        <BaseCard class="max-w-xl mx-auto mt-16 p-8">
            <router-link :to="{ name: 'PostDetail', params: { id: props.postId } }" class="block no-underline rounded-lg">
                <header class="border-b pb-1 border-[--color-border]">
                  <h3 class="text-xl text-[--color-accent-dark]">{{ props.title }}</h3>
                </header>
                <p class="m-1 text-[--color-text]">{{ props.body }}</p>
                <p v-if="author" class="m-1 text-[--color-text]">Author: {{ props.author.username }}</p>
                <p class="m-1 text-[--color-text]">Created: {{ dateFormat(props.createdAt) }}</p>
                <p class="m-1 text-[--color-text]">Updated: {{ dateFormat(props.updatedAt) }}</p>
            </router-link>
            <div class="flex justify-end space-x-4 pt-4">
              <BaseButton  type="button" @click="onDelete(postId)" aria-label="Delete post">Delete</BaseButton>
              <BaseButton type="button" @click="$router.push({ name: 'EditPost', params: { id: postId } })" aria-label="Edit post">Edit</BaseButton>
            </div>
        </BaseCard>
    </li>
</template>
  
<script setup>
import BaseCard from '../UI/BaseCard.vue'
import BaseButton from '../UI/BaseButton.vue'
import dateFormat from '../../helper/dateFormat.js'

const props = defineProps({
  postId:    { type: String, required: true },
  title:     { type: String, required: true },
  body:      { type: String, required: true },
  author:    { type: Object, required: false },
  createdAt: { type: String, required: true },
  updatedAt: { type: String, required: true },
})
const emit = defineEmits(['delete', 'edit']);
function onDelete(){
    emit('delete', props.postId);
}
</script>
