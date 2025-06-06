"use client"
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {usePathname} from "next/navigation";
import AuthUser from "@/components/AuthUser";


export default function DashboardNavbar() {
    const pathname = usePathname()
    const isMyLinksActive = pathname === "/my-links";

    return (
        <nav className={"mx-auto container flex items-center justify-between py-4 px-4 lg:px-0"}>
            <div>
                <Link href={"/dashboard"} className={"text-3xl font-semibold"}>Shortly</Link>
            </div>
            <div className={"flex gap-4"}>
                <Button asChild variant={isMyLinksActive ? "default" : "ghost"}
                        className={`rounded-full ${isMyLinksActive ? null : "underline"}`}>
                    <Link href={"/dashboard/my-links"} className={isMyLinksActive ? "font-semibold" : ""}>My
                        Links</Link>
                </Button>
            </div>
            <div className={"flex gap-4 justify-center items-center"}>
                <AuthUser/>
            </div>
        </nav>
    )
}