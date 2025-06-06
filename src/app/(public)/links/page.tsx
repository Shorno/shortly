import {Suspense} from "react";
import LinksLoading from "@/components/links-loading";
import Links from "@/components/links";
import GetPublicURLs from "@/actions/getPublicURLs";

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