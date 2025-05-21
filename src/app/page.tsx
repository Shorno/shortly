import LinkForm from "@/components/link-form";
import Links from "@/components/links";
import {Suspense} from "react";
import LinksLoading from "@/components/links-loading";


export default function Home() {

    return (
        <div className={"flex justify-center items-center flex-col"}>
            Welcome to Ultimate URL Shortener
            <LinkForm/>
            <Suspense fallback={<LinksLoading/>}
            >
                <Links/>
            </Suspense>
        </div>
    );
}
