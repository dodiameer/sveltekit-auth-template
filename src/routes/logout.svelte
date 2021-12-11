<script context="module" lang="ts">
  import type { SessionData } from '$lib/types';

  import type { Load } from '@sveltejs/kit';

  export const load: Load<{ session: SessionData }> = async ({ fetch }) => {
    await fetch('/api/auth/logout', { method: 'POST' });
    return {
      status: 200,
    };
  };
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  onMount(() => {
    // Can't use goto because it doesn't trigger SSR
    location.href = '/';
  });
</script>
