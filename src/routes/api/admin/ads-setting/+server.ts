import { error, json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { saveBase64Image, deleteFile, deleteOldFiles } from '$lib/server/fileUtils';
import type { RequestHandler } from './$types';

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

    const { id, title, url, position, desc, expired, adsFile } = await request.json();

    const existingAds = await db.ads.findFirst({
		where: {
			id: id
		}
	});

    let adsPath = '';

    try {
        if (adsFile && adsFile.startsWith('data:image/')) {
			// Delete only the old file for this specific ad if it exists
			if (existingAds?.image) {
				await deleteFile(existingAds.image);
			}

			// Save new ads img with timestamp
			adsPath = await saveBase64Image(adsFile, 'ads', 'ads');
		} else if (existingAds?.image) {
			adsPath = existingAds.image as string;
		}
    } catch (err) {
        console.error('File upload error:', err);
        return json({
            status: 400,
            message: `เกิดข้อผิดพลาดในการบันทึกไฟล์รูปภาพ: ${err}`
        });
    }

    if (!existingAds) {
        const create = await db.ads.create({
			data: {
                title: title,
                url: url,
                image: adsPath,
                position: position,
                sortBy: desc,
                expired: new Date(expired)
            }
		});

		if (!create) {
			return json({
				status: 400,
				message: `เกิดข้อผิดพลากในการเพิ่มข้อมูล Ads`
			});
		}
    } else {
        const update = await db.ads.update({
			where: {
				id: id
			},
			data: {
                title: title,
                url: url,
                image: adsPath,
                position: position,
                sortBy: desc,
                expired: new Date(expired),
                updateAt: new Date()
            }
		});

		if (!update) {
			return json({
				status: 400,
				message: `เกิดข้อผิดพลากในการอัพเดทข้อมูล Ads`
			});
		}
    }

    return json({
        status: 200,
        message: `Update Ads success`
    });
};
