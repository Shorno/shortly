"use server"
import GenerateRandomID from "@/utils/generateRandomID";

export default async function GenerateShortURL(originalURL: string) {
    await new Promise(resolve => setTimeout(resolve, 2000))
    const randomID = GenerateRandomID(6)
    const shortURL = `https://shortly.com/${randomID}`
    const data = {
        originalURL,
        shortURL
    }

    return {success: true, data}

}