import {Card, CardContent} from "@/components/ui/card"
import type {ShortURL} from "@/data/getPublicURLs"
import LinkDisplay from "@/components/link/user/link-display";

export default function LinkCard({
                                     id,
                                     original_url,
                                     short_url,
                                     site_title,
                                     site_favicon,
                                     slug,
                                     user_id
                                 }: ShortURL) {
    return (
        <Card
            className="border border-gray-200 dark:border-gray-800 rounded-md mx-4 md:mx-0 hover:shadow-sm transition-shadow duration-200">
            <CardContent className="px-4 py-1 md:py-2">
                <LinkDisplay
                    key={id}
                    id={id}
                    slug={slug}
                    original_url={original_url}
                    short_url={short_url}
                    site_favicon={site_favicon}
                    site_title={site_title}
                    user_id={user_id}
                />
            </CardContent>
        </Card>
    )
}
