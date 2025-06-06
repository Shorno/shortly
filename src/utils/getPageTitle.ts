"use server"
import puppeteer from "puppeteer";

export default async function getPageTitle(url: string) {
    if (!url) throw new Error('Invalid URL');
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 Edg/137.0.0.0');
    await page.goto(url, {waitUntil: 'networkidle0'});
    const title = await page.title();
    await browser.close();
    return title;
}
