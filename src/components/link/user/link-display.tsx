import Image from "next/image"
import Link from "next/link"
import {Eye, Calendar, Star} from "lucide-react"
import type {ShortURL} from "@/data/getPublicURLs"
import LinkActions from "@/components/link/user/link-actions"
import {Separator} from "@/components/ui/separator";

export default function LinkDisplay({original_url, short_url, site_title, site_favicon, slug, user_id, id}: ShortURL) {
    const dummyClicks = Math.floor(Math.random() * 2000) + 50
    const dummyDate = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    })
    const isFavorite = Math.random() > 0.7

    const truncateUrl = (url: string, maxLength = 50) => {
        if (url.length <= maxLength) return url
        return url.substring(0, maxLength) + "..."
    }

    return (
        <div className="space-y-3">
            {/* Header with favicon, title, and actions */}
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="flex-shrink-0 mt-0.5">
                        <Image
                            src={site_favicon || "/placeholder.svg"}
                            alt={site_title}
                            width={20}
                            height={20}
                            className="rounded-sm object-cover w-5 h-5"
                        />
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                        {/* Title with optional star */}
                        <div className="flex items-center gap-2">
                            <h3 className="font-medium text-gray-900 dark:text-gray-100 text-sm leading-tight line-clamp-1">
                                {site_title}
                            </h3>
                            {isFavorite && <Star className="h-4 w-4 text-yellow-500 fill-current flex-shrink-0"/>}
                        </div>

                        {/* Short URL */}
                        <Link
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors text-sm font-medium block"
                            href={short_url}
                            target="_blank"
                        >
                            {short_url}
                        </Link>

                        {/* Original URL */}
                        <Link
                            prefetch={false}
                            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors text-sm block"
                            href={original_url}
                            target="_blank"
                        >
                            {truncateUrl(original_url, 60)}
                        </Link>
                    </div>
                </div>
                <LinkActions
                    original_url={original_url}
                    short_url={short_url}
                    site_title={site_title}
                    site_favicon={site_favicon}
                    slug={slug}
                    user_id={user_id}
                    id={id}
                />
            </div>
            <Separator/>

            <div className={"flex justify-between"}>
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4"/>
                        <span>{dummyClicks.toLocaleString()} clicks</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4"/>
                        <span>{dummyDate}</span>
                    </div>
                </div>
                <Link
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors text-sm font-medium"
                    href={`/dashboard/analytics/${slug}`}
                >
                    Analytics
                </Link>
            </div>
        </div>
    )
}
