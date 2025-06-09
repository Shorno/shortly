import {GetUser} from "@/data/getUser";
import {db} from "@/db";
import {eq} from "drizzle-orm";
import {links} from "@/db/schema";
import {unstable_cache} from "next/cache";


const getCachedUserLinks = (userId: string) => unstable_cache(
    async () => {
        console.log('Fetching links from database for user:', userId);

        return db.query.links.findMany({
            where: eq(links.user_id, userId),
        });
    },
    [`user-links-${userId}`],
    {
        tags: [`user-links`, `user-${userId}`],
        revalidate: 300,
    }
);

export async function GetUserURLs() {
    try {
        const user = await GetUser();

        const userLinks = await getCachedUserLinks(user.id)();


        // const userLinks = await db.query.links.findMany({
        //     where: eq(links.user_id, user.id),
        // });

        return {
            success: true,
            status: 200,
            message: "Links retrieved successfully",
            data: userLinks
        }
    } catch (error) {
        return {
            success: false,
            status: 401,
            message: error instanceof Error ? error.message : "Authentication failed",
            data: null
        }
    }
}