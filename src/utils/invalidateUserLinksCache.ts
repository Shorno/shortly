import redis from "@/lib/redis";

export async function invalidateUserLinksCache(userId: string) {
    try {
        const pattern = `user-links:${userId}:page:*`;
        const keys = await redis.keys(pattern);

        if (keys.length > 0) {
            await redis.del(...keys);
            console.log(`🗑️ Invalidated ${keys.length} cache entries for user ${userId}`);
        }
    } catch (error) {
        console.error("❌ Cache invalidation error:", error);
    }
}
