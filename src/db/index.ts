import {neon} from '@neondatabase/serverless';
import {drizzle} from 'drizzle-orm/neon-http';
import * as linksSchema from "./schema"
import * as authSchema from "@/db/auth-schema"

const schema = {
    ...linksSchema,
    ...authSchema
}

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({client: sql, schema});