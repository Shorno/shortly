import {Suspense} from "react";
import LinksLoading from "@/components/link/links-loading";
import Links from "@/components/link/links";
import {GetUserURLs} from "@/data/getUserURLs";
import UnauthorizedCard from "@/components/un-authorized";

export default async function MyLinksPage() {
    const response = await GetUserURLs();

    if (response.status === 401) return <div className={"mt-32"}><UnauthorizedCard/></div>

    return (
        <div className={"flex justify-center pt-10"}>

            <Suspense fallback={<LinksLoading/>}>
                <Links links={response.data}/>
            </Suspense>
        </div>
    )
}