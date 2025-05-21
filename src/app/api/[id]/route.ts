import {type NextRequest, NextResponse} from 'next/server'
import {db} from "@/db";


export async function GET(request: NextRequest, {params}: { params: Promise<{ id: string }> }) {
    const {id} = await params;
    const existingLink = await db.query.links.findFirst({
        where: (links, {eq}) => eq(links.generatedID, id)
    })

    if (!existingLink) {
        return NextResponse.json(
            {
                success: false,
                data: null,
                message: "Link not found"
            },
            {status: 404}
        );
    }

    return NextResponse.json(
        {
            success: true,
            data: existingLink,
            message: "Link found"
        },
        {status: 200}
    )
}