"use client"
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useMotionValueEvent, useScroll} from "motion/react";
import {useState} from "react";

export default function Navbar() {
    const {scrollY} = useScroll()
    const [isScrolled, setIsScrolled] = useState(false);
    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50)
    })


    const pathname = usePathname()
    const isPublicLinksActive = pathname === "/links";

    return (
        <nav className={`w-full fixed z-50 ${isScrolled ? "bg-[#020013]/85 shadow-sm backdrop-blur-md" : ""} transition-all duration-200 `}>
            <div className={"mx-auto container flex items-center justify-between py-4 px-4 lg:px-0"}>
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
            </div>
        </nav>
    )
}