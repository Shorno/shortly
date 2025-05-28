import {GetUser} from "@/actions/getUser";
import {db} from "@/db";
import {eq} from "drizzle-orm";
import {links} from "@/db/schema";
import {redirect} from "next/navigation";

export async function GetUserURLs() {
    const user = await GetUser();

    if (!user?.id) redirect("/")

    return db.query.links.findMany({
        where: eq(links.user_id, user?.id),

    });
}

