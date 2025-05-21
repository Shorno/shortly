import {ShortURL} from "@/actions/getURLs";
import LinkCard from "@/components/link-card";


interface LinksProps {
    links: ShortURL[]
}

export default function Links({links}: LinksProps) {
    return (
        <div className={"flex flex-col gap-4"}>
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