import LinkCardSkeleton from "@/components/link/link-card-skeleton";

export default function LinksLoading() {
    return (
        <div className="flex flex-col gap-4 w-full px-4 md:px-0 md:max-w-2xl">
            {Array(4)
                .fill(0)
                .map((_, index) => (
                    <LinkCardSkeleton key={index}/>
                ))}
        </div>
    )
}
