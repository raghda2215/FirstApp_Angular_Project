import { Article } from "./Pub";

export interface Member
{
    id:String,
    cin:String,
    name:String,
    type:String,
    createdDate:String,
    tab_pub:Article[]
}