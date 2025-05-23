import Image from "next/image";
import Link from "next/link";
import {ShortURL} from "@/actions/getURLs";
import {Separator} from "@/components/ui/separator";
import {ArrowRight} from "lucide-react";

export default function LinkDisplay({original_url, short_url, site_title, site_favicon, generated_id}: ShortURL) {
    return (
        <div className={"flex md:gap-4"}>
            <div className={"flex mt-1"}>
                <Image src={site_favicon} alt={site_title} width={24} height={24}
                       className={"rounded-full object-cover  min-w-8 min-h-8 max-w-8 max-h-8  hidden md:flex"}/>
            </div>
            <div className={"flex flex-col gap-1 px-2"}>
                <p className={"font-semibold"}>{site_title}</p>
                <Link className={"font-semibold text-blue-500"} href={short_url}
                      target={"_blank"}>{short_url}
                </Link>
                <div className={"flex flex-col"}>
                    <Link className={"text-sm"} href={original_url}
                          target={"_blank"}>{original_url}</Link>
                </div>
                <Separator className={"mt-2"}/>
                <div>
                    <Link className={"text-blue-500 flex"} href={`/links/${generated_id}`}>View Analytics <ArrowRight/></Link>
                </div>
            </div>
        </div>
    )
}