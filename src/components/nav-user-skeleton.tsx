import { Skeleton } from "@/components/ui/skeleton"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"

export function NavUserSkeleton() {
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton size="lg" className="pointer-events-none">
                    {/* Avatar skeleton */}
                    <Skeleton className="h-8 w-8 rounded-lg" />

                    {/* Text content skeleton */}
                    <div className="grid flex-1 text-left text-sm leading-tight gap-1">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-32" />
                    </div>

                    {/* Icon skeleton */}
                    <Skeleton className="ml-auto h-4 w-4" />
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
