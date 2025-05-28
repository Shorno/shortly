"use server"

import {db} from "@/db";
import {eq} from "drizzle-orm";
import {links} from "@/db/schema";

export interface ShortURL {
    id: number;
    generated_id: string;
    original_url: string;
    short_url: string;
    site_favicon: string,
    site_title: string,
    user_id: string | null,
    is_public: boolean
}

export default async function GetPublicURLs(): Promise<ShortURL[]> {
    return db.query.links.findMany({
        where: eq(links.is_public, true)
    });
}
