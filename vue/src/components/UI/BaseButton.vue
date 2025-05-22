
<template>
  <button
    type="button"
    :class="[
      'px-6 py-3 text-base font-medium rounded-lg transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2',
      mode === 'flat'
        ? 'bg-transparent text-[var(--color-accent)] hover:bg-[#f3e8dc] focus:ring-[var(--color-accent)]'
        : 'bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-dark)] focus:ring-[var(--color-accent-dark)] shadow-sm hover:shadow-md'
    ]"
  >
    <slot />
  </button>
</template>

<script setup>
const props = defineProps({
  mode: {
    type: String,
    default: 'default', 
  }
})
</script>
