const express=require("express");
const router=express.Router();
const User=require("../models/User");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const SECRET="mysecretkey";

router.post("/register",async(req,res)=>{
    const {username,email,password}=req.body;
    const hashedPassword=await bcrypt.hash(password,10);

    const user=new User({
        username,
        email,
        password:hashedPassword
    });
    await user.save();
    res.json({message:"User registered successfully"});
});

router.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(!user){
        return res.status(400).json({message:"Invalid credentials"});
    }
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(400).json({message:"Invalid credentials"});
    }
    const token=jwt.sign(
        {userId:user._id},
        SECRET,
    {expiresIn:"1h"}
    );
    res.json({token});
});

module.exports=router;