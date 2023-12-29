import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = async (req,res,next) => {
    console.log("My token" + req.cookies.access_token);
    const token = req.cookies.access_token || req.body.token;
    if(!token){
        return next(createError(401,"Unauthenticated User!"));
    }
    jwt.verify(token,process.env.JWT,(err,user)=>{
        if(err){
            return next(createError(403,"Token is not valid!"));
        }
        req.user = user; //assigning user id for further applications req.user will be equal to what we set that in cookie in auth.js
        next(); //continues from where we left 
    })
}