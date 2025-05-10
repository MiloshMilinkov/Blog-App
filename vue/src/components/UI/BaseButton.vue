<template>
    <button>
        <slot></slot>
    </button>
</template>
<script>
export default {
    props:['mode']
}
</script>
<style scoped>
button {
  padding: 0.75rem 1.5rem;
  font-family: inherit;
  font-size: 1rem;
  background-color: var(--color-accent);
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover,
button:active {
  background-color: var(--color-accent-dark);
}

.flat {
  background-color: transparent;
  color: var(--color-accent);
  border: none;
}

.flat:hover,
.flat:active {
  background-color: #f3e8dc;
}
</style>