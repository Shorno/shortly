import DashboardNavbar from "@/components/dashboard-navbar";

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