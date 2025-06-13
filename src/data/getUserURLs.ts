import {GetUser} from "@/data/getUser";
import {getUserLinks} from "@/data/getUserLinks";
import {PaginatedURLs} from "@/data/getPublicURLs";
import getLinksFromRedis from "./userRedisUserLinks";
import redis from "@/lib/redis";

interface PaginatedURLsWithStatus extends PaginatedURLs {
    status: number;
}


export async function GetUserURLs({
                                      page = 1,
                                      pageSize = 10,
                                  }: {
    page?: number;
    pageSize?: number;
} = {}): Promise<PaginatedURLsWithStatus> {
    try {
        console.time("auth-time");
        const user = await GetUser();
        console.timeEnd("auth-time");

        const cacheKey = `user-links:${user.id}:page:${page}:size:${pageSize}`;

        console.time("®️ redis-cache-time");
        const redisLinks = await getLinksFromRedis(cacheKey);
        console.timeEnd("®️ redis-cache-time");

        if (redisLinks) {
            console.log("🟢 Returning from Redis cache");
            return {
                data: redisLinks.data,
                totalCount: redisLinks.totalCount,
                status: 200
            };
        }

        const dbLinks = await getUserLinks(user.id, page, pageSize);


        await redis.set(
            cacheKey,
            JSON.stringify(dbLinks),
            "EX",
            5 * 60 // 5 minutes
        );

        return {
            data: dbLinks.data,
            totalCount: dbLinks.totalCount,
            status: 200
        };
    } catch (error) {
        console.error("❌ GetUserURLs error:", error);
        return {
            data: [],
            totalCount: 0,
            status: 401
        };
    }
}
