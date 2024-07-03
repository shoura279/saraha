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
otp:Number

})
export const User= model('User',userSchema)