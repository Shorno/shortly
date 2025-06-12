import {parseAsInteger, createLoader} from "nuqs/server";

export const pageSearchParams = {
    page: parseAsInteger.withDefault(1),
}

export const loadParams = createLoader(pageSearchParams)