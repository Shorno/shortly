import GetURLs from "@/actions/getURLs";
import LinkCard from "@/components/link-card";
import NoLinksCard from "@/components/no-links-card";

export default async function Links() {
    const links = await GetURLs();

    if (links.length === 0) return <NoLinksCard/>;

    return (
        <div className={"flex flex-col gap-4 md:max-w-2xl"}>
            {
                links.map((link) => (
                    <LinkCard
                        key={link.id}
                        id={link.id}
                        generated_id={link.generated_id}
                        original_url={link.original_url}
                        short_url={link.short_url}
                        site_favicon={link.site_favicon}
                        site_title={link.site_title}
                    />
                ))
            }
        </div>
    )
}