import LinkCardSkeleton from "@/components/link-card-skeleton";

export default function LinksLoading() {
    return (
        <div className="flex flex-col gap-4 w-full md:max-w-2xl">
            {Array(3)
                .fill(0)
                .map((_, index) => (
                    <LinkCardSkeleton key={index}/>
                ))}
        </div>
    )
}
