export type VisitRow={date:string;visits:number};
export function ksaCutoff(now?:Date):string;
export function modelYear(year:number,total:number):VisitRow[];
export function buckets(rows:VisitRow[],mode?:string):{label:string;visits:number}[];
