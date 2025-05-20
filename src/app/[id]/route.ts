import {type NextRequest} from 'next/server'
import {prisma} from "@/lib/prisma";
import {redirect} from "next/navigation";


export async function GET(request: NextRequest, {params}: { params: Promise<{ id: string }> }) {
    const {id} = await params;
    const existingLink = await prisma.link.findUnique({
        where: {
            generatedID: id
        }
    })


    if (!existingLink) {
        return new Response('Not found', {status: 404});
    }

    redirect(existingLink.originalURL)

}