"use cache"
import {db} from "@/db";
import {eq} from "drizzle-orm";
import {links} from "@/db/schema";

export async function getCachedUserLinks(userId: string) {
    console.log("🔥 Fetching from database for user:", userId);

    return db.query.links.findMany({
        where: eq(links.user_id, userId),
    });
}

getCachedUserLinks.cacheLife = {
    stale: 300,
    revalidate: 300,
    tags: ['user-links']
};