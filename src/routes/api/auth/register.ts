import type { Locals } from '$lib/types';
import { isEmail, isPassword, jsonResponse, parseBody } from '$lib/utils';
import type { User } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';
import argon2 from 'argon2';

export const post: RequestHandler<
  Locals,
  Pick<User, 'email' | 'password'>
> = async ({ body, locals }) => {
  body = parseBody(body);
  const prisma = locals.prisma;

  if (!isEmail(body.email) || !isPassword(body.password)) {
    return jsonResponse({
      status: 400,
      body: { message: 'Email or password invalid' },
    });
  }

  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: await argon2.hash(body.password),
      },
    });

    const { password, ...safeUser } = user;
    locals.session.data = { user: safeUser };
    return jsonResponse({
      body: safeUser,
    });
  } catch (e) {
    if (e?.code === 'P2002') {
      return {
        status: 400,
        body: {
          message: 'Email already taken',
        },
      };
    }

    console.error(e);
    return jsonResponse({
      status: 500,
      body: { message: 'Internal server error' },
    });
  }
};
