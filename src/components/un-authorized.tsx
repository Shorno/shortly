import {LogIn, Lock, ArrowRight} from "lucide-react"
import {Button} from "@/components/ui/button"
import Link from "next/link";

export default function UnauthorizedCard() {

    return (
        <div className="w-full max-w-3xl mx-auto px-4">
            <div
                className="relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 p-8 shadow-lg border border-purple-100 dark:border-purple-900">
                <div
                    className="absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br from-purple-200/50 to-blue-200/50 dark:from-purple-700/20 dark:to-blue-700/20 rounded-full blur-3xl"/>
                <div
                    className="absolute -left-10 -bottom-10 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-purple-200/30 dark:from-blue-700/10 dark:to-purple-700/10 rounded-full blur-2xl"/>

                <div className="relative text-center">
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <div className="p-4 bg-purple-100 dark:bg-purple-900/50 rounded-full">
                                <Lock className="h-12 w-12 text-purple-600 dark:text-purple-400"/>
                            </div>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">
                        Login Required
                    </h2>

                    <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
                        You need to be logged in to view and manage your short links. Please login to access your
                        dashboard and create shortened URLs.
                    </p>

                    <div className="space-y-4">
                        <Button
                            asChild
                            className="bg-purple-600 hover:bg-purple-700 text-white py-6 px-8 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg mx-auto">
                            <Link href={"/signin"}>
                                <LogIn className="h-5 w-5"/>
                                <span>Login to Your Account</span>
                                <ArrowRight className="h-5 w-5"/>
                            </Link>
                        </Button>

                        <div
                            className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <div className="w-1 h-1 rounded-full bg-purple-400"></div>
                            <span>Quick and secure authentication</span>
                            <div className="w-1 h-1 rounded-full bg-purple-400"></div>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-purple-100 dark:border-purple-900">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                            <div className="flex flex-col items-center gap-2">
                                <div
                                    className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                                    <span className="text-sm font-bold text-purple-600 dark:text-purple-400">1</span>
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-400">Create an account</p>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <div
                                    className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                                    <span className="text-sm font-bold text-purple-600 dark:text-purple-400">2</span>
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-400">Login securely</p>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <div
                                    className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                                    <span className="text-sm font-bold text-purple-600 dark:text-purple-400">3</span>
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-400">Access your links</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-4 justify-center items-center">
                        <div className="flex gap-2">
                            <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                            <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                            <div className="w-2 h-2 rounded-full bg-pink-400"></div>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Manage all your links in one place</p>
                    </div>
                </div>
            </div>
        </div>
    )
}