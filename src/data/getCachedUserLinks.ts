"use server"
import {db} from "@/db";
import {eq} from "drizzle-orm";
import {links} from "@/db/schema";

export async function getCachedUserLinks(userId: string) {
    "use cache"
    console.log("🔥 Fetching from database for user:", userId);

    return db.query.links.findMany({
        where: eq(links.user_id, userId),
    });
}
