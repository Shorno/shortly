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
import {useTransition} from "react";

const formSchema = z.object({
    url: z.string().min(1, {message: "Cannot generate empty link"}).url({message: "The input is not valid URL"})
})



type LinkFormValues = z.infer<typeof formSchema>

export default function LinkForm() {

    const [isPending, startTransition] = useTransition()

    const form = useForm<LinkFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            url: ""
        }
    })
    const onSubmit = async (values: LinkFormValues) => {
        startTransition(async () => {
            const response = await GenerateShortURL(values.url);
            console.log(response)
        })
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className={"py-10 space-y-8 max-w-96"}>
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
        </>
    )
}