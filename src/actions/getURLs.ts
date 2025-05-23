"use server"

import {db} from "@/db";

export interface ShortURL {
    id: number;
    generated_id: string;
    original_url: string;
    short_url: string;
    site_favicon: string,
    site_title : string
}


export default async function GetURLs(): Promise<ShortURL[]> {
    return db.query.links.findMany();
}