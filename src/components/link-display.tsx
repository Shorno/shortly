import Image from "next/image";
import Link from "next/link";
import {ShortURL} from "@/actions/getURLs";

export default function LinkDisplay({originalURL, shortURL, siteTitle, siteFavicon}: ShortURL) {
    return (
        <div className={"flex md:gap-4"}>
            <div className={"flex mt-1"}>
                <Image src={siteFavicon} alt={siteTitle} width={24} height={24}
                       className={"rounded-full object-cover  min-w-8 min-h-8 max-w-8 max-h-8  hidden md:flex"}/>
            </div>
            <div className={"flex flex-col gap-1"}>
                <p className={"font-semibold"}>{siteTitle}</p>
                <Link className={"font-semibold text-blue-500"} href={shortURL}
                      target={"_blank"}>{shortURL}
                </Link>
                <div className={"flex flex-col"}>
                    <Link className={"text-sm"} href={originalURL}
                          target={"_blank"}>{originalURL}</Link>
                </div>
            </div>
        </div>
    )
}