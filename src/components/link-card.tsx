import {Card, CardContent} from "@/components/ui/card";
import {ShortURL} from "@/actions/getURLs";
import LinkActions from "@/components/link-actions";
import LinkDisplay from "@/components/link-display";
import {Separator} from "@/components/ui/separator";


export default function LinkCard({id, originalURL, shortURL, siteTitle, siteFavicon, generatedID}: ShortURL) {
    return (
        <>
            <Card className={"border-none rounded-sm"}>
                <CardContent>
                    <div className={"flex flex-col md:flex-row gap-2 justify-between"}>
                        <LinkDisplay
                            id={id}
                            generatedID={generatedID}
                            originalURL={originalURL}
                            shortURL={shortURL}
                            siteFavicon={siteFavicon}
                            siteTitle={siteTitle}
                        />
                        <Separator className={"md:hidden"}/>
                        <LinkActions shortURL={shortURL}/>
                    </div>

                </CardContent>
            </Card>
        </>
    )
}