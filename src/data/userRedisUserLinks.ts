import redis from "@/lib/redis";

export default async function getLinksFromRedis(userId: string) {
    const cached = await redis.get(`user-links:${userId}`);
    return cached ? JSON.parse(cached) : null;
}