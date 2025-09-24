import dotenv from "dotenv";
dotenv.config();

export const ENV={
    PORT:process.env.PORT,
    JWT_SECRETE:process.env.JWT_SECRETE 
}