"use server"
import * as cheerio from "cheerio";
import {headers} from "next/headers";

export default async function GetMetadata(originalLink: string) {
    const headersList = await headers()
    const userAgent = headersList.get('user-agent') as string
    const $ = await cheerio.fromURL(originalLink,
        {
            requestOptions: {
                method: "GET",
                headers: {
                    'accept': 'text/html,application/xhtml+xml,application/xml',
                    'User-Agent': userAgent
                }
            }
        }
    );
    const title = $('head > title').first().text();

    const iconLink = $('link[rel~="icon"]').first();
    let favicon = iconLink.attr('href') || null;

    if (favicon && favicon.startsWith('/')) {
        const {origin} = new URL(originalLink);
        favicon = origin + favicon;
    }
    if (!favicon) {
        favicon = "https://cdn-icons-png.flaticon.com/128/3449/3449752.png";
    }

    return {title, favicon}

}