"use server"
import {prisma} from "@/lib/prisma";

interface ShortURL {
    id: number;
    generatedID: string;
    originalURL: string;
    shortURL: string;
}


export default async function GetURLs(): Promise<ShortURL[]> {
    return prisma.link.findMany();
}