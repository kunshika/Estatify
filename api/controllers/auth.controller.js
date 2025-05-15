// ✅ Named export
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

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

export const signin=async(req,res,next)=>{
    const {email,password}=req.body;
    try{
      const validUser=await User.findOne({email});
      if(!validUser){
        return next(errorHandler(404,"User not found!"));//this is the way to send an error to the error handling middleware
      }
      const validPassword=bcrypt.compareSync(password,validUser.password);
      if(!validPassword){
        return next(errorHandler(401,"Invalid credentials!"));//this is the way to send an error to the error handling middleware
      }
      const token=jwt.sign({id:validUser._id},process.env.JWT_SECRET);//this is the way to create a token using jwt
      const {password:pass,...rest}=validUser._doc;//this is the way to destructure an object in javascript
      res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest);//this is the way to send a response to the client
    }catch(err){
      next(err);
    }
}