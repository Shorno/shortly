"use server"
import GenerateRandomID from "@/utils/generateRandomID";
import {revalidatePath} from "next/cache";
import {db} from "@/db";
import {links} from "@/db/schema";

export default async function GenerateShortURL(originalURL: string) {

    if (!originalURL) return;

    const randomID = GenerateRandomID(6)
    const BASE_URL = process.env.BASE_URL;

    const shortURL = `${BASE_URL}${randomID}`

    const data = {
        originalURL,
        shortURL,
        generatedID: randomID
    }

    try {
        await db.insert(links).values(data)
        revalidatePath("/")
        return {success: true}

    } catch (error: unknown) {
        if (error instanceof Error) {
            return {success: false, error}
        }
    }

}