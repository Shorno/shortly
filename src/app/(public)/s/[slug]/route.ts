import GetOriginalURL from "@/utils/getOriginalURL";
import {db} from "@/db";
import {analytics} from "@/db/schema";
import {revalidateTag} from "next/cache";
import {NextRequest} from "next/server";

export async function GET(
    request: NextRequest,
    {params}: { params: Promise<{ slug: string }> }
) {
    const {slug} = await params;
    const response = await GetOriginalURL(slug);

    if (!response.success) {
        return new Response("Not Found", {status: 404});
    }

    await db.insert(analytics).values({
        linkSlug: slug
    });

    revalidateTag(`analytics-${slug}`)

    return Response.redirect(response.data.original_url, 302);
}