import {Suspense} from "react";
import LinksLoading from "@/components/links-loading";
import Links from "@/components/links";

export const dynamic = "force-dynamic"


export default function LinksPage() {
    return (
        <div className={"flex justify-center pt-10"}>
            <Suspense fallback={<LinksLoading/>}
            >
                <Links/>
            </Suspense>
        </div>
    )
}