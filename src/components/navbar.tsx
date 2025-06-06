"use client"
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {usePathname} from "next/navigation";

export default function Navbar() {
    const pathname = usePathname()
    const isPublicLinksActive = pathname === "/links";

    return (
        <nav className={"mx-auto container flex items-center justify-between py-4"}>
            <div>
                <Link href={"/"} className={"text-xl lg:text-3xl font-semibold"}>Shortly</Link>
            </div>
            <div className={"flex gap-4"}>
                <Button asChild variant={isPublicLinksActive ? "default" : "ghost"}
                        className={`rounded-full ${isPublicLinksActive ? null : "underline"}`}>
                    <Link href={"/links"} className={isPublicLinksActive ? "font-semibold" : ""}>Pubic Links</Link>
                </Button>
            </div>
            <div className={"flex gap-4 justify-center items-center"}>
                <Button asChild className={""}>
                    <Link href="/login">Login</Link>
                </Button>
            </div>
        </nav>
    )
}