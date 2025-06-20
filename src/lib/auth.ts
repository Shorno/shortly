import {betterAuth} from "better-auth";
import {drizzleAdapter} from "better-auth/adapters/drizzle";
import {db} from "@/db";
import * as schema from "@/db/auth-schema"
import {nextCookies} from "better-auth/next-js";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            user: schema.user,
            session: schema.session,
            account: schema.account,
            verification: schema.verification
        }
    }),
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 60 * 60 * 24 * 7,
        },
        expiresIn : 60 * 60 * 24 * 7,
        updateAge: 60 * 60 * 24,
    },
    emailAndPassword: {
        enabled: true
    },
    plugins : [nextCookies()]
})

export type Session = typeof auth.$Infer.Session
