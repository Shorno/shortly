import {GetUser} from "@/data/getUser";
import {getCachedUserLinks} from "@/data/getCachedUserLinks";


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
        console.error("❌ GetUserURLs error:", error);
        return {
            success: false,
            status: 401,
            message: error instanceof Error ? error.message : "Authentication failed",
            data: null
        }
    }
}