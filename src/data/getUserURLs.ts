import {GetUser} from "@/data/getUser";
import {getCachedUserLinks} from "@/data/getCachedUserLinks";
import getLinksFromRedis from "@/data/userRedisUserLinks";
import redis from "@/lib/redis";


export async function GetUserURLs() {
    try {

        console.time("GetUser");
        const user = await GetUser();
        console.timeEnd("GetUser");

        // console.time("getCachedUserLinks");
        // console.timeEnd("getCachedUserLinks");

        const redisLinks = await getLinksFromRedis(user.id);

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


        //     return {
        //         success: true,
        //         status: 200,
        //         message: "Links retrieved successfully",
        //         data: userLinks
        //     }
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