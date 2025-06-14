import LinkForm from "@/components/link/link-form";
import {Metadata} from "next";
import HeaderText from "@/components/header-text";

export const metadata: Metadata = {
    title: {
        absolute: "Free URL Shortener"
    }
}
export default async function Home() {
    return (
        <div className={"bg-[url('/abstract.webp')] min-h-screen bg-center md:bg-cover bg-no-repeat flex justify-center py-32 items-center flex-col gap-8 "}>
            <HeaderText/>
            <LinkForm/>
        </div>
    );
}
