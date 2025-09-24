import type { Request, Response } from "express";
import { authTypes } from "../types/zod.types";
import * as bcrypt from "bcrypt"
import { prisma } from "../config/db";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env";

export const create_user=async (req:Request,res:Response)=>{
    const result=authTypes.safeParse(req.body);
    if(!result.success){
        result.error;
        console.log(result.error);
    }
    else{
     result.data
    }
    try {
    const hashedPassword=await bcrypt.hash(result.data?.password!,10);
    console.log("hashedPasword",hashedPassword);

    const createuser=await prisma.user.create({
        data:{
            email:result.data?.email!,
            password:hashedPassword
        }
    })
    res.status(200).json({
        message:"user is created",
        createuser
    })

    } catch (error) {
       res.status(500).json({
        message:"error while signup ..."
       }) 
    }
}
export const sigin_user=async(req:Request,res:Response)=>{

const result=authTypes.safeParse(req.body);
if(!result.success){
    result.error
}
else{
    result.data
}

try {
    const hashedPassword=await prisma.user.findFirst({
        where:{
            email:result.data?.email
        }
    })
   const comparePassword=await bcrypt.compare(result.data?.password!,hashedPassword?.password!) ;

   if(comparePassword){
    const token=jwt.sign({
        data:hashedPassword?.id
    },ENV.JWT_SECRETE as string)
    
    res
    .cookie('authtoken',token)
     .status(200).json({
        message:"user is signin",
        token
    })
}
} catch (error) {
    res.status(471).json({
        message:"error while signin up"
    })
    
}

}

