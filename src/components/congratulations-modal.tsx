"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { LinkIcon, Copy, ExternalLink, Sparkles, Eye } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import useCopyToClipboard from "@/hooks/useCopyToClipboard"

interface ShortUrlData {
    original_url: string
    short_url: string
    generated_id: string
    site_title: string
    site_favicon: string
}

interface CongratulationsModalProps {
    isOpen: boolean
    onClose: () => void
    shortUrlData: ShortUrlData | null
}

export default function CongratulationsModal({ isOpen, onClose, shortUrlData }: CongratulationsModalProps) {
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
        onClose()
        router.push("/links")
    }

    const truncateUrl = (url: string, maxLength = 50) => {
        if (url.length <= maxLength) return url
        return url.substring(0, maxLength) + "..."
    }

    return (
        <TooltipProvider>
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/50 rounded-lg border border-indigo-100 dark:border-indigo-900">
                                <Sparkles className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                                Congratulations!
                            </DialogTitle>
                        </div>
                    </DialogHeader>

                    <div className="space-y-5">
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            🎉 You&#39;ve successfully created your first short URL! Here&#39;s your new link:
                        </p>

                        {shortUrlData && (
                            <div className="space-y-4">
                                {/* Website Info */}
                                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-800">
                                    {shortUrlData.site_favicon ? (
                                        <img
                                            src={shortUrlData.site_favicon || "/placeholder.svg"}
                                            alt="Site favicon"
                                            className="w-5 h-5 rounded-sm flex-shrink-0"
                                            onError={(e) => {
                                                e.currentTarget.style.display = "none"
                                            }}
                                        />
                                    ) : (
                                        <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded-sm flex-shrink-0" />
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-gray-900 dark:text-gray-100 truncate text-sm">
                                            {shortUrlData.site_title || "Untitled"}
                                        </p>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate cursor-help">
                                                    {truncateUrl(shortUrlData.original_url, 45)}
                                                </p>
                                            </TooltipTrigger>
                                            <TooltipContent side="bottom" className="max-w-xs break-all">
                                                <p className="text-xs">{shortUrlData.original_url}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>
                                </div>

                                {/* Short URL Display */}
                                <div className="p-4 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 rounded-lg border border-indigo-100 dark:border-indigo-800">
                                    <div className="flex items-center gap-2 p-3 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                                        <LinkIcon className="h-4 w-4 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                                        <code className="flex-1 text-sm font-mono text-indigo-700 dark:text-indigo-300 truncate">
                                            {shortUrlData.short_url}
                                        </code>
                                        <div className="flex gap-1">
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() => handleCopy(shortUrlData.short_url)}
                                                        className="h-8 w-8 p-0 hover:bg-indigo-100 dark:hover:bg-indigo-900/50"
                                                        disabled={copied}
                                                    >
                                                        <Copy className={`h-3 w-3 ${copied ? "text-green-600" : "text-gray-500"}`} />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>{copied ? "Copied!" : "Copy link"}</p>
                                                </TooltipContent>
                                            </Tooltip>

                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() => window.open(shortUrlData.short_url, "_blank")}
                                                        className="h-8 w-8 p-0 hover:bg-indigo-100 dark:hover:bg-indigo-900/50"
                                                    >
                                                        <ExternalLink className="h-3 w-3 text-gray-500" />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Open link</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3 pt-2">
                                    <Button variant="outline" onClick={onClose} className="flex-1 border-gray-200 dark:border-gray-700">
                                        Close
                                    </Button>
                                    <Button
                                        onClick={handleViewAllLinks}
                                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
                                    >
                                        <Eye className="h-4 w-4 mr-2" />
                                        View All Links
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
