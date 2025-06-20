"use client"

import {
    IconCreditCard,
    IconDotsVertical,
    IconLogout,
    IconUserCircle,
} from "@tabler/icons-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import {Session} from "@/lib/auth"
import {signOut} from "@/lib/auth-client";
import {useRouter} from "next/navigation";

interface NavUserProps {
    data: Session | null
}

export function NavUser({data: session}: NavUserProps) {
    const {isMobile} = useSidebar()
    const router = useRouter()

    if (!session?.user) {
        return null
    }

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(part => part.charAt(0))
            .join('')
            .toUpperCase()
            .slice(0, 2)
    }

    const userInitials = session.user.name ? getInitials(session.user.name) : 'U'


    const handleLogout = async () => {
        await signOut();
        router.push("/")
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage
                                    src={session.user.image || ""}
                                    alt={session.user.name || "User avatar"}
                                />
                                <AvatarFallback className="rounded-lg">
                                    {userInitials}
                                </AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">
                                    {session.user.name || 'User'}
                                </span>
                                <span className="text-muted-foreground truncate text-xs">
                                    {session.user.email || ''}
                                </span>
                            </div>
                            <IconDotsVertical className="ml-auto size-4"/>
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage
                                        src={session.user.image || ""}
                                        alt={session.user.name || "User avatar"}
                                    />
                                    <AvatarFallback className="rounded-lg">
                                        {userInitials}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">
                                        {session.user.name || 'User'}
                                    </span>
                                    <span className="text-muted-foreground truncate text-xs">
                                        {session.user.email || ''}
                                    </span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <IconUserCircle/>
                                Account
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <IconCreditCard/>
                                Billing
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem onClick={handleLogout}>
                            <IconLogout/>
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}