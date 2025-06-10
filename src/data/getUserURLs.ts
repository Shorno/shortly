import {GetUser} from "@/data/getUser";
import {getCachedUserLinks} from "@/data/getCachedUserLinks";


export async function GetUserURLs() {
    try {

        const authStart = Date.now();
        const user = await GetUser();
        const authEnd = Date.now();
        console.log(`👤 Auth took ${authEnd - authStart}ms`);

        const cacheStart = Date.now();
        const userLinks = await getCachedUserLinks(user.id);
        const cacheEnd = Date.now();
        console.log(`💾 Cache lookup took ${cacheEnd - cacheStart}ms`);

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