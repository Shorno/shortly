"use client"

import {useRouter, useSearchParams} from "next/navigation"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

interface LinksPaginationProps {
    currentPage: number
    totalPages: number
    totalItems: number
    pageSize: number
}

export default function LinksPagination({currentPage, totalPages, totalItems, pageSize}: LinksPaginationProps) {


    console.log("LinksPagination rendered with currentPage:", currentPage, "totalPages:", totalPages, "totalItems:", totalItems, "pageSize:", pageSize)
    const router = useRouter()
    const searchParams = useSearchParams()

    const createPageURL = (pageNumber: number) => {
        const params = new URLSearchParams(searchParams)
        params.set("page", pageNumber.toString())
        return `?${params.toString()}`
    }

    const handlePageChange = (page: number) => {
        router.push(createPageURL(page))
    }

    const handlePrevious = () => {
        if (currentPage > 1) {
            handlePageChange(currentPage - 1)
        }
    }

    const handleNext = () => {
        if (currentPage < totalPages) {
            handlePageChange(currentPage + 1)
        }
    }

    // Generate page numbers with ellipsis logic
    const generatePageNumbers = () => {
        const pages: (number | string)[] = []
        const maxVisiblePages = 5

        if (totalPages <= maxVisiblePages) {
            // Show all pages if total pages is small
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            // Show pages with ellipsis
            if (currentPage <= 3) {
                // Show first few pages
                for (let i = 1; i <= 4; i++) {
                    pages.push(i)
                }
                pages.push("ellipsis")
                pages.push(totalPages)
            } else if (currentPage >= totalPages - 2) {
                // Show last few pages
                pages.push(1)
                pages.push("ellipsis")
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i)
                }
            } else {
                // Show middle pages
                pages.push(1)
                pages.push("ellipsis")
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i)
                }
                pages.push("ellipsis")
                pages.push(totalPages)
            }
        }

        return pages
    }

    // Don't render pagination if there's only one page or no items
    if (totalPages <= 1) {
        return null
    }

    const startItem = (currentPage - 1) * pageSize + 1
    const endItem = Math.min(currentPage * pageSize, totalItems)

    return (
        <div className="flex flex-col items-center gap-4">
            {/* Page info */}
            <p className="text-sm text-muted-foreground">
                Showing {startItem}-{endItem} of {totalItems} links
            </p>

            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href={currentPage > 1 ? createPageURL(currentPage - 1) : "#"}
                            onClick={(e) => {
                                e.preventDefault()
                                handlePrevious()
                            }}
                            className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                    </PaginationItem>

                    {generatePageNumbers().map((page, index) => (
                        <PaginationItem key={index}>
                            {page === "ellipsis" ? (
                                <PaginationEllipsis/>
                            ) : (
                                <PaginationLink
                                    href={createPageURL(page as number)}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        handlePageChange(page as number)
                                    }}
                                    isActive={currentPage === page}
                                    className="cursor-pointer"
                                >
                                    {page}
                                </PaginationLink>
                            )}
                        </PaginationItem>
                    ))}

                    <PaginationItem>
                        <PaginationNext
                            href={currentPage < totalPages ? createPageURL(currentPage + 1) : "#"}
                            onClick={(e) => {
                                e.preventDefault()
                                handleNext()
                            }}
                            className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>

            {/* Current page indicator */}
            <p className="text-xs text-muted-foreground">
                Page {currentPage} of {totalPages}
            </p>
        </div>
    )
}
