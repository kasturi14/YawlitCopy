
//An interface for defining the type of logged in user
export interface Customer
{
    name:string;
    first:string;
    second:string;
    email: string;
    Phone:string;
    isAdmin: boolean;
    Address:string;
    isSubscribed:boolean;
}