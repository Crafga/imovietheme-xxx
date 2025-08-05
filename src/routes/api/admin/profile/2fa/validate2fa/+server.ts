import { db } from '$lib/server/db';
import { authenticator } from 'otplib';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { lucia } from '$lib/server/Lucia';
import argon2 from 'argon2';


export const POST: RequestHandler = async ({ request, cookies }) => {
    const { otpToken, username, password } = await request.json();

    const user = await db.user.findFirst({
        where: {
            username: username
        }
    });

    if (!user?.status) {
        return json( {
            status: 400,
            message: 'The user is banned or not active.'
        })
    }

    const passwordCheck = user ? await argon2.verify(user.password, password) : false;
    if (!passwordCheck) {
        return json({
            success: false,
            message: "รหัสผ่านไม่ถูกต้อง"
        })
    }

    const isValid = authenticator.verify({ token: otpToken, secret: user.otpSecret! });
    if (!isValid) {
        return json( {
            status: 400,
            message: 'รหัส 2FA ไม่ถูกต้อง'
        })
    }

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies.set(sessionCookie.name, sessionCookie.value, {
        path: ".",
        ...sessionCookie.attributes
    });
    return json({
        success: true,
        message: "เข้าสู่ระบบสำเร็จ"
    })
}