import mongosse from 'mongoose';  

const userSchema = new mongosse.Schema({
  username:{
    type:String,
    required:true,
    unique:true,
  },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  password:{
    type:String,
    required:true,
  },
},{timestamps:true});

const User = mongosse.model('User',userSchema);
export default User;