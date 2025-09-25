import express from "express";
import { ENV } from "../config/env";
import { router } from "../routes";
import cookieParser from "cookie-parser";
const app=express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/",router);

app.listen(ENV.PORT,()=>{
    console.log(`Server is running on ${ENV.PORT}`);
});