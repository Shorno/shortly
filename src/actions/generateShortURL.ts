"use server"
import GenerateRandomID from "@/utils/generateRandomID";
import {revalidatePath} from "next/cache";
import {db} from "@/db";
import {links} from "@/db/schema";
import GetMetadata from "@/utils/getMetadata";
import {cookies} from "next/headers";

export default async function GenerateShortURL(originalURL: string) {

    if (!originalURL) return;

    const randomID = GenerateRandomID(6)
    const BASE_URL = process.env.BASE_URL as string;
    const shortURL = `${BASE_URL}/s/${randomID}`

    const {title, favicon} = await GetMetadata(originalURL)

    const data = {
        original_url: originalURL,
        short_url: shortURL,
        generated_id: randomID,
        site_title: title,
        site_favicon: favicon
    }

    const firstTimeCookie = "hasCreatedShortURL"


    const cookieStore = await cookies()
    const hasCreatedBefore = cookieStore.has(firstTimeCookie)


    if (!hasCreatedBefore) {
        cookieStore.set(firstTimeCookie, 'true', {
            maxAge: 365 * 24 * 60 * 60,
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
        });
    }


    try {
        await db.insert(links).values(data)
        revalidatePath("/links")
        return {
            success: true,
            isFirstTime: !hasCreatedBefore,
            shortURL: data
        }

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log(error)
            return {success: false, error}
        }
    }

}