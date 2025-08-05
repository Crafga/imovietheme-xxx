import { db } from '$lib/server/db';
import type { PageServerLoad } from './$types';
import { authenticator } from 'otplib';

export const load: PageServerLoad = (async ({ locals }) => {
    if (!locals.session) {
        return new Response('Unauthorized', { status: 401 });
    }

    const currentUser = await db.user.findUnique({
		where: {
			id: locals.user?.id
		}
	});

    const secret = authenticator.generateSecret();
    let otpSecret;
    if (currentUser && currentUser.username) {
        otpSecret = authenticator.keyuri(currentUser.username, 'Admin-Porn', secret);
    } else {
        throw new Error('User or username not found');
    }

    return {
		isEnableOTP: currentUser?.isEnableOTP,
		otpSecretUri: otpSecret,
		otpSecret: secret
	};
})