import z, { email } from "zod";

export const authTypes=z.object({
    email:z.email(),
    password:z.string().min(3)
})
export const websiteType=z.object({
    id:z.string(),
    url:z.string(),
    ticks:z.string(),
    time_add:z.date(),
})
export const regionTypes=z.object({
id :z.string(),
name:z.string()
})