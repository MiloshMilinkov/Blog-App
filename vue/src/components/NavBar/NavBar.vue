
<template>
  <nav class="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
    <div class="flex items-center space-x-4">
      <span class="text-2xl font-bold">Blog Mania</span>
      <div class="relative">
        <input
          type="text"
          placeholder="Search"
          class="pl-3 pr-4 py-1.5 w-64 rounded-full bg-gray-100 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>

    <div class="flex items-center space-x-4">
      <button class="px-3 py-1 rounded hover:bg-gray-100">Explore</button>
      <button @click="$router.push({ name: 'CreatePosts'})">Create</button>
      <div class="relative" @click="toggleMenu">
        <button class="px-3 py-1 rounded hover:bg-gray-100">
          User
        </button>
        <transition name="fade">
          <ul
            v-if="open"
            class="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg py-1"
          >
            <li>
              <a href="#" class="block px-4 py-2 hover:bg-gray-100">
                Profile
              </a>
            </li>
            <li>
              <a href="#" class="block px-4 py-2 hover:bg-gray-100">
                Logout
              </a>
            </li>
            <li>
              <a href="#" class="block px-4 py-2 hover:bg-gray-100">
                Login
              </a>
            </li>
          </ul>
        </transition>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const open = ref(false)
function toggleMenu() {
  open.value = !open.value
}
</script>
