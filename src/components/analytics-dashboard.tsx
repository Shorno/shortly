"use client"

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart"
import {BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line} from "recharts"
import {TrendingUp, Eye, Clock, Calendar, Activity, ExternalLink} from "lucide-react"
import {useMemo} from "react"

interface AnalyticsDashboardProps {
    visitCount: number
    visitTimestamps: Array<{ visitedAt: Date }>
    generatedId: string
}

export default function AnalyticsDashboard({visitCount, visitTimestamps, generatedId}: AnalyticsDashboardProps) {
    const analyticsData = useMemo(() => {
        const visits = visitTimestamps.map((v) => new Date(v.visitedAt))

        const dailyVisits = visits.reduce(
            (acc, date) => {
                const day = date.toISOString().split("T")[0]
                acc[day] = (acc[day] || 0) + 1
                return acc
            },
            {} as Record<string, number>,
        )

        const dailyData = Object.entries(dailyVisits).map(([date, count]) => ({
            date: new Date(date).toLocaleDateString("en-US", {month: "short", day: "numeric"}),
            visits: count,
        }))

        const hourlyVisits = visits.reduce(
            (acc, date) => {
                const hour = date.getHours()
                acc[hour] = (acc[hour] || 0) + 1
                return acc
            },
            {} as Record<number, number>,
        )

        const hourlyData = Array.from({length: 24}, (_, i) => ({
            hour: `${i.toString().padStart(2, "0")}:00`,
            visits: hourlyVisits[i] || 0,
        }))

        const recentActivity = visits
            .sort((a, b) => b.getTime() - a.getTime())
            .slice(0, 5)
            .map((date) => ({
                time: date.toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                }),
                timestamp: date,
            }))

        const peakHour = Object.entries(hourlyVisits).reduce(
            (max, [hour, count]) => (count > max.count ? {hour: Number.parseInt(hour), count} : max),
            {hour: 0, count: 0},
        )

        return {
            dailyData,
            hourlyData,
            recentActivity,
            peakHour,
            totalVisits: visitCount,
            uniqueDays: Object.keys(dailyVisits).length,
        }
    }, [visitTimestamps, visitCount])

    const chartConfig = {
        visits: {
            label: "Visits",
            color: "hsl(var(--chart-1))",
        },
    }

    return (
        <div className="space-y-6">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                    <Card
                        className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 border-purple-100 dark:border-purple-900">
                        <div
                            className="absolute -right-4 -top-4 w-20 h-20 bg-gradient-to-br from-purple-200/50 to-blue-200/50 dark:from-purple-700/20 dark:to-blue-700/20 rounded-full blur-xl"/>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
                            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Total
                                Visits</CardTitle>
                            <Eye className="h-4 w-4 text-purple-600 dark:text-purple-400"/>
                        </CardHeader>
                        <CardContent className="relative">
                            <div
                                className="text-2xl font-bold text-gray-900 dark:text-white">{analyticsData.totalVisits}</div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                Across {analyticsData.uniqueDays} {analyticsData.uniqueDays === 1 ? "day" : "days"}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <Card
                        className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-100 dark:border-blue-900">
                        <div
                            className="absolute -right-4 -top-4 w-20 h-20 bg-gradient-to-br from-blue-200/50 to-indigo-200/50 dark:from-blue-700/20 dark:to-indigo-700/20 rounded-full blur-xl"/>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
                            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Peak
                                Hour</CardTitle>
                            <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400"/>
                        </CardHeader>
                        <CardContent className="relative">
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                {analyticsData.peakHour.hour.toString().padStart(2, "0")}:00
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {analyticsData.peakHour.count} {analyticsData.peakHour.count === 1 ? "visit" : "visits"}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <Card
                        className="relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-100 dark:border-green-900">
                        <div
                            className="absolute -right-4 -top-4 w-20 h-20 bg-gradient-to-br from-green-200/50 to-emerald-200/50 dark:from-green-700/20 dark:to-emerald-700/20 rounded-full blur-xl"/>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
                            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Active
                                Days</CardTitle>
                            <Calendar className="h-4 w-4 text-green-600 dark:text-green-400"/>
                        </CardHeader>
                        <CardContent className="relative">
                            <div
                                className="text-2xl font-bold text-gray-900 dark:text-white">{analyticsData.uniqueDays}</div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Days with activity</p>
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <Card
                        className="relative overflow-hidden bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30 border-orange-100 dark:border-orange-900">
                        <div
                            className="absolute -right-4 -top-4 w-20 h-20 bg-gradient-to-br from-orange-200/50 to-red-200/50 dark:from-orange-700/20 dark:to-red-700/20 rounded-full blur-xl"/>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
                            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Avg.
                                Daily</CardTitle>
                            <TrendingUp className="h-4 w-4 text-orange-600 dark:text-orange-400"/>
                        </CardHeader>
                        <CardContent className="relative">
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                {analyticsData.uniqueDays > 0 ? Math.round(analyticsData.totalVisits / analyticsData.uniqueDays) : 0}
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Visits per day</p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                    <Card
                        className="bg-gradient-to-br from-purple-50/50 to-blue-50/50 dark:from-purple-950/20 dark:to-blue-950/20 border-purple-100 dark:border-purple-900">
                        <CardHeader>
                            <CardTitle className="text-gray-900 dark:text-white">Daily Visits</CardTitle>
                            <CardDescription className="text-gray-600 dark:text-gray-300">Visit patterns over
                                time</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={chartConfig}>
                                <ResponsiveContainer width="100%" height={200}>
                                    <BarChart data={analyticsData.dailyData}>
                                        <XAxis dataKey="date"/>
                                        <YAxis allowDecimals={false}/>
                                        <ChartTooltip content={<ChartTooltipContent/>}/>
                                        <Bar dataKey="visits" fill="#2b7fff" radius={[4, 4, 0, 0]}/>
                                    </BarChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <Card
                        className="bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-100 dark:border-blue-900">
                        <CardHeader>
                            <CardTitle className="text-gray-900 dark:text-white">Hourly Distribution</CardTitle>
                            <CardDescription className="text-gray-600 dark:text-gray-300">
                                When your link gets the most clicks
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={chartConfig}>
                                <ResponsiveContainer width="100%" height={200}>
                                    <LineChart data={analyticsData.hourlyData}>
                                        <XAxis dataKey="hour"/>
                                        <YAxis allowDecimals={false}/>
                                        <ChartTooltip content={<ChartTooltipContent/>}/>
                                        <Line
                                            type="monotone"
                                            dataKey="visits"
                                            stroke="hsl(var(--chart-1))"
                                            strokeWidth={2}
                                            dot={{fill: "#2b7fff", strokeWidth: 1, r: 2.5}}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Recent Activity */}
            <div>
                <Card
                    className="bg-gradient-to-br from-green-50/50 to-emerald-50/50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-100 dark:border-green-900">
                    <CardHeader>
                        <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
                            <Activity className="h-5 w-5 text-green-600 dark:text-green-400"/>
                            Recent Activity
                        </CardTitle>
                        <CardDescription className="text-gray-600 dark:text-gray-300">
                            Latest visits to your shortened link
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {analyticsData.recentActivity.length > 0 ? (
                                analyticsData.recentActivity.map((activity, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3 p-3 bg-white dark:bg-gray-900 rounded-lg border border-green-100 dark:border-green-800"
                                    >
                                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                        <ExternalLink className="h-4 w-4 text-gray-400"/>
                                        <span
                                            className="text-sm text-gray-600 dark:text-gray-300">Link visited on {activity.time}</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 dark:text-gray-400 text-center py-4">No recent activity</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Link Info */}
            <div>
                <Card
                    className="bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-950/50 dark:to-slate-950/50 border-gray-200 dark:border-gray-800">
                    <CardHeader>
                        <CardTitle className="text-gray-900 dark:text-white">Link Information</CardTitle>
                        <CardDescription className="text-gray-600 dark:text-gray-300">
                            Details about your shortened URL
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div
                            className="flex items-center gap-3 p-3 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                            <ExternalLink className="h-4 w-4 text-gray-400"/>
                            <span
                                className="text-sm font-mono text-gray-600 dark:text-gray-300">short.url/{generatedId}</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
