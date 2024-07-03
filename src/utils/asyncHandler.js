import { AppError } from "./appError.js"

export const asynchandler = (fn)=>{
    return (req,res,next)=>{
        fn(req,res,next).catch((err)=>{
            next(new AppError(err.message,err.statusCode))

        })

    }

}


export const globalErrorHandling = (err , req , res , next)=>{

    return res.status(err.statusCode||500).json({message:err.message,success:false})
}