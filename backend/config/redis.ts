import { createClient } from "redis";

export const redisClient=await  createClient()
     .on("error",(err)=>console.log("Redis client error",err))
     .connect();

type websiteEvent={url:string,id:string}
type messageType={
     id:string,
     message:{
          id:string,
          url:string
     }
}
const STREAM_NAME="betteruptime:website";
export async function xadd({url,id}:websiteEvent){
      await redisClient.xAdd(
          STREAM_NAME,"*",{
               url,
               id
          }
     );
}
export async function xaddBulk(website:websiteEvent[]){
    for(let i =0;i<website.length;i++){
     await xadd({
          url:website[i]?.url!,
          id:website[i]?.id!
     })
    }
}
export async function xreadGroup(consumerGroup:string,workerId:string):Promise<messageType[] | undefined>{
const res=await redisClient.xReadGroup(
      consumerGroup,workerId,{
          key:STREAM_NAME,
          id:'>'
      },{
          'COUNT':5
      }
);
//@ts-ignore
let messages:messageType[] | undefined=res?.[0]?.message;
return messages;
}


async function xAck(consumerGroup: string, eventId: string) {
    await redisClient.xAck(STREAM_NAME, consumerGroup, eventId)
}

export async function xAckBulk(consumerGroup: string, eventIds: string[]) {
    eventIds.map(eventId => xAck(consumerGroup, eventId));
}