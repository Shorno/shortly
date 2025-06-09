"use client"

import {motion} from "motion/react"
import {LinkIcon, Plus, ArrowRight} from "lucide-react"
import {Button} from "@/components/ui/button"
import {useRouter} from "next/navigation";

export default function NoLinksCard() {
    const router = useRouter()
    const containerVariants = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    }

    const itemVariants = {
        hidden: {y: 20, opacity: 0},
        visible: {
            y: 0,
            opacity: 1,
            transition: {type: "spring", stiffness: 100},
        },
    }

    return (
        <motion.div
            className="w-full max-w-3xl mx-auto px-4"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <motion.div
                className="relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 p-8 shadow-lg border border-purple-100 dark:border-purple-900"
                variants={itemVariants}
            >
                <motion.div
                    className="absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br from-purple-200/50 to-blue-200/50 dark:from-purple-700/20 dark:to-blue-700/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, 0],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                    }}
                />

                <motion.div
                    className="absolute -left-10 -bottom-10 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-purple-200/30 dark:from-blue-700/10 dark:to-purple-700/10 rounded-full blur-2xl"
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, -5, 0],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                        delay: 1,
                    }}
                />

                <div className="relative text-center">
                    <motion.div className="flex justify-center mb-6" variants={itemVariants}>
                        <div className="relative">
                            <div className="p-4 bg-purple-100 dark:bg-purple-900/50 rounded-full">
                                <LinkIcon className="h-12 w-12 text-purple-600 dark:text-purple-400"/>
                            </div>
                            <motion.div
                                className="absolute -top-1 -right-1 w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center"
                                initial={{scale: 0}}
                                animate={{scale: 1}}
                                transition={{delay: 0.5, type: "spring", stiffness: 200}}
                            >
                                <span className="text-xs font-bold text-gray-600 dark:text-gray-300">0</span>
                            </motion.div>
                        </div>
                    </motion.div>

                    <motion.h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3"
                               variants={itemVariants}>
                        No Short Links Yet
                    </motion.h2>

                    <motion.p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto"
                              variants={itemVariants}>
                        You haven&#39;t created any short links yet. Start by creating your first shortened URL to make
                        long links more
                        manageable and trackable.
                    </motion.p>

                    <motion.div className="space-y-4" variants={itemVariants}>
                        <Button
                            onClick={() => router.push("/")}
                            className="bg-purple-600 hover:bg-purple-700 text-white py-6 px-8 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg mx-auto">
                            <Plus className="h-5 w-5"/>
                            <span>Create Your First Link</span>
                            <ArrowRight className="h-5 w-5"/>
                        </Button>

                        <motion.div
                            className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400"
                            variants={itemVariants}
                        >
                            <div className="w-1 h-1 rounded-full bg-purple-400"></div>
                            <span>Quick and easy to get started</span>
                            <div className="w-1 h-1 rounded-full bg-purple-400"></div>
                        </motion.div>
                    </motion.div>

                    <motion.div className="mt-8 pt-6 border-t border-purple-100 dark:border-purple-900"
                                variants={itemVariants}>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                            <div className="flex flex-col items-center gap-2">
                                <div
                                    className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                                    <span className="text-sm font-bold text-purple-600 dark:text-purple-400">1</span>
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-400">Paste your long URL</p>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <div
                                    className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                                    <span className="text-sm font-bold text-purple-600 dark:text-purple-400">2</span>
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-400">Generate short link</p>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <div
                                    className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                                    <span className="text-sm font-bold text-purple-600 dark:text-purple-400">3</span>
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-400">Share anywhere</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div className="mt-6 flex flex-wrap gap-4 justify-center items-center"
                                variants={itemVariants}>
                        <div className="flex gap-2">
                            <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                            <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                            <div className="w-2 h-2 rounded-full bg-pink-400"></div>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Start creating powerful short links</p>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    )
}
