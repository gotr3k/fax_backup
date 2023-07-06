import { Time } from "@angular/common";

export interface List{
    id:number,
    name:string,
    subjectId:number,
    place:string,
    date:Date,
    time:string,
    slots:any,
    open:boolean
}