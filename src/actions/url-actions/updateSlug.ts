"use server"
import {db} from "@/db";
import {links} from "@/db/schema";
import {eq} from "drizzle-orm";
import {invalidateUserLinksCache} from "@/utils/invalidateUserLinksCache";

export default async function updateSlug(id: number, newSlug: string) {
    if (!newSlug || newSlug.trim() === '') {
        return {
            success: false,
            status: 400,
            message: "Invalid slug provided",
        };
    }

    try {
        const BASE_URL = process.env.BASE_URL as string;
        const newShortURL = `${BASE_URL}/s/${newSlug}`;

        const existingSlug = await db.query.links.findFirst({
            where: (links, {eq}) => eq(links.slug, newSlug)
        })

        if (existingSlug) {
            return {
                success: false,
                status: 409,
                message: "Slug already exists",
            };
        }
        const result = await db.update(links).set({
            slug: newSlug,
            short_url: newShortURL
        }).where(eq(links.id, id)).returning()

        if (result.length === 0) {
            return {
                success: false,
                status: 404,
                message: "Link not found",
            };
        }


        const userId = result[0].user_id;
        if (userId) {
            await invalidateUserLinksCache(userId);
        }


        return {
            success: true,
            status: 200,
            message: "Slug updated successfully",
        }

    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.message === 'Link not found') {
                return {
                    success: false,
                    status: 404,
                    message: "Link not found",
                };
            }

            if (error.message === 'Slug already exists') {
                return {
                    success: false,
                    status: 409,
                    message: "Slug already exists. Please choose a different one.",
                };
            }
        }

        return {
            success: false,
            status: 500,
            message: "Failed to update slug",
        };
    }
}