import type { Locals } from '$lib/types';
import { jsonResponse, parseBody } from '$lib/utils';
import type { RequestHandler } from '@sveltejs/kit';
import argon2 from 'argon2';

export const post: RequestHandler<
  Locals,
  { email: string; password: string }
> = async ({ locals, body }) => {
  body = parseBody(body);
  const invalidResponse = jsonResponse({
    body: {
      message: 'email or password incorrect',
    },
    status: 403,
  });

  const user = await locals.prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });
  if (!user) return invalidResponse;

  const validPassword = await argon2.verify(user.password, body.password);
  if (!validPassword) return invalidResponse;

  // Can't store password in session
  const { password, ...safeUser } = user;
  locals.session.data = { user: safeUser };
  return jsonResponse({ body: safeUser });
};
