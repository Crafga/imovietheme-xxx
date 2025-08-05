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

	const data = await request.json();

		// Get existing settings to check for old files
		const existingSettings = await db.settings.findFirst({
			where: {
				id: data.id
			}
		});

		let logoPath = '';
		let faviconPath = '';

		try {
			// Handle logo file
			if (data.logo && data.logo.startsWith('data:image/')) {
				// Delete all old logo files with timestamp naming
				await deleteOldFiles('logo', 'uploads');
				
				// Save new logo with timestamp
				logoPath = await saveBase64Image(data.logo, 'logo', 'uploads');
			} else if (
				existingSettings?.logo &&
				typeof existingSettings.logo === 'object' &&
				'logo' in existingSettings.logo
			) {
				// Keep existing logo path if no new file uploaded
				logoPath = existingSettings.logo as string;
			}

			// Handle favicon file
			if (data.favicon && data.favicon.startsWith('data:image/')) {
				// Delete all old favicon files with timestamp naming
				await deleteOldFiles('favicon', 'uploads');
				
				// Save new favicon with timestamp
				faviconPath = await saveBase64Image(data.favicon, 'favicon', 'uploads');
			} else if (
				existingSettings?.favicon &&
				typeof existingSettings.favicon === 'object' &&
				'favicon' in existingSettings.favicon
			) {
				// Keep existing favicon path if no new file uploaded
				faviconPath = existingSettings.favicon as string;
			}
		} catch (fileError) {
			console.error('File upload error:', fileError);
			return json({
				status: 400,
				message: `เกิดข้อผิดพลาดในการบันทึกไฟล์รูปภาพ: ${fileError}`
			});
		}

		const GeneralData = {
			logo: logoPath,
			favicon: faviconPath
		};

		if (!existingSettings) {
			const create = await db.settings.create({
				data: GeneralData
			});

			if (!create) {
				return json({
					status: 400,
					message: `เกิดข้อผิดพลากในการเพิ่มข้อมูล General`
				});
			}
		} else {
			const update = await db.settings.update({
				where: {
					id: data.id
				},
				data: GeneralData
			});

			if (!update) {
				return json({
					status: 400,
					message: `เกิดข้อผิดพลากในการอัพเดทข้อมูล General`
				});
			}
		}

	return json({
		status: 200,
		message: `Update ${data.act} success`
	});
};
