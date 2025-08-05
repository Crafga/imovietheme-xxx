import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/server/db';

export const load: PageServerLoad = async ({ locals }) => {
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

    const settings = await db.settings.findFirst()

    return {
        settings
    }
}

export const actions: Actions = {
    setTheme: async ({ request, locals }) => {

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

		const formData = await request.formData();
		const theme = formData.get('theme')?.toString() ?? 'skeleton';
		const id = formData.get('id')?.toString() ?? '';

		const checkName = await db.settings.findFirst({
            where: {
                id: id
            }
        });

		if (!checkName) {
			const createTheme = await db.settings.create({
				data: {
					theme: theme.trim()
				}
			});

			if (!createTheme) {
				return {
					success: false,
					message: `เกิดข้อผิดพลากในการเพิ่มข้อมูล Theme`
				};
			}
		}

		const update = await db.settings.update({
			where: {
				id: id
			},
			data: {
				theme: theme.trim()
			}
		});

		if (!update) {
			return {
				success: false,
				message: `เกิดข้อผิดพลากในการอัพเดทข้อมูล Theme`
			};
		}

		return { theme };
	},
    seoSetting: async ({ request, locals }) => {
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

        const { id, title, webname, keyword, description, footerText } = await request.json();

        const checkName = await db.settings.findFirst({
            where: {
                id: id
            }
        });

        if (!checkName) {
			const createSeo = await db.settings.create({
				data: {
					title: title,
                    webname: webname,
                    keyword: keyword,
                    description: description,
					footerText: footerText
				}
			});

			if (!createSeo) {
				return {
					success: false,
					message: `เกิดข้อผิดพลากในการเพิ่มข้อมูล Theme`
				};
			}
		}

        const update = await db.settings.update({
			where: {
				id: id
			},
			data: {
				title: title,
                webname: webname,
                keyword: keyword,
                description: description,
				footerText: footerText
			}
		});

		if (!update) {
			return {
				success: false,
				message: `เกิดข้อผิดพลากในการอัพเดทข้อมูล Theme`
			};
		}

        return {
            success: true,
            message: 'แก้ไขข้อมูล Seo สำเร็จ'
        }
    }
}