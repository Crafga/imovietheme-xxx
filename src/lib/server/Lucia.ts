import { Lucia, TimeSpan } from "lucia";
import { db } from "./db";
import { PrismaAdapter } from '@lucia-auth/adapter-prisma';

const adapter = new PrismaAdapter(db.customersSession, db.user);

export const lucia = new Lucia(adapter, {
    sessionExpiresIn: new TimeSpan(1, "d"),
	sessionCookie: {
		attributes: {
			secure: true
		}
	},
    getUserAttributes: (attributes) => {
		return {
			id: attributes.id,
			username: attributes.username,
			role: attributes.role,
			status: attributes.status
		};
	}
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
        DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	id: string;
	username: string;
	role: string;
	status: string;
}