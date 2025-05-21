import Link from "next/link"
import {ExternalLink} from "lucide-react"
import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Separator} from "@/components/ui/separator"

interface LinkItem {
    id: number
    originalURL: string
    shortURL: string
}

interface RecentLinksProps {
    links: LinkItem[]
}

export default function RecentLinks({links = []}: RecentLinksProps) {
    return (
        <Card className="max-w-4xl shadow-sm">
            <CardHeader className="pb-3">
                <CardTitle className="text-xl font-semibold">Recent Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {links.length === 0 ? (
                    <p className="text-muted-foreground text-center py-6">No links created yet</p>
                ) : (
                    links.map((link, index) => (
                        <div key={link.id} className="space-y-3">
                            <div className="space-y-2">
                                <div className="flex items-start gap-2">
                                    <Badge variant="outline"
                                           className="px-2 py-0 text-xs font-normal text-muted-foreground">
                                        Original
                                    </Badge>
                                    <div className="flex-1 break-all">
                                        <Link
                                            href={link.originalURL}
                                            target="_blank"
                                            className="text-sm hover:underline text-primary inline-flex items-center gap-1 group"
                                        >
                                            {link.originalURL}
                                            <ExternalLink
                                                className="h-3 w-3 opacity-70 group-hover:opacity-100 transition-opacity"/>
                                        </Link>
                                    </div>
                                </div>

                                <div className="flex items-start gap-2">
                                    <Badge variant="secondary" className="px-2 py-0 text-xs font-normal">
                                        Short
                                    </Badge>
                                    <div className="flex-1">
                                        <Link
                                            href={link.shortURL}
                                            target="_blank"
                                            className="text-sm font-medium hover:underline text-primary inline-flex items-center gap-1 group"
                                        >
                                            {link.shortURL}
                                            <ExternalLink
                                                className="h-3 w-3 opacity-70 group-hover:opacity-100 transition-opacity"/>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {index < links.length - 1 && <Separator className="my-2"/>}
                        </div>
                    ))
                )}
            </CardContent>
        </Card>
    )
}
