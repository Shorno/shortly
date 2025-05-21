import GetOriginalURL from "@/actions/getOriginalURL";
import NotFound from "next/dist/client/components/not-found-error";
import {redirect} from "next/navigation";

export default async function RedirectPage({params}: { params: Promise<{ id: string }> }) {
    const {id} = await params;
    const response = await GetOriginalURL(id)

    if (!response.success) return NotFound()

    return  redirect(response.data.originalURL)
}