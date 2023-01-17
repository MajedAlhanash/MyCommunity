export interface CreateCLinicAdmin {
    id?:number;
    UserName: string;
    Email: string;
    Password: string;
    ProfileImage: string;
    WebSiteUrl: string;
}

export interface UpdateUser {
    id?:number;
    UserName: string;
    FirstName:string;
    LastName:string;
    Email: string;
    Password: string;
    ProfileImage: string;
    WebSiteUrl: string;
    Gender: number;
    PhoneNumber:string;
    Biography: string;
    Image: string
 
}