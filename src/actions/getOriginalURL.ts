"use server"
const BASE_URL = process.env.BASE_URL as string

export default async function GetOriginalURL(id: string) {
    const response = await fetch(`${BASE_URL}api/${id}`)
    return await response.json()
}