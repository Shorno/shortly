import LinkForm from "@/components/link/link-form";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: {
        absolute: "Free URL Shortener"
    }
}
export default async function Home() {
    return (
        <div className={"flex justify-center pt-24 lg:pt-32 items-center flex-col"}>
            <LinkForm/>
        </div>
    );
}
