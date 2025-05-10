<template>
    <div>
        <slot></slot>
    </div>
</template>

<style scoped>
div {
  border-radius: 16px;
  background-color: var(--color-surface);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin: 2rem auto;
  max-width: 40rem;
  transition: box-shadow 0.3s;
}

div:hover {
  box-shadow: 0 6px 36px rgba(0, 0, 0, 0.15);
}
</style>