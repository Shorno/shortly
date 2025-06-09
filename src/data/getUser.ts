"use server"

import {auth} from "@/lib/auth";
import {headers} from "next/headers";

export async function GetUser() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session || !session.user || !session.user.id) {
        throw new Error("You must be logged in to perform this action");
    }

    return session.user;
}