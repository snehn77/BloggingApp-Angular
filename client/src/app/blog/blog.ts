// Model of the Database
export interface IBlog{
    _id?:string;
    title : string;
    categories :string;
    content : string;
    sanitizedHTML?:string;
}