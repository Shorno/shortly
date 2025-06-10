import SignUpForm from "@/components/auth/sign-up-form"

export const metadata = {
    title: "Sign Up"
}
export default async function SignUpPage() {

    return (
        <div className="flex min-h-[calc(100dvh-68px)] items-center">
            <SignUpForm/>
        </div>
    )
}
