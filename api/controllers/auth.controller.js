// ✅ Named export
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async(req, res,next) => {
  // your logic here
   const {username,email,password}=req.body;
   const hashedPassword=bcrypt.hashSync(password,10);//this is the way to hash a password in bcryptjs
   const newUser=new User({username,email,password:hashedPassword});//this is the way to create a new user in the database 
   try{
    await newUser.save();//this is the way to save a new user in the database
    res.status(201).json({message:"User created successfully!"});//this is the way to send a response to the client
   }catch(err){

    // res.status(500).json({message:"User creation failed!"});//this is the way to send a response to the client
    next(err);//this is the way to send an error to the error handling middleware
   }

   
};
