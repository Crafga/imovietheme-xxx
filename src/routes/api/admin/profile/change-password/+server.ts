import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import argon2 from 'argon2';

export const POST: RequestHandler = async ({ request, locals }) => {

    if (!locals.session) {
		return new Response('Unauthorized', { status: 401 });
	}

    const checkAdmin = await db.user.findFirst({
        where: {
            id: locals.user?.id
        }
    });

    if (!checkAdmin) {
        return new Response('Unauthorized', { status: 401 });
    }

    if (!checkAdmin.status) {
        return new Response('Admin Status Not Found', { status: 404 });
    }

    const { newpassword, confpassword, id } = await request.json();

    if (newpassword !== confpassword) {
        return json({status: 400, message: 'Password not match' });
    }

    const hashedPassword = await argon2.hash(newpassword);

    const userUpdatePassword = await db.user.update({
            data: {
                password: hashedPassword,
            },
            where: {
                id: id
            }
        });

    if (!userUpdatePassword) {
        return json({status: 400, message: 'User already exists' });
    }

    return json({status: 200, message: 'Users update password success' });
};