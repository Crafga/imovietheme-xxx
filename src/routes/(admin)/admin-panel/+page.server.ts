import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { lucia } from '$lib/server/Lucia';
import { authenticator } from 'otplib';
import argon2 from 'argon2';


export const load: PageServerLoad = (async ({ locals }) => {
    if (locals.user || locals.session) {
		throw redirect(302, '/app/dashboard');
	}

    const s = await db.settings.findFirst();

	return {
        set: s
    };
});

export const actions: Actions = {
    login: async (event) => {
        const formData = await event.request.formData();
        const username = formData.get('username') as string;
		const password = formData.get('password') as string;

        // const token = formData.get('cf-turnstile-response') as string;
        // const SECRET_KEY = env.PRIVATE_SECRET_KEY_TURNSTILE;
        // const { success } = await validateToken(token, SECRET_KEY);

        // if (!success) {
        //     return fail(400, { error: true, message: "Invalid CAPTCHA" });
        // }

        if (!username) {
            return fail(400, { error: true, message: "กรุณากรอก Username" });
        }

        if (!password) {
            return fail(400, { error: true, message: "กรุณากรอก Password" });
        }

        const user = await db.user.findFirst({
            where: {
                username: username
            }
        });

        if (!user) {
            return fail(400, { error: true, message: "Username หรือ Password ไม่ถูกต้อง" });
        }

        if (!user.status) {
            return fail(400, { error: true, message: "บัญชีของคุณถูกระงับการใช้งาน" });
        }

        const passwordCheck = await argon2.verify(user.password, password);
        if (!passwordCheck) {
            return fail(400, { error: true, message: "รหัสผ่านไม่ถูกต้อง" });
        }

        if (user.isEnableOTP) {
            return fail(400, { error: true, message: "กรอกรหัส 2FA" });
        }

        const session = await lucia.createSession(user.id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        event.cookies.set(sessionCookie.name, sessionCookie.value, {
            path: ".",
            ...sessionCookie.attributes
        });
        redirect(301, '/admin-panel/app/dashboard');
    },
    otp: async (event) => {
        const formData = await event.request.formData();
        const username = formData.get('username') as string;
		const otpToken = formData.get('otp') as string;

        if (!otpToken) {
            return fail(400, { error: true, message: "กรุณากรอก รหัส 2FA" });
        }

        const user = await db.user.findFirst({
            where: {
                username: username
            }
        });

        if (!user) {
            return fail(400, { error: true, message: "ไม่พบข้อมูลUsername" });
        }

        const isValid = authenticator.verify({ token: otpToken, secret: user.otpSecret! });
        if (!isValid) {
            return fail(400, { error: true, message: "รหัส 2FA ไม่ถูกต้อง" });
        }

        const session = await lucia.createSession(user.id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        event.cookies.set(sessionCookie.name, sessionCookie.value, {
            path: ".",
            ...sessionCookie.attributes
        });
        redirect(301, '/admin-panel/app/dashboard');
    }
}