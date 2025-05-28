"use client"
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {ThemeToggle} from "@/components/theme-toogle";
import {usePathname} from "next/navigation";
import AuthUser from "@/components/AuthUser";


export default function Navbar() {
    const pathname = usePathname()
    const isMyLinksActive = pathname === "/my-links";

    return (
        <nav className={"mx-auto container flex items-center justify-between py-4 px-4 lg:px-0"}>
            <div>
                <Link href={"/"} className={"text-3xl font-semibold"}>Shortly</Link>
            </div>
            <div className={"flex gap-4"}>
                <Button asChild variant={isMyLinksActive ? "default" : "ghost"} className={"rounded-full"}>
                    <Link href={"/my-links"} className={isMyLinksActive ? "font-semibold" : ""}>My Links</Link>
                </Button>
                {/*<Button asChild variant={isPublicLinksActive ? "default" : "ghost"} className={"rounded-full"}>*/}
                {/*    <Link href={"/links"} className={isPublicLinksActive ? "font-semibold" : ""}>Pubic Links</Link>*/}
                {/*</Button>*/}
            </div>
            <div className={"flex gap-4 justify-center items-center"}>
                <ThemeToggle/>
                <AuthUser/>
            </div>
        </nav>
    )
}