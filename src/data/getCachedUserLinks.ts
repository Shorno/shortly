"use server"
import {db} from "@/db";
import {count, eq} from "drizzle-orm";
import {links} from "@/db/schema";
import {PaginatedURLs} from "@/data/getPublicURLs";

export async function getCachedUserLinks(
    userId: string,
    page: number = 1,
    pageSize: number = 10
): Promise<PaginatedURLs> {
    "use cache"

    const data = await db.query.links.findMany({
        where: eq(links.user_id, userId),
        limit: pageSize,
        offset: (page - 1) * pageSize,
        orderBy: (links, { desc }) => [desc(links.id)]
    });

    const totalCountResult = await db.select({count: count()})
        .from(links)
        .where(eq(links.user_id, userId));

    const totalCount = totalCountResult[0]?.count || 0;

    return {
        data,
        totalCount,
    };
}