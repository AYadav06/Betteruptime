import type { Request, Response } from "express";
import { prisma } from "../config/db";

export const website_add=async (req:Request,res:Response)=>{
const data=req.body;
console.log("websit data ",data);
if(!data.url){
    res.status(411).json({
        message:"website is not entered"
    })
    return;
}
try {
    const result=await prisma.website.create({
        data:{
            url:data.url,
            time_add:new Date(),
            user_id:req.userId!,
        }
    });

console.log("website is sent to db",result);
res.status(200).json({
    message:"website is added ..",
    id:result.id
})
    
} catch (error) {
    res.status(500).json({
        message:"error while adding website"
    })
}
}
export const website_status=async (req:Request,res:Response)=>{
try {
    
const website=await prisma.website.findFirst({
    where:{
          user_id:req.userId,
          id:req.params.websiteId
    },
    include:{
        ticks:{
            orderBy:[{
                created_At:"desc"
            }],
            take:1
        }
    }
})
if(!website){
res.json({
    message:"website not found"
})
}

res.json({
    url:website?.url,
    id:website?.id,
    user_id:website?.user_id,
})
} catch (error) {

    res.status(500).json({
        message:"error while getting the website"
    })  
}
}