import mongoose, {Schema, Document} from "mongoose";
import { deflate } from "zlib";

export interface Message extends Document{
    content :string ;
    createdAt :Date ;
} ;

const MessageSchema : Schema<Message> = new Schema({
    content :{
        type:String,
        required: true
    },
    createdAt : {
        type:Date,
        required:true,
        default:Date.now
    }
}) ;

export interface User extends Document{
    username:string;
    email:string ;
    password:string ;
    verifyCode:string;
    verifyCodeExpiry:Date ;
    isVerified:boolean ;
    isAcceptingMessages: boolean ;
    messages:Message[] ;
} ;

const UserSchema : Schema<User> = new Schema({
    username:{
        type: String,
        index:{unique: true} 
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique: true,
        match:[/.+\@.+\..+/, "please use a valid email"]
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    verifyCode:{
        type:String,
        required:[true,"Verification code is required"]
    },
    verifyCodeExpiry:{
        type:Date,
        required:[true,"Verify code expiry is required"]
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAcceptingMessages:{
        type:Boolean,
        default:false,
    },
    messages:[MessageSchema]
});

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User",UserSchema) ;
export default UserModel ;