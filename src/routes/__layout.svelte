<script lang="ts">
  import { browser } from '$app/env';
  import 'virtual:windi.css';
  if (browser) import('virtual:windi-devtools');
</script>

<div class="py-4">
  <slot />
</div>
