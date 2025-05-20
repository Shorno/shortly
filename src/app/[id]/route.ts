import { redirect } from 'next/navigation';
import {type NextRequest} from 'next/server'


export async function GET(request: NextRequest, {params}: { params: Promise<{ id: string }> }) {
    const {id} = await params;
    if (id == "123"){
        redirect("https://www.youtube.com/");
    }

    return new Response(`Hello world ${id}`)
}