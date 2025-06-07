import {NextResponse} from "next/server";
import puppeteer from "puppeteer";


export async function GET(request: Request) {
    const {searchParams} = new URL(request.url);
    const url = searchParams.get("url");

    if (!url) {
        return NextResponse.json({error: "URL is required"}, {status: 400});
    }
    const {hostname} = new URL(url)

    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });

        const page = await browser.newPage();
        await page.goto(url, {waitUntil: "networkidle2"});

        const title = await page.title();
        await browser.close();

        if (!title || title === "" || title === "Just a moment...") {
            return NextResponse.json({title: hostname});
        }
        return NextResponse.json({title});

    } catch (error: any) {
        console.error(error);
        return NextResponse.json(
            {error: "Failed to fetch title", details: error.message},
            {status: 500}
        );
    }
}
