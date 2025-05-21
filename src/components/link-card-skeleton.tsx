import {Card, CardContent} from "@/components/ui/card"
import {Skeleton} from "@/components/ui/skeleton"
import {Separator} from "@/components/ui/separator"

export default function LinkCardSkeleton() {
    return (
        <Card className="border-none rounded-sm min-h-31">
            <CardContent>
                <div className="flex flex-col md:flex-row gap-2 justify-between">
                    <div className="flex md:gap-4">
                        <div className="flex mt-1">
                            <Skeleton className="size-8 rounded-full hidden md:flex"/>
                        </div>
                        <div className="flex flex-col gap-1">
                            <Skeleton className="h-5 w-28 md:w-32"/>
                            <Skeleton className="h-5 w-32 md:w-40 bg-blue-200/50 mt-1"/>
                            <div className="flex flex-col">
                                <Skeleton className="h-4 w-full max-w-[16rem] md:max-w-[24rem] mt-1"/>
                            </div>
                        </div>
                    </div>

                    <Separator className="md:hidden"/>

                    <div className="flex gap-2">
                        <Skeleton className="h-9 w-20 rounded-sm"/>
                        <Skeleton className="h-9 w-9 rounded-sm"/>
                        <Skeleton className="h-9 w-9 rounded-sm"/>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
