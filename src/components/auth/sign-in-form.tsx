"use client"

import {useState, useTransition} from "react"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import * as z from "zod"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Eye, EyeOff, Loader2} from "lucide-react"
import Link from "next/link"
import {useRouter} from "next/navigation"
import {signIn} from "@/lib/auth-client";
import {toast} from "sonner";

const signInSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required"),
})

type SignInFormData = z.infer<typeof signInSchema>

export default function SignInForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, startTransition] = useTransition()
    const router = useRouter()

    const form = useForm<SignInFormData>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const handleSubmit = async ({email, password}: SignInFormData) => {
        startTransition(async () => {
            signIn.email({
                email,
                password,
                fetchOptions: {
                    onError: (ctx) => {
                        toast.error(ctx.error.message)
                        console.log(ctx)
                    },
                    onSuccess: (ctx) => {
                        router.push("/links")
                        console.log(ctx)
                    }
                }

            })
        })
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-semibold">Welcome back</CardTitle>
                <CardDescription>Enter your credentials to access your account</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your email" type="email" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input placeholder="Enter your password"
                                                   type={showPassword ? "text" : "password"} {...field} />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <EyeOff className="h-4 w-4"/> :
                                                    <Eye className="h-4 w-4"/>}
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <div className="flex items-center justify-between">
                            <Link href="/forgot-password" className="text-sm text-blue-500 hover:underline">
                                Forgot password?
                            </Link>
                        </div>

                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading &&
                                <p className={"flex"}><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Signing In
                                </p>
                            }
                            Sign in
                        </Button>
                    </form>
                </Form>

                <div className="mt-4 text-center text-sm">
                    {"Don't have an account? "}
                    <Link href="/signup" className="text-blue-500 hover:underline font-medium">
                        Sign up
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}
