import {Suspense} from "react"
import LinksLoading from "@/components/link/links-loading"
import Links from "@/components/link/links"
import GetPublicURLs from "@/data/getPublicURLs"
import LinksPagination from "@/components/LinksPagination"
import {nanoid} from "nanoid";

export const metadata = {
    title: "Links",
}

export default async function LinksPage({
                                            searchParams,
                                        }: {
    searchParams: Promise<{ page?: string | undefined }>
}) {
    const params = await searchParams
    const currentPage = Number(params.page) || 1
    const pageSize = 4

    // Get paginated data and total count
    const {data: paginatedLinks, totalCount} = await GetPublicURLs({
        page: currentPage,
        pageSize: pageSize,
    })

    console.log(paginatedLinks)

    const totalPages = Math.ceil(totalCount / pageSize)

    return (
        <div className={"flex justify-center flex-col gap-10 items-center mx-auto pt-32"}>
            <Suspense fallback={<LinksLoading/>} key={nanoid(4)}>
                <Links links={paginatedLinks}/>
            </Suspense>
            <LinksPagination currentPage={currentPage} totalPages={totalPages} totalItems={totalCount}
                             pageSize={pageSize}/>
        </div>
    )
}
