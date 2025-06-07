"use server"
export default async function getMetadata(originalLink: string) {
    const hostname = new URL(originalLink).hostname;
    const favicon = `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`;
    const response = await fetch(`${process.env.BASE_URL as string}/api/metadata?url=${originalLink}`);
    const { title } = await response.json();
    return { title, favicon };
}