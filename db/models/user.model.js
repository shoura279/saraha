import {Schema,model} from "mongoose"

export const userSchema = new Schema({

username: String,
email:{
    type:String,
    required:true
},
password:{
    type:String,
    required:true
},
otp:Number,
isVerified:{
    type:Boolean,
    default:false
},

},{timestamps:true})
export const User= model('User',userSchema)