import {Card, CardContent} from "@/components/ui/card";
import {ShortURL} from "@/actions/getURLs";
import LinkActions from "@/components/link-actions";
import LinkDisplay from "@/components/link-display";


export default function LinkCard({id, originalURL, shortURL, siteTitle, siteFavicon, generatedID}: ShortURL) {
    return (
        <>
            <Card className={"border-none lg:w-3xl rounded-sm"}>
                <CardContent>
                    <div className={"flex justify-between"}>
                        <LinkDisplay
                            id={id}
                            generatedID={generatedID}
                            originalURL={originalURL}
                            shortURL={shortURL}
                            siteFavicon={siteFavicon}
                            siteTitle={siteTitle}
                        />
                        <LinkActions shortURL={shortURL}/>
                    </div>

                </CardContent>
            </Card>
        </>
    )
}