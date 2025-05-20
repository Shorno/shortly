"use client"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"

import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button";
import GenerateShortURL from "@/actions/generateShortURL";
import {useState, useTransition} from "react";
import {Card, CardContent} from "@/components/ui/card";

const formSchema = z.object({
    url: z.string().min(1, {message: "Cannot generate empty link"}).url({message: "The input is not valid URL"})
})

interface IResponse {
    originalURL: string
    shortURL: string
}

type LinkFormValues = z.infer<typeof formSchema>

export default function LinkForm() {

    const [isPending, startTransition] = useTransition()
    const [data, setData] = useState<IResponse | null>(null)

    const form = useForm<LinkFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            url: ""
        }
    })
    const onSubmit = async (values: LinkFormValues) => {
        startTransition(async () => {
            const response = await GenerateShortURL(values.url);
            if (response.success) {
                setData(response.data)
            }
        })
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className={"py-10 space-y-8 w-96"}>
                    <FormField
                        control={form.control}
                        name={"url"}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Original URL</FormLabel>
                                <FormControl>
                                    <Input placeholder={"Enter the URL"} {...field}/>
                                </FormControl>
                                <FormDescription>
                                    The original URL should be valid
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={isPending}>Submit</Button>
                </form>
            </Form>

            <Card className={"w-96"}>
                <CardContent className={"flex flex-col gap-4"}>
                    {
                        data ? (
                            <div>
                                <p>Original URL : {data?.originalURL}</p>
                                <p>Short URL : <span className={"text-blue-500 cursor-pointer"}>{data?.shortURL}</span>
                                </p>
                            </div>
                        ) : <p>No short link generated yet</p>
                    }
                </CardContent>
            </Card>
        </>
    )
}