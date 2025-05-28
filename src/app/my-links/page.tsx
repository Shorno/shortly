import {Suspense} from "react";
import LinksLoading from "@/components/links-loading";
import Links from "@/components/links";
import {GetUserURLs} from "@/actions/getUserURLs";

export default async function MyLinksPage() {
    const links = await GetUserURLs();
    return (
        <div className={"flex justify-center pt-10"}>
            <Suspense fallback={<LinksLoading/>}
            >
                <Links links={links}/>
            </Suspense>
        </div>
    )
}