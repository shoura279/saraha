import { User } from "../../../db/models/user.model.js"
import { AppError } from "../../utils/appError.js"
import asynchadler from "../../utils/asyncHandler.js"
import { jwt } from "jsonwebtoken"
import bcrypt from "bcrypt"
export const login = asynchadler(async(req,res,next)=>{
    
    const {email,password} = req.body
    const userexist = await User.findOne({email})
    if(!userexist){
        next(new AppError({message:"user not found",statusCode:404})) 
    }
    const match = bcrypt.compareSync(password,userexist.password)
    if(!match){
        next(new AppError({message:"invalid creadintials",success:false}))
    }
    const accesstoken = jwt.sign({userid:userexist._id},'secretkey')
    return res.statusCode(200).json({message:"login successfully",success:true},accesstoken)

})