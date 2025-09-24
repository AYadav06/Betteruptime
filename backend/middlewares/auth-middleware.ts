import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { ENV } from "../config/env";

export  const authMiddleware=async (req:Request,res:Response,next:NextFunction)=>{

    const token=req.cookies.authtoken;      
    if(!token){
        res.status(411).json({
            message:"unauthenticated user"
        })
        return;
    }
try {
 const decoded=jwt.verify(token,ENV.JWT_SECRETE!)as JwtPayload;
 req.userId=decoded.data
 console.log("req.userid",decoded.sub);
 next();
} catch (error) {
    res.status(403).json({
        message:"error while verify user..."
    })
}
}