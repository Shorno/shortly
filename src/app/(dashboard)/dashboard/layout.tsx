import DashboardNavbar from "@/components/dashboard/dashboard-navbar";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: {
        template: `%s | Free URL Shortener`,
        default: "Free URL Shortener"
    },
    description: "Created By Shorno",
};
export default function DashboardLayout({
                                            children,
                                        }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <DashboardNavbar/>
            <div className={""}>
                {children}
            </div>
        </>
    )
}