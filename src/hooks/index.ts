import { PrismaClient } from '@prisma/client';
import type { GetSession, Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { handleSession } from 'svelte-kit-cookie-session';
import type { Locals } from '$lib/types';

export const getSession: GetSession<Locals> = ({ locals }) => {
  const data = locals.session.data;
  return data;
};

const sessionHandler = handleSession({
  secret: process.env.SESSION_SECRET as string,
});

const prismaHandler: Handle<Locals> = ({ request, resolve }) => {
  request.locals.prisma = new PrismaClient();
  return resolve(request);
};

export const handle = sequence(sessionHandler, prismaHandler);
