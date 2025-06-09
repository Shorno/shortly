"use client"
import {Button} from "@/components/ui/button";
import {CopyIcon, EditIcon, TrashIcon} from "lucide-react";
import useCopyToClipboard from "@/hooks/useCopyToClipboard";

export default function LinkActions({shortURL}: { shortURL: string }) {
    const [copied, copy] = useCopyToClipboard()

    return (
        <div className={"flex gap-2"}>
            <Button
                onClick={() => copy(shortURL)}
                className={"bg-[#e8ebf2] text-xs font-semibold hover:bg-gray-300 dark:bg-primary dark:hover:bg-[#1D875A] rounded-sm"}
                size={"sm"}>
                <CopyIcon/>
                {copied ? "Copied" : "Copy"}
            </Button>
            <Button size={"sm"}
                    variant={"outline"}
                    className={"border-gray-200"}>
                <EditIcon/>
            </Button>
            <Button size={"sm"}
                    variant={"outline"}
                    className={"border-gray-300"}>
                <TrashIcon/>
            </Button>
        </div>
    )
}