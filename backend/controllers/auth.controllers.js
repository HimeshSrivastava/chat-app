import bcrypt from "bcryptjs/dist/bcrypt.js";
import User from "../models/user.model.js";
import generatewebtoken from "../Utils/generatewebtoken.js";

export const signup =async(req,res)=>{
    try {
        const {name, email, password, ConfirmPassword, gender} = req.body;
        if(password !== ConfirmPassword){
            return res.status(400).json({error:"Passwords don't match"});
        }
        
        const user=await User.findOne({name});
        if(user){
            return res.status(400).json({error:"user already exit"});
        }
        
        const salt= await bcrypt.genSalt(10);
        const hashpassword=await bcrypt.hash(password,salt);
        
        const newuser= new User({
            name,
            email,
            password:hashpassword,
            ConfirmPassword,
            gender,
        });
        if(newuser){
            
            generatewebtoken(newuser._id,res);
            
            await newuser.save();
            return res.status(200).json({
                name:newuser.name,
                email:newuser.email,
                password:newuser.password,
                ConfirmPassword:newuser.ConfirmPassword,
                gender:newuser.gender,
            });
        }
        else{
            console.log(error);
        }
    } catch (error) {
        console.log(error);
    }
}
export const login =async(req,res)=>{
       
   const {email, password}=req.body;
    const user=await User.findOne({email});
    const ispasswordcorrect=await bcrypt.compare(password,user?.password || "");

    if(user && ispasswordcorrect){
        generatewebtoken(user._id, res);

            return res.status(200).json({
                name: user.name,
                email: user.email,
                gender: user.gender,
            });
    }
    else{
        return res.status(400).json({error:"invalid credential"});
    }
}
export const logout =(req,res)=>{
    try {
        res.clearCookie('jwt', {
            httpOnly: true,
            sameSite: 'strict',
        });

        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log(error);
    }
}