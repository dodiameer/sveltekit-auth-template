<script context="module" lang="ts">
  import { privateRoute } from '$lib/utils';

  export const load = privateRoute(async ({ session }) => {
    const [username] = session.user.email.split('@');
    return {
      status: 200,
      props: {
        username,
        user: session.user,
      },
    };
  });
</script>

<script lang="ts">
  import type { User } from '@prisma/client';

  export let user: User;
  export let username: string;
</script>

<div class="container">
  <h1 class="text-primary text-2xl font-bold">Members only!</h1>
  <p>
    The email stored in our database is {user.email}, but we sometimes refer to
    you by your generated username {username}
  </p>
  <pre>
    <code>
      {JSON.stringify(user, null, 2)}
    </code>
  </pre>
</div>
