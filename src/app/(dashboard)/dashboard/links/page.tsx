import {Suspense} from "react";
import LinksLoading from "@/components/link/links-loading";
import Links from "@/components/link/links";
import {GetUserURLs} from "@/data/getUserURLs";
import UnauthorizedCard from "@/components/un-authorized";
import {PageProps} from "@/app/(public)/links/page";
import {loadParams} from "@/utils/searchParams";
import LinksPagination from "@/components/LinksPagination";

export const metadata = {
    title: "Links"
}

export default async function MyLinksPage({searchParams}: PageProps) {
    const {page} = await loadParams(searchParams)
    const pageSize = 10

    const response = await GetUserURLs({
        page,
        pageSize: pageSize
    });

    const totalPages = Math.ceil(response.totalCount / pageSize)


    if (response?.status === 401) return <div className={"mt-32"}><UnauthorizedCard/></div>

    return (
        <div className={"flex justify-center flex-col gap-10 items-center mx-auto py-20"}>
            <Suspense fallback={<LinksLoading/>}>
                <Links links={response?.data}/>
            </Suspense>
            <LinksPagination
                currentPage={page}
                totalPages={totalPages}
                totalItems={response.totalCount}
                pageSize={pageSize}
            />
        </div>
    )
}