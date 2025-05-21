"use client"
import {useState} from "react";

export default function useCopyToClipboard(): [boolean, (text: string) => Promise<boolean>] {
    const [copied, setCopied] = useState(false);

    const copy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
            return true
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message)
            }
            setCopied(false)
            return false
        }
    }

    return [copied, copy]

}