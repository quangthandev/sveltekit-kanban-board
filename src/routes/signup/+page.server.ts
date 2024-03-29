import { fail, redirect } from '@sveltejs/kit';
import { userExists, createUser } from './queries.js';
import { lucia } from '$lib/server/auth.js';
import { z } from 'zod';
import { EmailSchema, PasswordSchema } from '../schemas.js';

const schema = z.object({
	email: EmailSchema,
	password: PasswordSchema
});

export const actions = {
	default: async ({ cookies, request }) => {
		const formData = await request.formData();

		try {
			const { email, password } = await schema.parseAsync(Object.fromEntries(formData));

			if (await userExists(email)) {
				return fail(400, {
					error: 'An account with this email already exists.'
				});
			}

			const user = await createUser(email, password);

			const session = await lucia.createSession(user.id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});

			redirect(302, '/boards');
		} catch (error) {
			if (error instanceof z.ZodError) {
				return fail(400, {
					error: error.errors[0].message
				});
			}

			throw error;
		}
	}
};
