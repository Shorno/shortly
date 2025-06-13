"use client"

import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Input} from "@/components/ui/input"

import {z} from "zod"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {Button} from "@/components/ui/button"
import GenerateShortURL from "@/actions/generateShortURL"
import {useTransition} from "react"
import {motion} from "motion/react"
import {LinkIcon, ArrowRight, Loader2} from "lucide-react"
import {toast} from "sonner";
import {useRouter} from "next/navigation";

const formSchema = z.object({
    url: z.string().min(1, {message: "Cannot generate empty link"}).url({message: "The input is not valid URL"}),
})

type LinkFormValues = z.infer<typeof formSchema>

export default function LinkForm() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition()

    const form = useForm<LinkFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            url: "",
        },
    })
    const onSubmit = async (values: LinkFormValues) => {
        startTransition(async () => {
            const response = await GenerateShortURL(values.url)
            if (response?.success) {
                toast.success("Link Generated", {
                    action: {
                        label: "View Links",
                        onClick: () => router.push("/links")
                    }
                })
                form.reset();
            }
        })
    }

    const containerVariants = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    }

    const itemVariants = {
        hidden: {y: 20, opacity: 0},
        visible: {
            y: 0,
            opacity: 1,
            transition: {type: "spring", stiffness: 100},
        },
    }

    return (
        <motion.div
            className="w-full max-w-3xl mx-auto px-4"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <motion.div
                className="relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 p-8 shadow-lg border border-purple-100 dark:border-purple-900"
                variants={itemVariants}
            >
                <motion.div
                    className="absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br from-purple-200/50 to-blue-200/50 dark:from-purple-700/20 dark:to-blue-700/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, 0],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                    }}
                />

                <div className="relative">
                    <motion.div className="flex items-center gap-3 mb-6" variants={itemVariants}>
                        <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
                            <LinkIcon className="h-6 w-6 text-purple-600 dark:text-purple-400"/>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Shorten Your URL</h2>
                    </motion.div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <motion.div variants={itemVariants}>
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
                                                        placeholder={"Enter the URL"}
                                                        {...field}
                                                        className="pl-4 pr-12 py-6 bg-white dark:bg-gray-900 border-purple-100 dark:border-purple-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                                    />
                                                    <div
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                                                        <ArrowRight size={18}/>
                                                    </div>
                                                </div>
                                            </FormControl>
                                            <FormDescription className="text-gray-500 dark:text-gray-400">
                                                The original URL should be valid
                                            </FormDescription>
                                            <FormMessage className="text-red-500"/>
                                        </FormItem>
                                    )}
                                />
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <Button
                                    type="submit"
                                    disabled={isPending}
                                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 px-8 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
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
                            </motion.div>
                        </form>
                    </Form>

                    <motion.div
                        className="mt-8 pt-6 border-t border-purple-100 dark:border-purple-900 flex flex-wrap gap-4 justify-between items-center"
                        variants={itemVariants}
                    >
                        <div className="flex gap-3">
                            <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                            <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                            <div className="w-2 h-2 rounded-full bg-pink-400"></div>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Create short, powerful links in
                            seconds</p>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    )
}
