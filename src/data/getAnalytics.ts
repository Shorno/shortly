"use server"

import {db} from "@/db";
import {count, eq} from "drizzle-orm";
import {analytics} from "@/db/schema";
import {cacheTag} from "next/dist/server/use-cache/cache-tag";

export default async function GetAnalytics(slug: string) {
    "use cache"
    const visitData = await db.select({count: count(analytics)}).from(analytics).where(eq(analytics.linkSlug, slug))

    const visitCount = visitData[0]?.count ?? 0;

    const visitTimestamps = await db.query.analytics.findMany({
        where: (analytics, {eq}) => eq(analytics.linkSlug, slug),
        columns: {
            visitedAt: true,
        },
    });
    cacheTag(`analytics-${slug}`);

    return {visitCount, visitTimestamps};

}