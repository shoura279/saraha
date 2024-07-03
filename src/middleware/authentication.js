import jwt from "jsonwebtoken"
import {AppError} from "../utils/appError.js"

// authentication middleware
export const auth = (req, res, next) => {
    try{
        const {token} = req.headers
        // verify the token with the secret key
        jwt.verify(token,'secretKey',(err,decode)=>{
            
            if(err){
            next(new AppError("unauthorized",401))
            }
            else{
                req.user = decode
                next()
            }
        })
    if(!token){
        next(new AppError("unauthorized",401))
    }}
    catch(err){
        next(new AppError("unauthorized",401))
    }
}