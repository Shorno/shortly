import {GetUser} from "@/data/getUser";
import {getCachedUserLinks} from "@/data/getCachedUserLinks";
import getLinksFromRedis from "@/data/userRedisUserLinks";
import redis from "@/lib/redis";


export async function GetUserURLs() {
    try {

        console.time("auth-time");
        const user = await GetUser();
        console.timeEnd("auth-time");


        console.time("®️ redis-cache-time")
        const redisLinks = await getLinksFromRedis(user.id);
        console.timeEnd("®️ redis-cache-time")


        if (redisLinks) {
            console.log("🟢 Returning from Redis cache");
            return {
                success: true,
                status: 200,
                message: "Links retrieved successfully",
                data: redisLinks
            };
        }

        const dbLinks = await getCachedUserLinks(user.id);

        await redis.set(
            `user-links:${user.id}`,
            JSON.stringify(dbLinks),
            "EX",
            5 * 60
        );


        return {
            success: true,
            status: 200,
            message: "Links retrieved successfully",
            data: dbLinks
        }
    } catch (error) {
        console.error("❌ GetUserURLs error:", error);
        return {
            success: false,
            status: 401,
            message: error instanceof Error ? error.message : "Authentication failed",
            data: null
        }
    }
}
