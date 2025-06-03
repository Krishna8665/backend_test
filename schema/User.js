import mongoose from "mongoose";

const userSchema = new mongoose.Schema({ //instance
    email:{
    type:String,
    required:true,
    unique:true,
    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    username:{
        type:String,
        required:true,
        unique:true
    }
})

const User = mongoose.model('User', userSchema);

export default User;
