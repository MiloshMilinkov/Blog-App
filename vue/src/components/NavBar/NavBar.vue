
<template>
  <nav class="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between sticky top-0 mb-1.5">
    <div class="flex items-center space-x-4">
      <span class="text-2xl font-bold">Blog Mania</span>
    </div>

    <div class="flex items-center space-x-4">
      <router-link to="/"><button class="px-3 py-1 rounded hover:bg-gray-100 cursor-pointer">Explore</button></router-link>
      <router-link to="/posts/create"><button class="px-3 py-1 rounded hover:bg-gray-100 cursor-pointer">Create</button></router-link>
      <div class="relative" @click="toggleMenu">
        <button class="px-3 py-1 rounded hover:bg-gray-100 cursor-pointer">
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
            <li>
              <router-link to="/user/register"><a href="#" class="block px-4 py-2 hover:bg-gray-100">
                Register
              </a></router-link>
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
