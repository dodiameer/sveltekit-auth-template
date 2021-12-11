import type { EndpointOutput, Load, LoadInput } from '@sveltejs/kit';
import type { LoadMiddleware, SessionData } from './types';

/**
 * Endpoint body parsing is broken. This fixes it.
 */
export const parseBody = (body) =>
  typeof body === 'string' ? JSON.parse(body) : body;

export const jsonResponse = (data: EndpointOutput<any>): EndpointOutput => {
  const { body, headers = {}, status = 200 } = data;
  return {
    status,
    body,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };
};

export const isEmail = (email) => {
  return new RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/).test(email);
};

export const isPassword = (password) => {
  return new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
  ).test(password);
};

export const publicOnlyRoute: LoadMiddleware<{ session: SessionData }> =
  (callback) => (input) => {
    if (input.session.user) {
      return {
        status: 302,
        redirect: '/',
      };
    }

    return (
      callback?.(input) ?? {
        status: 200,
      }
    );
  };

export const privateRoute: LoadMiddleware<{ session: SessionData }> =
  (callback) => (input) => {
    if (!input.session.user) {
      return {
        status: 302,
        redirect: '/login',
      };
    }

    return (
      callback?.(input) ?? {
        status: 200,
      }
    );
  };
