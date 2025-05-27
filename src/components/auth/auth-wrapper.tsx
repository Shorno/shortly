"use client"

import { useState } from "react"
import SignInForm from "@/components/auth/sign-in-form";
import SignUpForm from "@/components/auth/sign-up-form";


type AuthMode = "signin" | "signup"

interface AuthWrapperProps {
    defaultMode?: AuthMode
    onSignUp?: (data: { name: string; email: string; password: string }) => Promise<void>
    onSignIn?: (data: { email: string; password: string }) => Promise<void>
}

export default function AuthWrapper({ defaultMode = "signin", onSignUp, onSignIn }: AuthWrapperProps) {
    const [mode, setMode] = useState<AuthMode>(defaultMode)

    const toggleMode = () => {
        setMode(mode === "signin" ? "signup" : "signin")
    }

    const handleSignUp = async (data: { name: string; email: string; password: string }) => {
        if (onSignUp) {
            await onSignUp(data)
        } else {
            // Default behavior - you can replace this with your actual sign up logic
            console.log("Sign up data:", data)
            alert("Sign up functionality not implemented yet")
        }
    }

    const handleSignIn = async (data: { email: string; password: string }) => {
        if (onSignIn) {
            await onSignIn(data)
        } else {
            // Default behavior - you can replace this with your actual sign in logic
            console.log("Sign in data:", data)
            alert("Sign in functionality not implemented yet")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md">
                {mode === "signin" ? (
                    <SignInForm onSubmit={handleSignIn} onToggleMode={toggleMode} />
                ) : (
                    <SignUpForm onSubmit={handleSignUp} onToggleMode={toggleMode} />
                )}
            </div>
        </div>
    )
}
