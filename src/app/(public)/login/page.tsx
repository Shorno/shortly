import SignInForm from "@/components/auth/sign-in-form";

export const metadata = {
    title: "Login"
}

export default function SignInPage() {
    return (
        <div className="flex min-h-[calc(100dvh-68px)] items-center">
            <SignInForm/>
        </div>
    )
}