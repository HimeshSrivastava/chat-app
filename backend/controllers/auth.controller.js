import bcrypt from 'bcryptjs'
import User from "../models/user.model.js";
import generatewebtoken from "../Utils/generatewebtoken.js";

// export const signup =async(req,res)=>{
//     try {
//         const {name, email, password, ConfirmPassword, gender} = req.body;
//         if(password !== ConfirmPassword){
//             return res.status(400).json({error:"Passwords don't match"});
//         }
        
//         const user=await User.findOne({name});
//         if(user){
//             return res.status(400).json({error:"user already exit"});
//         }
        
//         const salt= await bcr
//         const hashpassword=await bcrypt.hash(password,salt);
        
//         const newuser= new User({
//             name,
//             email,
//             password:hashpassword,
//             ConfirmPassword,
//             gender,
//         });
//         if(newuser){
            
//             const token=generatewebtoken(newuser._id,res);
            
//             await newuser.save();
//             return res.status(200).json({
//                 name:newuser.name,
//                 email:newuser.email,
//                 password:newuser.password,
//                 ConfirmPassword:newuser.ConfirmPassword,
//                 gender:newuser.gender,
//                 token,
//             });
//         }
//         else{
//             console.log(error);
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }
export const signup = async (req, res) => {
    try {
        const { name, email, password, ConfirmPassword, gender } = req.body;

        // Check if passwords match
        if (password !== ConfirmPassword) {
            return res.status(400).json({ error: "Passwords don't match" });
        }

        // Check if the user already exists
        const user = await User.findOne({ email });
        console.log(user);
        if (user) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Generate salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        
        const newUser = new User({
            name,
            email,
            password: hashPassword,
            gender,
        });

        console.log(newUser);
        await newUser.save();
        const token = generatewebtoken(newUser._id, res);
        
        
        return res.status(201).json({
            name: newUser.name,
            email: newUser.email,
            gender: newUser.gender,
            token,
        });
    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({ error: "Server error during signup" });
    }
};

export const login =async(req,res)=>{
       
   const {email, password}=req.body;
    const user=await User.findOne({email});
    const ispasswordcorrect=await bcrypt.compare(password,user?.password || "");

    if(user && ispasswordcorrect){
       const token= generatewebtoken(user._id, res);
        
            return res.status(200).json({
                name: user.name,
                email: user.email,
                gender: user.gender,
                token,
            });
    }
    else{
        return res.status(400).json({error:"invalid credential"});
    }
}
export const logout = (req, res) => {
    try {
        res.clearCookie("jwt", {
            httpOnly: true,
            sameSite: "strict",
        });
        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error("Logout Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// import bcrypt from "bcryptjs/dist/bcrypt.js";
// import User from "../models/user.model.js";
// import generatejsonwebtoken from "../Utils/generatejsonwebtoken.js";

// export const signup = async (req, res) => {
//     try {
//         const { name, email, password, ConfirmPassword, gender } = req.body;
//         if (password !== ConfirmPassword) {
//             return res.status(400).json({ error: "Passwords don't match" });
//         }

//         const user = await User.findOne({ email }); // Change name to email for uniqueness
//         if (user) {
//             return res.status(400).json({ error: "User already exists" });
//         }

//         const salt = await bcrypt.genSalt(10);
//         const hashpassword = await bcrypt.hash(password, salt);

//         const newuser = new User({
//             name,
//             email,
//             password: hashpassword,
//             gender,
//         });

//         await newuser.save();
//         const token = generatejsonwebtoken(newuser._id, res);

//         return res.status(201).json({
//             name: newuser.name,
//             email: newuser.email,
//             gender: newuser.gender,
//             token,
//         });

//     } catch (error) {
//         console.error("Signup Error:", error);
//         return res.status(500).json({ error: "Internal Server Error" });
//     }
// };

// export const login = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(400).json({ error: "User not found" });
//         }

//         const isPasswordCorrect = await bcrypt.compare(password, user.password);
//         if (isPasswordCorrect) {
//             const token = generatejsonwebtoken(user._id, res);
//             return res.status(200).json({
//                 name: user.name,
//                 email: user.email,
//                 gender: user.gender,
//                 token,
//             });
//         } else {
//             return res.status(400).json({ error: "Invalid credentials" });
//         }
//     } catch (error) {
//         console.error("Login Error:", error);
//         return res.status(500).json({ error: "Internal Server Error" });
//     }
// };

// export const logout = (req, res) => {
//     try {
//         res.clearCookie('jwt', {
//             httpOnly: true,
//             sameSite: 'strict',
//         });
//         return res.status(200).json({ message: "Logout successful" });
//     } catch (error) {
//         console.error("Logout Error:", error);
//         return res.status(500).json({ error: "Internal Server Error" });
//     }
// };
