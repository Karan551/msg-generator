import mongoose, { Document } from "mongoose";


export interface Message extends Document {
    content: string,
    createdAt: Date;
};


export interface User extends Document {
    userName: string,
    email: string,
    password: string,
    isVerified: boolean,
    isAcceptingMsg: boolean,
    verifyToken: string,
    verifyTokenExpiry: Date,
    messages: Message[];
}