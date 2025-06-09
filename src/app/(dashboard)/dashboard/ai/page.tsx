import SimpleChat from "@/components/ai/simple-chat";

export default function ChatPage() {
    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6 text-center">Chat with Gemini AI</h1>
            <SimpleChat />
        </div>
    )
}
