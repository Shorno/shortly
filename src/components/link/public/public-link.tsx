import NoLinksCard from "@/components/link/no-links-card"
import type {ShortURL} from "@/data/getPublicURLs"
import PublicLinkCard from "@/components/link/public/public-link-card";

interface LinksProps {
    links: ShortURL[] | null
}

export default async function PublicLink({links}: LinksProps) {
    if (links?.length === 0) return <NoLinksCard/>

    return (
        <div className="flex flex-col gap-4 md:w-2xl">
            {links?.map((link) => (
                <PublicLinkCard
                    key={link.id}
                    id={link.id}
                    slug={link.slug}
                    original_url={link.original_url}
                    short_url={link.short_url}
                    site_favicon={link.site_favicon}
                    site_title={link.site_title}
                />
            ))}
        </div>
    )
}
