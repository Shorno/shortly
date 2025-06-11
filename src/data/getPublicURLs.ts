"use cache"

import { db } from "@/db"
import { eq, count } from "drizzle-orm"
import { links } from "@/db/schema"

export interface ShortURL {
    id: number
    generated_id: string
    original_url: string
    short_url: string
    site_favicon: string
    site_title: string
    user_id: string | null
    is_public: boolean
}

export interface PaginatedURLs {
    data: ShortURL[]
    totalCount: number
}

export default async function GetPublicURLs({
                                                page = 1,
                                                pageSize = 4,
                                            }: {
    page?: number
    pageSize?: number
} = {}): Promise<PaginatedURLs> {

    const data = await db.query.links.findMany({
        where: eq(links.is_public, true),
        limit: pageSize,
        offset: (page - 1) * pageSize,
    })

    const totalCountResult = await db.select({ count: count() }).from(links).where(eq(links.is_public, true))

    const totalCount = totalCountResult[0]?.count || 0

    return {
        data,
        totalCount,
    }
}
