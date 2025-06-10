import {GetUser} from "@/data/getUser";
import {db} from "@/db";
import {eq} from "drizzle-orm";
import {links} from "@/db/schema";


const getCachedUserLinks = async (userId: string) => {
    "use cache"
    console.log("Fetching cached user links from the database...");

    return db.query.links.findMany({
        where: eq(links.user_id, userId),
    });
}

export async function GetUserURLs() {
    try {
        const user = await GetUser();

        const userLinks = await getCachedUserLinks(user.id);

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