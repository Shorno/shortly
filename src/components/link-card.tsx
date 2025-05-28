import {Card, CardContent} from "@/components/ui/card";
import LinkActions from "@/components/link-actions";
import LinkDisplay from "@/components/link-display";
import {Separator} from "@/components/ui/separator";
import {ShortURL} from "@/actions/getPublicURLs";


export default function LinkCard({
                                     id,
                                     original_url,
                                     short_url,
                                     site_title,
                                     site_favicon,
                                     generated_id,
                                     is_public,
                                     user_id
                                 }: ShortURL) {
    return (
        <>
            <Card className={"border-none rounded-sm"}>
                <CardContent>
                    <div className={"flex flex-col md:flex-row gap-2 justify-between"}>
                        <LinkDisplay
                            id={id}
                            generated_id={generated_id}
                            original_url={original_url}
                            short_url={short_url}
                            site_favicon={site_favicon}
                            site_title={site_title}
                            user_id={user_id}
                            is_public={is_public}
                        />
                        <Separator className={"md:hidden"}/>
                        <LinkActions shortURL={short_url}/>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}