"use server"
import GenerateRandomID from "@/utils/generateRandomID";
import {db} from "@/db";
import {links} from "@/db/schema";
import GetMetadata from "@/utils/getMetadata";
import {GetUser} from "@/data/getUser";
import {invalidateUserLinksCache} from "@/utils/invalidateUserLinksCache";

export default async function GeneratePrivateURL(originalURL: string) {
    if (!originalURL) {
        return {
            success: false,
            status: 400,
            message: "Original URL is required",
            data: null
        };
    }

    try {
        const user = await GetUser();

        const randomID = GenerateRandomID(6);
        const BASE_URL = process.env.BASE_URL as string;
        const shortURL = `${BASE_URL}/s/${randomID}`;

        const {title, favicon} = await GetMetadata(originalURL);

        const data = {
            original_url: originalURL,
            short_url: shortURL,
            slug: randomID,
            site_title: title,
            site_favicon: favicon,
            is_public: false,
            user_id: user.id
        };

        await db.insert(links).values(data);
        await invalidateUserLinksCache(user.id)

        return {
            success: true,
            status: 201,
            message: "Short URL generated successfully",
            data: {
                shortURL,
                originalURL,
                title,
                favicon
            }
        };

    } catch (error: unknown) {
        if (error instanceof Error && error.message.includes("logged in")) {
            return {
                success: false,
                status: 401,
                message: error.message,
                data: null
            };
        }

        console.error("Error generating short URL:", error);
        return {
            success: false,
            status: 500,
            message: "Failed to generate short URL",
            data: null
        };
    }
}