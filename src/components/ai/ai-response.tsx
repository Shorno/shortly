export default function AiResponse({ response }: { response: string | undefined }) {
    return <div className="whitespace-pre-line text-black">{response ? response : "No response available"}</div>
}
