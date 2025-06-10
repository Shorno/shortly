"use server"

import {db} from "@/db";
import {count, eq} from "drizzle-orm";
import {analytics} from "@/db/schema";
import {cacheTag} from "next/dist/server/use-cache/cache-tag";

export default async function GetAnalytics(generatedId: string) {
    "use cache"
    const visitData = await db.select({count: count(analytics)}).from(analytics).where(eq(analytics.linkGeneratedId, generatedId))

    const visitCount = visitData[0]?.count ?? 0;

    const visitTimestamps = await db.query.analytics.findMany({
        where: (analytics, {eq}) => eq(analytics.linkGeneratedId, generatedId),
        columns: {
            visitedAt: true,
        },
    });
    cacheTag(`analytics-${generatedId}`);

    return {visitCount, visitTimestamps};

}