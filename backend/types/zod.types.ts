import z, { email } from "zod";

export const authTypes=z.object({
    email:z.email(),
    password:z.string().min(3)
})