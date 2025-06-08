"use server"
export default async function getMetadata(originalLink: string) {
    const response = await fetch(`${process.env.METADATA_URL as string}?url=${originalLink}`);
    const {title, favicon} = await response.json();
    return {title, favicon};
}