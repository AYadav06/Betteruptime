import { prisma } from "../config/db";
import { xaddBulk } from "../config/redis";

async function main(){
        const website=await prisma.website.findMany({
            select:{
                url:true,
                id:true
            }
        });
        await xaddBulk(website.map(w=>({
            url:w.url,
            id:w.id
        })));    
    }
        setInterval(()=>{
            main();
        },5*1000*60)  
    