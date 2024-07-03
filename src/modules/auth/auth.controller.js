import bcrypt from 'bcrypt'
import joi from 'joi'
import jwt from 'jsonwebtoken'
import asynchadler from "../../utils/asyncHandler.js"
import { User } from "../../../db/models/user.model.js"
import { AppError } from "../../utils/appError.js"
import { sendEmail } from '../../utils/sendEmail.js'

const authSchema = joi.object({
    email:joi.string().email().required(),
    password:joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    rePassword:joi.string().valid(joi.ref('password')).required()
})

export const signup = asynchadler(async (req,res,next)=>{
    const {error} = authSchema.validate(req.body)
    if(error){
        next(new AppError(error.details,400))
    }
    const {email,password} = req.body
    const isExist = await User.findOne({email})
    if(isExist){
        next(new AppError("user already exist",400))
    } 
    const hashedPassword = await bcrypt.hash(password,8)
    const user = new User({
        username,
        password:hashedPassword
    })
    await user.save()
    // ****  todo token muse be otp  ****
    const token = jwt.sign({email},'secretKey')
    sendEmail(email,token)
})

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