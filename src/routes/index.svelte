<script context="module" lang="ts">
  import type { SessionData } from '$lib/types';
  import type { Load } from '@sveltejs/kit';
  export const load: Load<{ session: SessionData }> = async ({ session }) => {
    return {
      status: 200,
      props: {
        user: session.user ?? null,
      },
    };
  };
</script>

<script lang="ts">
  import type { User } from '@prisma/client';
  import Counter from '$components/Counter.svelte';

  export let user: User | null;
</script>

<template>
  <main class="container">
    <h1 class="text-xl font-bold text-primary mb-1">SvelteKit App Template</h1>
    {#if user}
      <p>Welcome, {user.email}</p>
      <a href="/logout">Log out</a> -
      <a href="/private">Members only!</a>
    {:else}
      <p>Welcome, anonymous user!</p>
      <a href="/login">Log in</a> -
      <a href="/register">Register</a>
    {/if}
    <p class="mb-4">
      An app template for building SvelteKit apps with WindiCSS and a reasonable
      amount of boilerplate written for you.
    </p>
    <Counter />
  </main>
</template>
