
export interface User{
    id?:number,
    userName?:string,
    email?:string,
    password?:string,
    role?:UserRole
}

export enum UserRole {
    ADMIN = 'admin',
    CHIEFEDITOR = 'chiefeditor',    
    EDITOR = 'editor',
    USER = 'user'
}