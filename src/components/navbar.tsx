import {Button} from "@/components/ui/button";
import Link from "next/link";
import {ThemeToggle} from "@/components/theme-toogle";

export default function Navbar() {
    return (
        <nav className={"mx-auto container flex items-center justify-between py-4 px-4 lg:px-0"}>
            <div>
                <Link href={"/"} className={"text-3xl font-semibold"}>Shortly</Link>
            </div>
            <div className={"flex gap-4 justify-center items-center"}>
                <ThemeToggle/>
                <Button asChild>
                    <Link href={"/login"}>Login</Link>
                </Button>
            </div>
        </nav>
    )
}