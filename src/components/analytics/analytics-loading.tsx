import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function AnalyticsLoading() {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, index) => (
                    <div key={index}>
                        <Card className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 border-purple-100 dark:border-purple-900">
                            <div className="absolute -right-4 -top-4 w-20 h-20 bg-gradient-to-br from-purple-200/50 to-blue-200/50 dark:from-purple-700/20 dark:to-blue-700/20 rounded-full blur-xl" />
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
                                <Skeleton className="h-4 w-20 bg-gray-200 dark:bg-gray-700" />
                                <Skeleton className="h-4 w-4 rounded bg-gray-200 dark:bg-gray-700" />
                            </CardHeader>
                            <CardContent className="relative">
                                <Skeleton className="h-8 w-16 bg-gray-200 dark:bg-gray-700 mb-2" />
                                <Skeleton className="h-3 w-24 bg-gray-200 dark:bg-gray-700" />
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                    <Card className="bg-gradient-to-br from-purple-50/50 to-blue-50/50 dark:from-purple-950/20 dark:to-blue-950/20 border-purple-100 dark:border-purple-900">
                        <CardHeader>
                            <Skeleton className="h-6 w-24 bg-gray-200 dark:bg-gray-700 mb-2" />
                            <Skeleton className="h-4 w-40 bg-gray-200 dark:bg-gray-700" />
                        </CardHeader>
                        <CardContent>
                            <div className="h-[200px] flex items-end justify-between gap-2 px-4">
                                {[...Array(7)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="bg-gray-200 dark:bg-gray-700 rounded-t"
                                        style={{ height: `${Math.random() * 80 + 40}px`, width: "20px" }}
                                    />
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <Card className="bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-100 dark:border-blue-900">
                        <CardHeader>
                            <Skeleton className="h-6 w-32 bg-gray-200 dark:bg-gray-700 mb-2" />
                            <Skeleton className="h-4 w-48 bg-gray-200 dark:bg-gray-700" />
                        </CardHeader>
                        <CardContent>
                            <div className="h-[200px] flex items-center">
                                <svg width="100%" height="100%" className="overflow-visible">
                                    <path
                                        d="M 20 150 Q 80 120 140 100 T 260 80 T 380 90 T 500 70"
                                        stroke="rgb(156 163 175)"
                                        strokeWidth="2"
                                        fill="none"
                                        strokeDasharray="5,5"
                                    />
                                    {[20, 80, 140, 200, 260, 320, 380, 440, 500].map((x, i) => (
                                        <circle key={i} cx={x} cy={150 - Math.random() * 80} r="3" fill="rgb(156 163 175)" />
                                    ))}
                                </svg>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div>
                <Card className="bg-gradient-to-br from-green-50/50 to-emerald-50/50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-100 dark:border-green-900">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-5 w-5 rounded bg-gray-200 dark:bg-gray-700" />
                            <Skeleton className="h-6 w-32 bg-gray-200 dark:bg-gray-700" />
                        </div>
                        <Skeleton className="h-4 w-48 bg-gray-200 dark:bg-gray-700" />
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {[...Array(3)].map((_, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3 p-3 bg-white dark:bg-gray-900 rounded-lg border border-green-100 dark:border-green-800"
                                >
                                    <Skeleton className="w-2 h-2 rounded-full bg-gray-200 dark:bg-gray-700" />
                                    <Skeleton className="h-4 w-4 rounded bg-gray-200 dark:bg-gray-700" />
                                    <Skeleton className="h-4 w-full max-w-64 bg-gray-200 dark:bg-gray-700" />
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div>
                <Card className="bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-950/50 dark:to-slate-950/50 border-gray-200 dark:border-gray-800">
                    <CardHeader>
                        <Skeleton className="h-6 w-32 bg-gray-200 dark:bg-gray-700 mb-2" />
                        <Skeleton className="h-4 w-48 bg-gray-200 dark:bg-gray-700" />
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                            <Skeleton className="h-4 w-4 rounded bg-gray-200 dark:bg-gray-700" />
                            <Skeleton className="h-4 w-40 bg-gray-200 dark:bg-gray-700" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
