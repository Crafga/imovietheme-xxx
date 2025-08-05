import { db } from '$lib/server/db';
import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import argon2 from 'argon2';

export const load: PageServerLoad = (async ({ locals }) => {
    if (!locals.session) {
        return new Response('Unauthorized', { status: 401 });
    }

    const cst = await db.user.findUnique({
        where: {
            id: locals.user?.id
        }
    });

    if (!cst) {
        redirect(302, '/');
    }

    const user = await db.user.findMany();

    return {
        user
    }
});

export const actions: Actions = {
    editAdmin: async ({ request, locals }) => {
        try {
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

            const { id, Username, role, status } = await request.json();

            const updateUser = await db.user.update({
                where: {
                    id: id
                },
                data: {
                    username: Username,
                    role: role,
                    status: status
                }
            });

            if (!updateUser) {
                return {
                    success: true,
                    message: 'Admin already exists'
                }
            }
            
            return {
                success: true,
                message: 'Admin update success'
            }
        } catch (error) {
            console.error('Error update admin:', error);
            return fail(500, { error: 'เกิดข้อผิดพลาดในการลบผู้ใช้' });
        }
    },

    addAdmins: async ({ request, locals }) => {
        try {
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

            const { Username, password, role } = await request.json();
            const hashedPassword = await argon2.hash(password);

            const newUser = await db.user.create({
                data: {
                    username: Username,
                    password: hashedPassword,
                    role: role,
                    status: true
                }
            });

            if (!newUser) {
                return {
                    success: true,
                    message: 'Admin already exists'
                }
            }
            
            return {
                success: true,
                message: 'Admin created success'
            }
        } catch (error) {
            console.error('Error created admin:', error);
            return fail(500, { error: 'เกิดข้อผิดพลาดในการลบผู้ใช้' });
        }
    },
}