"use client"

import type * as React from "react"
import {IconDashboard} from "@tabler/icons-react"
import {LinkIcon} from "lucide-react"
import Link from "next/link"

import {NavMain} from "@/components/ui/sidebar/nav-main"
import {NavUser} from "@/components/ui/sidebar/nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import {useSession} from "@/lib/auth-client";
import {NavUserSkeleton} from "@/components/nav-user-skeleton";

const nav = {
    navMain: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: IconDashboard,
        },
        // {
        //   title: "Analytics",
        //   url: "/dashboard/analytics",
        //   icon: BarChartIcon,
        // },
        {
            title: "Links",
            url: "/dashboard/links",
            icon: LinkIcon,
        },
    ],
}

export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {
    const {data: session, isPending} = useSession()

    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
                            <Link href="/dashboard">
                                <LinkIcon className="!size-5"/>
                                <span className="text-base font-semibold">Shortly</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={nav.navMain}/>
            </SidebarContent>
            <SidebarFooter>
                {isPending ? <NavUserSkeleton/> : <NavUser data={session}/>}
            </SidebarFooter>
        </Sidebar>
    )
}
