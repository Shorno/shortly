"use client"
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {ThemeToggle} from "@/components/theme-toogle";
import {usePathname} from "next/navigation";

export default function Navbar() {
    const pathname = usePathname()
    const isActive = pathname === "/links"

    return (
        <nav className={"mx-auto container flex items-center justify-between py-4 px-4 lg:px-0"}>
            <div>
                <Link href={"/"} className={"text-3xl font-semibold"}>Shortly</Link>
            </div>
            <Button asChild variant={isActive ? "default" : "ghost"} className={"rounded-full"}>
                <Link href={"/links"} className={isActive ? "font-semibold" : ""}>My Links</Link>
            </Button>
            <div className={"flex gap-4 justify-center items-center"}>
                <ThemeToggle/>
                <Button asChild>
                    <Link href={"/login"}>Login</Link>
                </Button>
            </div>
        </nav>
    )
}