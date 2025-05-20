import {nanoid} from "nanoid";

export default function GenerateRandomID(length : number){
    return nanoid(length)
}