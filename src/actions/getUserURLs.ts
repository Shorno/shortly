import {GetUser} from "@/actions/getUser";
import {db} from "@/db";
import {eq} from "drizzle-orm";
import {links} from "@/db/schema";

export async function GetUserURLs() {
    const user = await GetUser();

    if (!user?.id) {
        return {
            success: false,
            status: 401,
            message: "You must be logged in to view your URLs",
            data: null
        }
    }

    const userLinks = await db.query.links.findMany({
        where: eq(links.user_id, user.id),
    });

    return {
        success: true,
        status: 200,
        message: "Links retrieved successfully",
        data: userLinks
    }
}
