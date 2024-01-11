import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
import {errorHandler} from '../utils/error.js'
import bcryptjs from 'bcryptjs'
export const signup= async (req,res,next)=> {
    console.log(req.body);
    const {username,email,password}=req.body;
    const hashedPassword=bcryptjs.hashSync(password,10);
    const newUser=new User({username,email,password:hashedPassword});
    try
    {await newUser.save()
    // res.send
    res.status(201).json({
        "message":`user created successfully!!`
    })}
    catch(err){
        // res.status(500).json(err.message);
        next(err);
    }
}


export const signin= async(req,res,next)=>{
 const {email,password}=req.body;   
 try{
    const validUser=await User.findOne({email});
    if(!validUser) return next(errorHandler(404,"User Not Found"))
    const validPassword=bcryptjs.compareSync(password,validUser.password);
    if(!validPassword) return next(errorHandler(401,"Invalid Credentials"))
    const expiryDate=new Date(Date.now()+60000000);
    const {password:hashedPassword,...rest}=validUser._doc;
        const token=jwt.sign({id:validUser._id},process.env.JWT_SECRET)
    res.cookie('access_token',token,{httpOnly:true, expires:expiryDate}).status(200).json(rest);
}
 catch(error){
    next(error);
 }
}