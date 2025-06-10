import {GetUser} from "@/data/getUser";
import {getCachedUserLinks} from "@/data/getCachedUserLinks";


export async function GetUserURLs() {
    try {

        console.time("GetUser");
        const user = await GetUser();
        console.timeEnd("GetUser");

        console.time("getCachedUserLinks");
        const userLinks = await getCachedUserLinks(user.id);
        console.timeEnd("getCachedUserLinks");
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