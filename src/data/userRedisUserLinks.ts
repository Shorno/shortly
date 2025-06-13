import redis from "@/lib/redis";

export default async function getLinksFromRedis(cacheKey: string) {
    try {
        const cached = await redis.get(cacheKey);
        return cached ? JSON.parse(cached) : null;
    } catch (error) {
        console.error("❌ Error getting data from redis:", error);
        return null;
    }
}