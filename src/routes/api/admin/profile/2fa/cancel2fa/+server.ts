import { db } from '$lib/server/db';
import { authenticator } from 'otplib';
import type { RequestHandler } from './$types';
import { ServiceError, ServiceSuccess } from '$lib/dto/base-response';
import { json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, locals }) => {
    if (!locals.session) {
        return new Response('Unauthorized', { status: 401 });
    }

    let respAlert;
    const { otpToken } = await request.json();

    if (otpToken == "") {
        respAlert = new ServiceError('กรุณากรอกรหัสยืนยัน');
    }

    const currentUser = await db.user.findUnique({
        where: {
            id: locals.user?.id
        }
    });

    if (!currentUser) {
        respAlert = new ServiceError('ไม่พบข้อมูล User');
    }

    const isValid = currentUser?.otpSecret ? authenticator.verify({ token: otpToken, secret: currentUser.otpSecret }) : false;
    if (!isValid) {
        respAlert = new ServiceError('รหัส 2FA ไม่ถูกต้อง');
    }

    const updateOtp = await db.user.update({
        where: {
            id: locals.user?.id
        },
        data: {
            isEnableOTP: false,
            otpSecret: null
        }
    });

    if (updateOtp) {
        respAlert = new ServiceSuccess('ยกเลิก 2FA สำเร็จ');
    }

    return json({ respAlert })
}