import {Suspense} from "react";
import LinksLoading from "@/components/link/links-loading";
import Links from "@/components/link/links";
import GetPublicURLs from "@/data/getPublicURLs";

export const dynamic = "force-dynamic"


export default async function LinksPage() {
    const links = await GetPublicURLs();

    return (
        <div className={"flex justify-center pt-10"}>
            <Suspense fallback={<LinksLoading/>}
            >
                <Links links={links}/>
            </Suspense>
        </div>
    )
}