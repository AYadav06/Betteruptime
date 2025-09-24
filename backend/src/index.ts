import express from "express";
import { ENV } from "../config/env";
import { router } from "../routes";

const app=express();

app.use(express.json());

app.use("/api/v1/",router);
app.listen(ENV.PORT,()=>{
    console.log(`Server is running on ${ENV.PORT}`);
});