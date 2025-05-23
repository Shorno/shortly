import GetOriginalURL from "@/actions/getOriginalURL";
import NotFound from "next/dist/client/components/not-found-error";
import {redirect} from "next/navigation";
import {db} from "@/db";
import {analytics} from "@/db/schema";

export default async function RedirectPage({params}: { params: Promise<{ id: string }> }) {
    const {id} = await params;
    const response = await GetOriginalURL(id)

    if (!response.success) return NotFound()

    await db.insert(analytics).values({
        linkGeneratedId: id
    })


    return redirect(response.data.original_url)
}