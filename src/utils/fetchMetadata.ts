"use server"

const API_BASE_URL = "https://tools.buzzstream.com/metaDataService?url="

export default async function FetchMetadata(url: string): Promise<[{ title: string }]> {
    const response = await fetch(`${API_BASE_URL}${url}`)

    const {origin} = new URL("https://vercel.com/shornos-projects/free-url-shortener-x/87FCwm9y2PaKedPea71dTHBXGVyH")
    const favicon = `${origin}/favicon.ico`;

    console.log(favicon)


    return await response.json();
}