"use server"
import GenerateRandomID from "@/utils/generateRandomID";
import {prisma} from "@/lib/prisma";

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
        await prisma.link.create({
            data: data
        })
        return {success: true}

    } catch (error: unknown) {
        if (error instanceof Error) {
            return {success: false, error}
        }
    }

}