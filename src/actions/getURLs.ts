"use server"

import {db} from "@/db";

interface ShortURL {
    id: number;
    generatedID: string;
    originalURL: string;
    shortURL: string;
}


export default async function GetURLs(): Promise<ShortURL[]> {
    return db.query.links.findMany();
}