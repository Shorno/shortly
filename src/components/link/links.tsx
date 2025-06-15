import LinkCard from "@/components/link/link-card"
import NoLinksCard from "@/components/link/no-links-card"
import type { ShortURL } from "@/data/getPublicURLs"

interface LinksProps {
    links: ShortURL[] | null
}

export default async function Links({ links }: LinksProps) {
    if (links?.length === 0) return <NoLinksCard />

    return (
        <div className="flex flex-col gap-4 md:w-2xl">
            {links?.map((link) => (
                <LinkCard
                    key={link.id}
                    id={link.id}
                    slug={link.slug}
                    original_url={link.original_url}
                    short_url={link.short_url}
                    site_favicon={link.site_favicon}
                    site_title={link.site_title}
                    is_public={link.is_public}
                    user_id={link.user_id}
                />
            ))}
        </div>
    )
}
