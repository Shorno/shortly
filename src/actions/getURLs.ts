"use server"

import {db} from "@/db";

export interface ShortURL {
    id: number;
    generatedID: string;
    originalURL: string;
    shortURL: string;
    siteFavicon: string,
    siteTitle : string
}


export default async function GetURLs(): Promise<ShortURL[]> {
    return db.query.links.findMany();
}