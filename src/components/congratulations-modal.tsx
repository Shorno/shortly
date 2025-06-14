"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { LinkIcon, Copy, ExternalLink, Sparkles, Eye } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import useCopyToClipboard from "@/hooks/useCopyToClipboard"
import Image from "next/image"

interface ShortUrlData {
    original_url: string
    short_url: string
    generated_id: string
    site_title: string
    site_favicon: string
}

interface CongratulationsModalProps {
    isOpen: boolean
    onCloseAction: () => void
    shortUrlData: ShortUrlData | null
}

export default function CongratulationsModal({ isOpen, onCloseAction, shortUrlData }: CongratulationsModalProps) {
    shortUrlData = {
        original_url: "https://github.com/opennextjs/opennextjs-cloudflare/issues/231",
        short_url: "http://localhost:3000/s/vzeUqV",
        generated_id: "vzeUqV",
        site_favicon: "https://www.google.com/s2/favicons?domain=github.com&sz=64",
        site_title: "[BUG] env is not accessible writing inline · Issue #231 · opennextjs/opennextjs-cloudflare"
    }

    const router = useRouter()
    const [copied, copy] = useCopyToClipboard()

    const handleCopy = async (text: string) => {
        const success = await copy(text)
        if (success) {
            toast.success("Copied to clipboard!")
        } else {
            toast.error("Failed to copy")
        }
    }

    const handleViewAllLinks = () => {
        onCloseAction()
        router.push("/links")
    }

    const truncateText = (text: string, maxLength: number, mobileMaxLength?: number) => {
        const effectiveMaxLength = window.innerWidth < 640 ? mobileMaxLength || Math.floor(maxLength * 0.7) : maxLength
        if (text.length <= effectiveMaxLength) return text
        return text.substring(0, effectiveMaxLength) + "..."
    }

    return (
        <TooltipProvider>
            <Dialog open={isOpen} onOpenChange={onCloseAction}>
                <DialogContent className="w-[calc(100vw-2rem)] max-w-lg mx-auto p-4 sm:p-6">
                    <DialogHeader className="space-y-2">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <div className="p-2 sm:p-2.5 bg-indigo-50 dark:bg-indigo-950/50 rounded-lg border border-indigo-100 dark:border-indigo-900 flex-shrink-0">
                                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <DialogTitle className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 truncate">
                                Congratulations!
                            </DialogTitle>
                        </div>
                    </DialogHeader>

                    <div className="space-y-4 sm:space-y-5">
                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                            🎉 You&#39;ve successfully created your first short URL! Here&#39;s your new link:
                        </p>

                        {shortUrlData && (
                            <div className="space-y-3 sm:space-y-4">
                                {/* Website Info */}
                                <div className="flex items-start gap-2 sm:gap-3 p-2.5 sm:p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-800">
                                    {shortUrlData.site_favicon ? (
                                        <Image
                                            width={16}
                                            height={16}
                                            src={shortUrlData.site_favicon || "/placeholder.svg"}
                                            alt="Site favicon"
                                            className="w-4 h-4 sm:w-5 sm:h-5 rounded-sm flex-shrink-0 mt-0.5"
                                            onError={(e) => {
                                                e.currentTarget.style.display = "none"
                                            }}
                                        />
                                    ) : (
                                        <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gray-200 dark:bg-gray-700 rounded-sm flex-shrink-0 mt-0.5" />
                                    )}
                                    <div className="flex-1 min-w-0 space-y-1">
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <p className="font-medium text-gray-900 dark:text-gray-100 text-xs sm:text-sm cursor-help line-clamp-2 leading-tight">
                                                    {shortUrlData.site_title || "Untitled"}
                                                </p>
                                            </TooltipTrigger>
                                            <TooltipContent side="bottom" className="max-w-xs">
                                                <p className="text-xs break-words">{shortUrlData.site_title || "Untitled"}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 cursor-help truncate">
                                                    {truncateText(shortUrlData.original_url, 35, 25)}
                                                </p>
                                            </TooltipTrigger>
                                            <TooltipContent side="bottom" className="max-w-xs sm:max-w-sm">
                                                <p className="text-xs break-all">{shortUrlData.original_url}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>
                                </div>

                                {/* Short URL Display */}
                                <div className="p-3 sm:p-4 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 rounded-lg border border-indigo-100 dark:border-indigo-800">
                                    <div className="flex items-center gap-2 p-2.5 sm:p-3 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                                        <LinkIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <code className="text-xs sm:text-sm font-mono text-indigo-700 dark:text-indigo-300 cursor-help block truncate">
                                                        {truncateText(shortUrlData.short_url, 25, 20)}
                                                    </code>
                                                </TooltipTrigger>
                                                <TooltipContent side="bottom" className="max-w-xs sm:max-w-sm">
                                                    <p className="text-xs font-mono break-all">{shortUrlData.short_url}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </div>
                                        <div className="flex gap-1 flex-shrink-0">
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() => handleCopy(shortUrlData.short_url)}
                                                        className="h-7 w-7 sm:h-8 sm:w-8 p-0 hover:bg-indigo-100 dark:hover:bg-indigo-900/50"
                                                        disabled={copied}
                                                    >
                                                        <Copy className={`h-3 w-3 ${copied ? "text-green-600" : "text-gray-500"}`} />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p className="text-xs">{copied ? "Copied!" : "Copy link"}</p>
                                                </TooltipContent>
                                            </Tooltip>

                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() => window.open(shortUrlData.short_url, "_blank")}
                                                        className="h-7 w-7 sm:h-8 sm:w-8 p-0 hover:bg-indigo-100 dark:hover:bg-indigo-900/50"
                                                    >
                                                        <ExternalLink className="h-3 w-3 text-gray-500" />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p className="text-xs">Open link</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-1 sm:pt-2">
                                    <Button
                                        variant="outline"
                                        onClick={onCloseAction}
                                        className="flex-1 border-gray-200 dark:border-gray-700 text-sm sm:text-base h-9 sm:h-10"
                                    >
                                        Close
                                    </Button>
                                    <Button
                                        onClick={handleViewAllLinks}
                                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm text-sm sm:text-base h-9 sm:h-10"
                                    >
                                        <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 flex-shrink-0" />
                                        <span className="truncate">View All Links</span>
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </TooltipProvider>
    )
}
