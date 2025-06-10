import DashboardNavbar from "@/components/dashboard/dashboard-navbar";

export const metadata = {
    title: `Dashboard`,
}

export default function DashboardLayout({
                                            children,
                                        }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <DashboardNavbar/>
            {children}
        </div>
    )
}