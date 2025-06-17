"use client"
import Image from "next/image"
import Link from "next/link"
import type {ShortURL} from "@/data/getPublicURLs"
import {Button} from "@/components/ui/button";
import {Copy} from "lucide-react";
import useCopyToClipboard from "@/hooks/useCopyToClipboard";
import {toast} from "sonner";
import {truncateUrl} from "@/utils/truncateUrl";

export default function PublicLinkDisplay({original_url, short_url, site_title, site_favicon}: ShortURL) {
    const [, copy] = useCopyToClipboard()

    const handleCopy = async () => {
        const success = await copy(short_url)
        if (success) {
            toast.success("Link copied to clipboard!")
        }
    }


    return (
        <div className="space-y-3">
            <div className="flex items-start justify-between  gap-3">
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
                        <div className="flex items-center gap-2">
                            <h3 className="font-medium text-gray-900 dark:text-gray-100 text-sm leading-tight line-clamp-1">
                                {site_title}
                            </h3>
                        </div>

                        <Link
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors text-sm font-medium block"
                            href={short_url}
                            target="_blank"
                        >
                            {short_url}
                        </Link>

                        <Link
                            prefetch={false}
                            className="text-gray-500 text-wrapdark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors text-sm block"
                            href={original_url}
                            target="_blank"
                        >
                            {truncateUrl(original_url, 30)}
                        </Link>
                    </div>
                </div>
                <Button
                    onClick={handleCopy}
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                    <Copy className="h-4 w-4 text-gray-500"/>
                </Button>
            </div>

        </div>
    )
}
