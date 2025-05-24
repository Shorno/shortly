"use client"
import {useTheme} from "next-themes"
import {Moon, Sun} from "lucide-react"

export function ThemeToggle() {
    const {setTheme} = useTheme()

    return (
        <button
            className="relative flex h-8 w-16 items-center rounded-full bg-gray-200 p-1 shadow-inner dark:bg-gray-800 transition-all"
            onClick={() => setTheme(theme => theme === "dark" ? "light" : "dark")}
        >
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md dark:bg-gray-700 transition-transform dark:translate-x-8">
                <Sun className="h-4 w-4 text-yellow-500 scale-100 dark:scale-0 transition-transform" />
                <Moon className="absolute h-4 w-4 text-yellow-300 scale-0 dark:scale-100 transition-transform" />
            </div>
        </button>
    )
}