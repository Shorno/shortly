import LinkForm from "@/components/link-form";

export default async function Home() {
    return (
        <div className={"flex justify-center pt-10 lg:pt-32 items-center flex-col"}>
            <LinkForm/>
        </div>
    );
}
