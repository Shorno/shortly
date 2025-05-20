import LinkForm from "@/components/link-form";
import GetURLs from "@/actions/getURLs";

import RecentLinks from "@/components/link-card";


export default async function Home() {
    const links = await GetURLs();
    return (
        <div className={"flex justify-center items-center flex-col"}>
            Welcome to Ultimate URL Shortener
            <LinkForm/>
            <RecentLinks links={links}/>
        </div>
    );
}
