import type {Metadata} from "next";
import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/ui/sidebar/app-sidebar";
import {SiteHeader} from "@/components/ui/sidebar/site-header";

export const metadata: Metadata = {
    title: {
        template: `%s | Free URL Shortener`,
        default: "Free URL Shortener"
    },
    description: "Created By Shorno",
};
export default function DashboardLayout({
                                            children,
                                        }: {
    children: React.ReactNode
}) {
    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
        >
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col">{children}</div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
