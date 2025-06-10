import UserLinkForm from "@/components/link/user-link-form";

export const metadata = {
    title: `Dashboard | Free URL Shortener`,
}


export default async function Dashboard() {
    return (
        <>
            <UserLinkForm/>
        </>
    )
}