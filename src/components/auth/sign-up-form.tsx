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
import {signUp} from "@/lib/auth-client";
import {toast} from "sonner";

const signUpSchema = z.object({
    name: z.string().nonempty("Name is required").min(2, "Name must be at least 2 characters"),
    email: z.string().nonempty("Email is required").email("Please enter a valid email address"),
    password: z.string().nonempty("Password cannot be empty").min(8, "Password must be at least 8 characters")
})

type SignUpFormData = z.infer<typeof signUpSchema>

export default function SignUpForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, startTransition] = useTransition();

    const form = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    const handleSubmit = async ({name, email, password}: SignUpFormData) => {
        startTransition(async () => {
            await signUp.email({
                name,
                email,
                password,
                fetchOptions: {
                    onError: (ctx) => {
                        toast.error(ctx.error.message)
                    },
                    onSuccess: () => {
                        toast.success("Account has been created successfully!")
                    }
                }
            })
        })
    }

    return (
        <Card className="w-full max-w-11/12 md:max-w-md mx-auto">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-semibold">Create an account</CardTitle>
                <CardDescription>Enter your details below to create your account</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your name" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

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

                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                            Create account
                        </Button>
                    </form>
                </Form>

                <div className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-500 hover:underline font-medium">
                        Sign in
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}
