"use server"
import getPageTitle from "@/utils/getPageTitle";
export default async function GetMetadata(originalLink: string) {
    const {hostname} = new URL(originalLink)
    const favicon = `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`;
    const title = await getPageTitle(originalLink)
    return {title, favicon}

}