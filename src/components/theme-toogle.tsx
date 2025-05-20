"use client"

import {useTheme} from "next-themes"
import {useEffect, useState} from "react"
import {motion} from "motion/react"
import {Moon, Sun} from "lucide-react"

export function ThemeToggle() {
    const {theme, setTheme} = useTheme()
    const [mounted, setMounted] = useState(false)

    // Avoid hydration mismatch by only rendering after mount
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    const isDark = theme === "dark"

    return (
        <motion.button
            className="relative flex h-8 w-16 items-center rounded-full bg-gray-200 p-1 shadow-inner dark:bg-gray-800"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            initial={false}
            animate={{backgroundColor: isDark ? "#1f2937" : "#e5e7eb"}}
            transition={{duration: 0.3}}
        >
            <motion.div
                className="flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md dark:bg-gray-700"
                initial={false}
                animate={{
                    x: isDark ? 32 : 0,
                    backgroundColor: isDark ? "#374151" : "#ffffff",
                }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                }}
            >
                <motion.div
                    initial={false}
                    animate={{
                        rotate: isDark ? 40 : 0,
                        scale: 0.7,
                    }}
                    transition={{duration: 0.3}}
                >
                    {isDark ? <Moon size={16} className="text-yellow-300"/> :
                        <Sun size={16} className="text-yellow-500"/>}
                </motion.div>
            </motion.div>
        </motion.button>
    )
}
