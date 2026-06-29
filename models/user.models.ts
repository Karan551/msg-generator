import mongoose, { Schema } from "mongoose";
import { Message, User } from "../types/schema.types";


const messageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: [true, "Message is required."]
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }


});



const userSchema: Schema<User> = new Schema({
    userName: {
        type: String,
        required: [true, "Username is required."],
        trim: true,
        unique: true

    },
    email: {
        type: String,
        required: [true, "Email is required."],
        trim: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Please use a valid email address']
    },
    password: {
        type: String,
        required: [true, "Password is required."]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAcceptingMsg: {
        type: Boolean,
        default: true
    },
    verifyToken: {
        type: String,
        required: [true, "Verify Token is required."]
    },
    verifyTokenExpiry: {
        type: Date,
        required: [true, "VerifyToken Expiry required."]
    },
    messages: [messageSchema]




},
    { timestamps: true }
);
Date;


const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", userSchema);

export default UserModel;