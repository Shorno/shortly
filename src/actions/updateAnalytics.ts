"use server"

import {db} from "@/db";
import {analytics} from "@/db/schema";
import {revalidateTag} from "next/cache";

export default async function updateAnalytics(id: string) {
    await db.insert(analytics).values({
        linkSlug: id
    })

    revalidateTag("analytics");

}