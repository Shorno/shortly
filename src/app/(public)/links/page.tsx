import {Suspense} from "react"
import LinksLoading from "@/components/link/links-loading"
import Links from "@/components/link/links"
import GetPublicURLs from "@/data/getPublicURLs"
import LinksPagination from "@/components/LinksPagination"
import type {SearchParams} from 'nuqs/server'
import {loadParams} from "@/utils/searchParams";


export const metadata = {
    title: "Links",
}

interface PageProps {
    searchParams: Promise<SearchParams>
}

export default async function LinksPage({searchParams}: PageProps) {
    const {page} = await loadParams(searchParams)
    const pageSize = 4
    const {data: paginatedLinks, totalCount} = await GetPublicURLs({
        page,
        pageSize: pageSize,
    })


    const totalPages = Math.ceil(totalCount / pageSize)

    return (
        <div className={"flex justify-center flex-col gap-10 items-center mx-auto py-32"}>
            <Suspense fallback={<LinksLoading/>} key={`links-${page}`}>
                <Links links={paginatedLinks}/>
            </Suspense>
            <LinksPagination currentPage={page} totalPages={totalPages} totalItems={totalCount}
                             pageSize={pageSize}/>
        </div>
    )
}
