import type { Locals } from '$lib/types';
import type { RequestHandler } from '@sveltejs/kit';

export const post: RequestHandler<Locals> = async ({ locals }) => {
  locals.session.destroy();

  return {
    status: 204,
  };
};
