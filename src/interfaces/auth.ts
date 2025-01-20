import {Request} from "express";
import {User} from "@interfaces/user";

export interface DataStoredInToken {
    _id: string;
}

export interface TokenData {
    type?: string | 'bearer'
    access_token: string
    refresh_token: string

}

export interface RequestWithUser extends Request{
    user: User;
}