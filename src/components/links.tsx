import GetURLs from "@/actions/getURLs";
import LinkCard from "@/components/link-card";

export default async function Links() {
    const links = await GetURLs();
    return (
        <div className={"flex flex-col gap-4 md:max-w-2xl"}>
            {
                links.map((link) => (
                    <LinkCard
                        key={link.id}
                        id={link.id}
                        generatedID={link.generatedID}
                        originalURL={link.originalURL}
                        shortURL={link.shortURL}
                        siteFavicon={link.siteFavicon}
                        siteTitle={link.siteTitle}
                    />
                ))
            }
        </div>
    )
}