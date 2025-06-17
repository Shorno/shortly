"use client"

import {useTransition} from "react"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import * as z from "zod"
import {Loader2} from "lucide-react"
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import updateSlug from "@/actions/url-actions/updateSlug";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

const formSchema = z.object({
    slug: z
        .string()
        .min(1, "Slug is required")
        .max(50, "Slug must be less than 50 characters")
        .regex(/^[a-zA-Z0-9_-]+$/, "Slug can only contain letters, numbers, hyphens, and underscores"),
})

interface ModalProps {
    isOpen: boolean
    onCloseAction: () => void
    short_url: string
    id: number
}


export default function EditSlugModal({isOpen, onCloseAction, short_url, id}: ModalProps) {
    const [isSubmitting, startTransition] = useTransition();

    const router = useRouter()

    const currentSlug = short_url.split("/").pop() || ""
    const baseUrl = "https://free-url-shortener-five.vercel.app/s/"

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            slug: currentSlug,
        },
    })

    const watchedSlug = form.watch("slug")


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        startTransition(async () => {
            const response = await updateSlug(id, values.slug)
            console.log(response)
            if (response.success) {
                toast.success(response.message)
                router.refresh()
                onCloseAction()
            } else {
                toast.error(response?.message || "Failed to update slug")
            }
        })
    }


    return (
        <Dialog open={isOpen} onOpenChange={onCloseAction}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Edit Link Slug</DialogTitle>
                    <DialogDescription>Customize the slug for your shortened URL</DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <FormLabel>URL Preview</FormLabel>
                            <div className="flex items-center rounded-md border bg-muted/50 px-3 py-2 text-sm">
                                <span className="text-muted-foreground">{baseUrl}</span>
                                <span className="font-medium">{watchedSlug || currentSlug}</span>
                            </div>
                        </div>

                        <FormField
                            control={form.control}
                            name="slug"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Custom Slug</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input placeholder="Enter custom slug" {...field} className="pr-10"/>
                                        </div>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end space-x-2 pt-4">
                            <Button type="button" variant="outline" onClick={onCloseAction} disabled={isSubmitting}>
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={
                                    isSubmitting
                                }
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                        Saving...
                                    </>
                                ) : (
                                    "Save Changes"
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
