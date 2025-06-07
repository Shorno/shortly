import {NextRequest, NextResponse} from "next/server";
import * as cheerio from "cheerio"

export async function GET(request: NextRequest) {
    const {searchParams} = new URL(request.url);
    const url = searchParams.get("url");

    if (!url) {
        return NextResponse.json({error: "URL is required"}, {status: 400});
    }
    const {hostname} = new URL(url)

    try {

        const response = await fetch(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36 Edg/136.0.0.0",
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',

            },
        })

        if (!response.ok) {
            return NextResponse.json({title: hostname});
        }

        const html = await response.text()

        const $ = cheerio.load(html)
        let title: string | undefined = $('title').first().text().trim();

        if (!title) {
            title = $('meta[property="og:title"]').attr('content')?.trim();
        }

        if (!title) {
            title = $('meta[name="twitter:title"]').attr('content')?.trim();
        }

        if (!title) {
            title = $('h1').first().text().trim();
        }
        if (!title) {
            title = 'No title found';
        }

        title = title.replace(/\s+/g, ' ').trim();

        const tempDiv = cheerio.load('<div></div>')('div');
        tempDiv.html(title);
        title = tempDiv.text();


        return NextResponse.json({title})


    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json(
                {error: "Failed to fetch title", details: error.message},
                {status: 500}
            );
        }

    }
}
