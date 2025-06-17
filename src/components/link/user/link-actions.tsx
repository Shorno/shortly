"use client"
import {Button} from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Copy, MoreHorizontal, Edit, Trash2, QrCode, Share, Archive} from "lucide-react"
import useCopyToClipboard from "@/hooks/useCopyToClipboard"
import {toast} from "sonner"
import {useState} from "react";
import EditSlugModal from "@/components/link/user/edit-slug-modal";
import type {ShortURL} from "@/data/getPublicURLs";

export default function LinkActions({original_url, short_url, site_title, site_favicon, slug, user_id, id}: ShortURL) {
    const [showEditSlugModal, setShowEditSlugModal] = useState(false)
    const [, copy] = useCopyToClipboard()

    const handleCopy = async () => {
        const success = await copy(short_url)
        if (success) {
            toast.success("Link copied to clipboard!")
        }
    }

    const handleEditSlug = () => {
        setShowEditSlugModal(true)
        toast.info("Edit functionality coming soon!")
    }
    const handleDelete = () => toast.info("Delete functionality coming soon!")
    const handleQRCode = () => toast.info("QR Code generation coming soon!")
    const handleShare = () => toast.info("Share functionality coming soon!")
    const handleArchive = () => toast.info("Archive functionality coming soon!")

    return (
        <div className="flex items-center gap-1">
            {/* Copy Button */}
            <Button
                onClick={handleCopy}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
                <Copy className="h-4 w-4 text-gray-500"/>
            </Button>

            {/* More Actions Dropdown */}
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800">
                        <MoreHorizontal className="h-4 w-4 text-gray-500"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 border-neutral-50 dark:border-neutral-800">
                    <DropdownMenuItem onClick={() => handleEditSlug()}>
                        <Edit className="h-4 w-4 mr-2"/>
                        Edit Link
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleQRCode}>
                        <QrCode className="h-4 w-4 mr-2"/>
                        Generate QR Code
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleShare}>
                        <Share className="h-4 w-4 mr-2"/>
                        Share Link
                    </DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem onClick={handleArchive}>
                        <Archive className="h-4 w-4 mr-2"/>
                        Archive Link
                    </DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem
                        onClick={handleDelete}
                        className="text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400"
                    >
                        <Trash2 className="h-4 w-4 mr-2"/>
                        Delete Link
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <EditSlugModal
                isOpen={showEditSlugModal}
                onCloseAction={() => setShowEditSlugModal(false)}
                short_url={short_url}
                id={id}
            />
        </div>
    )
}
