"use client"

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import CongratulationsModal from "@/components/congratulations-modal"

import {z} from "zod"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import GenerateShortURL from "@/actions/generateShortURL"
import {useTransition, useState} from "react"
import {LinkIcon, ArrowRight, Loader2, Globe, Zap, Shield} from "lucide-react"
import {toast} from "sonner"
import {useRouter} from "next/navigation"

const formSchema = z.object({
    url: z.string().min(1, {message: "Cannot generate empty link"}).url({message: "The input is not valid URL"}),
})

type LinkFormValues = z.infer<typeof formSchema>

interface ShortUrlData {
    original_url: string
    short_url: string
    generated_id: string
    site_title: string
    site_favicon: string
}

export default function LinkForm() {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [showCongratulationsModal, setShowCongratulationsModal] = useState(false)
    const [shortUrlData, setShortUrlData] = useState<ShortUrlData | null>(null)

    const form = useForm<LinkFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            url: "",
        },
    })

    const onSubmit = async (values: LinkFormValues) => {
        startTransition(async () => {
            const response = await GenerateShortURL(values.url)
            console.log(response)
            if (response?.success) {
                if (response.isFirstTime && response.shortURL) {
                    setShortUrlData(response.shortURL)
                    setShowCongratulationsModal(true)
                } else {
                    toast.success("Link Generated", {
                        action: {
                            label: "View Links",
                            onClick: () => router.push("/links"),
                        },
                    })
                }
                form.reset()
            }
        })
    }

    return (
        <>
            <div className="w-full max-w-3xl mx-auto px-4">
                <div
                    className="relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 p-8 shadow-lg border border-purple-100 dark:border-[#5b70cb]">
                    <div
                        className="absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br from-purple-200/50 to-blue-200/50 dark:from-purple-700/20 dark:to-blue-700/20 rounded-full blur-3xl"/>

                    <div className="relative">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
                                <LinkIcon className="h-6 w-6 text-purple-600 dark:text-purple-400"/>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Shorten Your URL</h2>
                        </div>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <div>
                                    <FormField
                                        control={form.control}
                                        name={"url"}
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-700 dark:text-gray-200">Original
                                                    URL</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Input
                                                            placeholder={"https://example.com/your-very-long-url-here"}
                                                            {...field}
                                                            className="pl-11 pr-12 py-6 bg-white dark:bg-gray-900 border-purple-100 dark:border-indigo-800 focus:border-transparent transition-all duration-200"
                                                        />
                                                        <div
                                                            className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                            <Globe className="h-4 w-4 text-slate-500"/>
                                                        </div>
                                                    </div>
                                                </FormControl>
                                                <FormMessage className="text-[#ff6060]/80"/>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div>
                                    <Button
                                        type="submit"
                                        disabled={isPending}
                                        className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-6 px-8 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                                    >
                                        {isPending ? (
                                            <>
                                                <Loader2 className="h-5 w-5 animate-spin"/>
                                                <span>Generating...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Generate Short URL</span>
                                                <ArrowRight className="h-5 w-5"/>
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </Form>

                        <div
                            className="mt-8 pt-6 border-t border-purple-100 dark:border-purple-900 flex flex-wrap gap-4 justify-between items-center">
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div className="group space-y-2">
                                    <div className="relative mx-auto w-fit">
                                        <div
                                            className="absolute -inset-0.5 bg-gradient-to-r from-green-400/50 to-emerald-400/50 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        <div
                                            className="relative w-8 h-8 bg-green-100 border border-green-200/50 rounded-lg flex items-center justify-center">
                                            <Zap className="w-4 h-4 text-green-600"/>
                                        </div>
                                    </div>
                                    <p className="text-xs text-slate-400">Instant</p>
                                </div>
                                <div className="group space-y-2">
                                    <div className="relative mx-auto w-fit">
                                        <div
                                            className="absolute -inset-0.5 bg-gradient-to-r from-blue-400/50 to-cyan-400/50 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        <div
                                            className="relative w-8 h-8 bg-blue-100 border border-blue-200/50 rounded-lg flex items-center justify-center">
                                            <Shield className="w-4 h-4 text-blue-600"/>
                                        </div>
                                    </div>
                                    <p className="text-xs text-slate-400">Secure</p>
                                </div>
                                <div className="group space-y-2">
                                    <div className="relative mx-auto w-fit">
                                        <div
                                            className="absolute -inset-0.5 bg-gradient-to-r from-purple-400/50 to-pink-400/50 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        <div
                                            className="relative w-8 h-8 bg-purple-100 border border-purple-200/50 rounded-lg flex items-center justify-center">
                                            <Globe className="w-4 h-4 text-purple-600"/>
                                        </div>
                                    </div>
                                    <p className="text-xs text-slate-400">Trackable</p>
                                </div>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-slate-400">Create short, powerful links in
                                seconds</p>
                        </div>
                    </div>
                </div>
            </div>

            <CongratulationsModal
                isOpen={showCongratulationsModal}
                onClose={() => setShowCongratulationsModal(false)}
                shortUrlData={shortUrlData}
            />
        </>
    )
}
