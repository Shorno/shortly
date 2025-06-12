"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface LinksPaginationProps {
    currentPage: number
    totalPages: number
    totalItems: number
    pageSize: number
}

export default function LinksPagination({
                                            currentPage,
                                            totalPages,
                                            totalItems,
                                            pageSize
                                        }: LinksPaginationProps) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const navigateToPage = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        if (page === 1) {
            params.set('page', '1'); // Explicitly set page to 1
        } else {
            params.set('page', page.toString());
        }

        const queryString = params.toString();
        const url = queryString ? `?${queryString}` : '';
        router.push(url);
    };


    const startItem = (currentPage - 1) * pageSize + 1
    const endItem = Math.min(currentPage * pageSize, totalItems)

    if (totalPages <= 1) return null

    const renderPageNumbers = () => {
        const pages = []
        const maxVisiblePages = 5

        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1)
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => navigateToPage(i)}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        i === currentPage
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                >
                    {i}
                </button>
            )
        }

        return pages
    }

    return (
        <div className="flex flex-col items-center gap-4 mt-8">
            {/* Results info */}
            <div className="text-sm text-gray-700 dark:text-gray-300">
                Showing {startItem} to {endItem} of {totalItems} results
            </div>

            {/* Pagination controls */}
            <div className="flex items-center gap-2">
                {/* Previous button */}
                <button
                    onClick={() => navigateToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        currentPage === 1
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                </button>

                {/* Page numbers */}
                <div className="flex items-center gap-1">
                    {renderPageNumbers()}
                </div>

                {/* Next button */}
                <button
                    onClick={() => navigateToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        currentPage === totalPages
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                >
                    Next
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    )
}
