<script lang="ts">
  let count = 0;
  const increment = () => (count += 1);
  const decrement = () => (count -= 1);
</script>

<template>
  <div
    class="flex items-center justify-between max-w-56 bg-primary text-primary-text px-4 py-2 rounded-lg"
  >
    <button
      on:click={decrement}
      class="text-center bg-primary-400 hover:bg-primary-600 rounded-md w-10 h-8 font-bold"
      >-</button
    >
    <span>{count}</span>
    <button
      on:click={increment}
      class="text-center bg-primary-400 hover:bg-primary-600 rounded-md w-10 h-8 font-bold"
      >+</button
    >
  </div>
</template>
