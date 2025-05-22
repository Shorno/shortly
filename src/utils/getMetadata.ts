"use server"
const API_BASE_URL = "https://tools.buzzstream.com/metaDataService?url="
const FAVICON_FORMAT = "favicon.ico"

interface Data {
    title: string
}

export default async function GetMetadata(originalLink: string) {

    const {origin} = new URL(originalLink)

    const response = await fetch(`${API_BASE_URL}${originalLink}`)
    const data: Data[] = await response.json();
    const title = data[0]?.title ?? origin;
    const favicon = `${origin}/${FAVICON_FORMAT}`;


    return {title, favicon}

}