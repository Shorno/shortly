import {type NextRequest} from 'next/server'
import {redirect} from "next/navigation";
import {db} from "@/db";


export async function GET(request: NextRequest, {params}: { params: Promise<{ id: string }> }) {
    const {id} = await params;
    const existingLink = await db.query.links.findFirst({
        where: (links, {eq}) => eq(links.generatedID, id)
    })

    if (!existingLink) {
        return new Response('Not found', {status: 404});
    }

    redirect(existingLink.originalURL)
}