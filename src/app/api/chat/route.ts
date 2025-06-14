import { GoogleGenAI } from "@google/genai"

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

export async function POST(req: Request) {

    console.log(req)
    try {
        const { prompt } = await req.json()

        const response = await ai.models.generateContent({
            model: "models/gemini-2.5-flash-preview-05-20",
            contents: prompt,
        })

        return Response.json({ response: response.text })
    } catch (error) {
        console.error("Error:", error)
        return Response.json({ error: "Failed to get response" }, { status: 500 })
    }
}
