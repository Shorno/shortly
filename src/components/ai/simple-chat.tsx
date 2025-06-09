"use client"

import {useState, type FormEvent} from "react"
import AiResponse from "@/components/ai/ai-response"

export default function SimpleChat() {
    const [input, setInput] = useState("")
    const [response, setResponse] = useState<string>("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (!input.trim()) return

        setIsLoading(true)
        setResponse("")

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({prompt: input}),
            })

            const data = await res.json()
            setResponse(data.response)
        } catch (error) {
            console.error("Error:", error)
            setResponse("Error getting response")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="w-full max-w-2xl mx-auto space-y-4">
            <form onSubmit={handleSubmit} className="space-y-2">
        <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your prompt..."
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px] max-h-[200px] resize-y"
            rows={4}
        />
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
                    >
                        {isLoading ? "..." : "Send"}
                    </button>
                </div>
            </form>

            {(response || isLoading) && (
                <div className="bg-white p-4 rounded-lg border h-[300px] overflow-y-auto">
                    {isLoading ? (
                        <div className="flex items-center space-x-2 text-gray-500">
                            <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                            </div>
                            <span>Generating response...</span>
                        </div>
                    ) : (
                        <div className="whitespace-pre-line">
                            <AiResponse response={response}/>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
