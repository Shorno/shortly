import Navbar from "@/components/navbar";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: {
        template: `%s | Free URL Shortener`,
        default: "Free URL Shortener"
    },
    description: "Created By Shorno",
};

export default function PublicLayout({
                                         children,
                                     }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Navbar/>
            <div className={"min-h-screen"}>
                {children}
            </div>
        </>
    )
}