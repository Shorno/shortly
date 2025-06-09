import AnalyticsLoading from "@/components/analytics/analytics-loading"

export default function Loading() {
    return (
        <main
            className="min-h-screen py-12 px-2">
            <div className="w-full max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Link Analytics</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Loading detailed insights and performance metrics...
                    </p>
                </div>

                <AnalyticsLoading/>
            </div>
        </main>
    )
}
