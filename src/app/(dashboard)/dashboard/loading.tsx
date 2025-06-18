export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-[50vh] w-full">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-gray-200 dark:border-gray-700 rounded-full animate-spin">
                    <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-blue-600 dark:border-t-blue-400 rounded-full"></div>
                </div>

                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 animate-pulse">Loading...</p>
                </div>
            </div>
        </div>
    )
}