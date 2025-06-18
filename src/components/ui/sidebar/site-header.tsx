"use client"

import {ChevronRightIcon, HomeIcon} from "lucide-react"
import Link from "next/link"
import {usePathname} from "next/navigation"
import {Fragment} from "react"

import {Separator} from "@/components/ui/separator"
import {SidebarTrigger} from "@/components/ui/sidebar"

// Define route mappings for better breadcrumb labels
const routeLabels: Record<string, string> = {
    dashboard: "Dashboard",
    links: "Links",

}

// Define which routes should be clickable in breadcrumbs
const clickableRoutes = new Set([
    "/dashboard",
    "/dashboard/links",
])

export function SiteHeader() {
    const pathname = usePathname()

    // Generate breadcrumb items from pathname
    const generateBreadcrumbs = () => {
        const segments = pathname.split("/").filter(Boolean)
        const breadcrumbs = []

        // Handle dashboard root path
        if (pathname === "/dashboard") {
            breadcrumbs.push({
                label: "Dashboard",
                href: "/dashboard",
                isClickable: false,
                isHome: true,
            })
            return breadcrumbs
        }

        // For dashboard sub-routes, start with Dashboard as home
        if (pathname.startsWith("/dashboard")) {
            breadcrumbs.push({
                label: "Dashboard",
                href: "/dashboard",
                isClickable: true,
                isHome: true,
            })

            // Build breadcrumbs from URL segments (skip the first 'dashboard' segment)
            let currentPath = ""
            for (let i = 0; i < segments.length; i++) {
                const segment = segments[i]
                currentPath += `/${segment}`

                // Skip the first 'dashboard' segment since we already added it
                if (segment === "dashboard" && i === 0) continue

                const label = routeLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)
                const isLast = i === segments.length - 1
                const isClickable = clickableRoutes.has(currentPath) && !isLast

                breadcrumbs.push({
                    label,
                    href: currentPath,
                    isClickable,
                    isHome: false,
                })
            }
        }

        return breadcrumbs
    }

    const breadcrumbs = generateBreadcrumbs()

    return (
        <header
            className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
            <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
                <SidebarTrigger className="-ml-1"/>
                <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4"/>

                {/* Breadcrumb Navigation */}
                <nav className="flex items-center space-x-1 text-sm text-muted-foreground">
                    {breadcrumbs.map((crumb, index) => (
                        <Fragment key={crumb.href}>
                            {index > 0 && <ChevronRightIcon className="h-4 w-4 shrink-0"/>}

                            <div className="flex items-center gap-1">
                                {crumb.isHome && <HomeIcon className="h-4 w-4 shrink-0"/>}

                                {crumb.isClickable ? (
                                    <Link
                                        href={crumb.href}
                                        className="font-medium text-foreground hover:text-foreground/80 transition-colors"
                                    >
                                        {crumb.label}
                                    </Link>
                                ) : (
                                    <span
                                        className={index === breadcrumbs.length - 1 ? "font-medium text-foreground" : ""}>
                    {crumb.label}
                  </span>
                                )}
                            </div>
                        </Fragment>
                    ))}
                </nav>
            </div>
        </header>
    )
}
