"use client"
import {ChevronLeft, ChevronRight} from 'lucide-react'
import {useTransition} from "react";
import {useQueryState, parseAsInteger} from "nuqs";

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
    const [, startTransition] = useTransition()
    const [page, setPage] = useQueryState("page",
        parseAsInteger.withDefault(1).withOptions({shallow: false, history: 'replace', startTransition})
    )


    const navigateToPage = (page: number) => setPage(Math.max(1, Math.min(totalPages, page)))

    if (totalPages <= 1) return null

    const startItem = (currentPage - 1) * pageSize + 1
    const endItem = Math.min(currentPage * pageSize, totalItems)

    const pageButtons = Array.from({length: totalPages}, (_, index) => (
        <button
            key={index + 1}
            onClick={() => navigateToPage(index + 1)}
            className={`px-3 py-2 text-sm font-medium rounded-md ${
                page === index + 1
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
            }`}
        >
            {index + 1}
        </button>
    ))

    return (
        <div className="flex flex-col items-center gap-4 mt-8">
            {/* Results info */}
            <div className="text-sm text-gray-700 dark:text-gray-300">
                Showing {startItem} to {endItem} of {totalItems} results
            </div>

            {/* Pagination controls */}
            <div className="flex items-center gap-2">
                <button
                    onClick={() => navigateToPage(page - 1)}
                    disabled={currentPage === 1}
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        currentPage === 1
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                >
                    <ChevronLeft className="w-4 h-4"/>
                    Previous
                </button>

                <div className="flex items-center gap-1">
                    {pageButtons}
                </div>

                <button
                    onClick={() => navigateToPage(page + 1)}
                    disabled={currentPage === totalPages}
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        currentPage === totalPages
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                >
                    Next
                    <ChevronRight className="w-4 h-4"/>
                </button>
            </div>
        </div>
    )
}
