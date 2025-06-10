import redis from "@/lib/redis";

export default async function getLinksFromRedis(userId: string) {
    console.time("redis-get");
    const cached = await redis.get(`user-links:${userId}`);
    console.timeEnd("redis-get");
    return cached ? JSON.parse(cached) : null;
}