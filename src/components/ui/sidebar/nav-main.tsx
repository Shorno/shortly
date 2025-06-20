"use client"

import {MailIcon, PlusCircleIcon} from "lucide-react"
import Link from "next/link"
import {usePathname} from "next/navigation"
import type {ComponentType} from "react"

import {Button} from "@/components/ui/button"
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem, useSidebar,
} from "@/components/ui/sidebar"
import {cn} from "@/lib/utils"

// Generic icon type that works with both Lucide and Tabler icons
type IconComponent = ComponentType<{ className?: string; size?: number | string }>

export function NavMain({
                            items,
                        }: {
    items: {
        title: string
        url: string
        icon?: IconComponent
    }[]
}) {

    const {setOpenMobile} = useSidebar();

    const pathname = usePathname()

    return (
        <SidebarGroup>
            <SidebarGroupContent className="flex flex-col gap-2">
                <SidebarMenu>
                    <SidebarMenuItem className="flex items-center gap-2">
                        <SidebarMenuButton
                            tooltip="Quick Create"
                            className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
                        >
                            <PlusCircleIcon/>
                            <span>Quick Create</span>
                        </SidebarMenuButton>
                        <Button size="icon" className="h-9 w-9 shrink-0 group-data-[collapsible=icon]:opacity-0"
                                variant="outline">
                            <MailIcon/>
                            <span className="sr-only">Inbox</span>
                        </Button>
                    </SidebarMenuItem>
                </SidebarMenu>
                <SidebarMenu>
                    {items.map((item) => {
                        // Check for exact match or if current path starts with the item URL
                        const isActive = pathname === item.url || (item.url !== "/dashboard" && pathname.startsWith(item.url))

                        return (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton
                                    onClick={() => setOpenMobile(false)}
                                    tooltip={item.title}
                                    asChild
                                    isActive={isActive}
                                    className={cn(
                                        "transition-colors",
                                        isActive && "bg-sidebar-accent text-sidebar-accent-foreground font-medium",
                                    )}
                                >
                                    <Link href={item.url}>
                                        {item.icon && <item.icon className="size-4"/>}
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )
                    })}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}
