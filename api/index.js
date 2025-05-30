import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
dotenv.config();
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("MongoDB connected successfully!");

})
.catch((err)=>{
    console.log("MongoDB connection failed!",err);
});
const app=express();
app.use(express.json());
app.listen(3000,()=>{
    console.log("Server is running on port 3000!")
})
app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);


app.use((err,req,resizeBy,next)=>{
      const statusCode=err.statusCode || 500;
      const messagee=err.message || "Something went wrong!";
      return resizeBy.status(statusCode).json({
        success:false,
       statusCode,
        messagee,
      });
      
});
