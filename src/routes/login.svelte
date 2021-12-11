<script context="module" lang="ts">
  import { publicOnlyRoute } from '$lib/utils';
  export const load = publicOnlyRoute();
</script>

<script lang="ts">
  let error = null;
  const handleSubmit = async (
    e: Event & { currentTarget: HTMLFormElement }
  ) => {
    error = null;
    const formData = new FormData(e.currentTarget);
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: formData.get('email'),
        password: formData.get('password'),
      }),
    });

    if (!response.ok) {
      error = (await response.json()).message;
      return;
    }

    // Can't use goto because it doesn't rerun SSR
    location.href = '/';
  };
</script>

<div class="container">
  <h1 class="text-primary font-bold text-2xl">Log in</h1>
  <p class="my-2 text-red-600 font-bold">{error ?? ''}</p>
  <form on:submit|preventDefault={handleSubmit}>
    <label for="email">Email</label>
    <input type="email" name="email" id="email" required />
    <label for="password">Password</label>
    <input type="password" name="password" id="password" required />
    <button type="submit">Log in</button>
  </form>
</div>

<style>
  label,
  button {
    display: block;
    margin-top: 0.75rem;
  }
</style>
