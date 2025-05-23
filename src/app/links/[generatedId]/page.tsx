import GetAnalytics from "@/actions/getAnalytics"
import AnalyticsDashboard from "@/components/analytics-dashboard"

export default async function AnalyticsPage({params}: { params: Promise<{ generatedId: string }> }) {
    const {generatedId} = await params

    const {visitCount, visitTimestamps} = await GetAnalytics(generatedId)

    return (
        <main
            className="py-12 px-4">
            <div className="w-full max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Link Analytics</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Detailed insights and performance metrics for your shortened URL
                    </p>
                </div>

                <AnalyticsDashboard
                    visitCount={visitCount}
                    visitTimestamps={visitTimestamps}
                    generatedId={generatedId}
                />
            </div>
        </main>
    )
}
