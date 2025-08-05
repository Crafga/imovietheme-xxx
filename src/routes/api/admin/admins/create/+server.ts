import { error, json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import type { RequestHandler } from './$types';
import argon2 from 'argon2';

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.session) {
		return new Response('Unauthorized', { status: 401 });
	}

	const cst = await db.user.findUnique({
		where: {
			id: locals.user?.id
		}
	});

	if (!cst || !cst.status) {
		return new Response('Unauthorized', { status: 401 });
	}

	const { Username, Password, status } = await request.json();
	const hashedPassword = await argon2.hash(Password);

	const create = await db.user.create({
		data: {
			username: Username,
			password: hashedPassword,
			status: status,
			role: 'ADMIN'
		}
	});

	if (!create) {
		return json({ status: 400, message: 'Created Admin Error' });
	}

	return json({ status: 200, message: 'Created Admin success' });
};