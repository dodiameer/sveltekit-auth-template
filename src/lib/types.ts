import type { Session } from 'svelte-kit-cookie-session';
import type { PrismaClient, User } from '@prisma/client';
import type { Load, LoadInput } from '@sveltejs/kit';
import type { LoadInputExtends, LoadOutput } from '@sveltejs/kit/types/page';

export type Locals = {
  session: Session<{
    user: Omit<User, 'password'>;
  }>;
  prisma: PrismaClient;
};

export type SessionData = Locals['session']['data'];

export type LoadMiddleware<
  Input extends LoadInputExtends = Required<LoadInputExtends>
> = (
  callback?: (
    input: LoadInput<Input['pageParams'], Input['stuff'], Input['session']>
  ) => LoadOutput | Promise<LoadOutput>
) => (
  input: LoadInput<Input['pageParams'], Input['stuff'], Input['session']>
) => LoadOutput | Promise<LoadOutput>;
