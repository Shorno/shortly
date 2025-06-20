"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { useTransition } from "react"
import { LinkIcon, Loader2, ExternalLinkIcon } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import GeneratePrivateURL from "@/actions/generatePrivateURL"

const formSchema = z.object({
    url: z.string().min(1, { message: "Cannot generate empty link" }).url({ message: "The input is not valid URL" }),
})

type LinkFormValues = z.infer<typeof formSchema>

export default function UserLinkForm() {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    const form = useForm<LinkFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            url: "",
        },
    })

    const onSubmit = async (values: LinkFormValues) => {
        startTransition(async () => {
            const response = await GeneratePrivateURL(values.url)
            if (response?.success) {
                toast.success("Link Generated", {
                    action: {
                        label: "View My Links",
                        onClick: () => router.push("/dashboard/links"),
                    },
                })
                form.reset()
            }
        })
    }

    return (
        <div className="w-full max-w-4xl px-4 2xl:px-0 mx-auto">
            <Card>
                <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-xl">
                        <LinkIcon className="h-5 w-5 text-primary" />
                        Generate Short Link
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="url"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-base">URL</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    placeholder="https://example.com/your-long-url"
                                                    {...field}
                                                    className="pr-10 h-12 text-base"
                                                />
                                                <ExternalLinkIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" disabled={isPending} className="w-full h-12 text-base">
                                {isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Generating...
                                    </>
                                ) : (
                                    <>
                                        <LinkIcon className="mr-2 h-5 w-5" />
                                        Generate Short Link
                                    </>
                                )}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
