import GetAnalytics from "@/data/getAnalytics"
import AnalyticsDashboard from "@/components/analytics/analytics-dashboard"

export const metadata = {
    title: "Analytics",
    description: "Detailed insights and performance metrics for your shortened URL"
}

export default async function AnalyticsPage({params}: { params: Promise<{ slug: string }> }) {
    const {slug} = await params

    const {visitCount, visitTimestamps} = await GetAnalytics(slug)

    return (
        <main
            className="py-12 px-2">
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
                    slug={slug}
                />
            </div>
        </main>
    )
}
