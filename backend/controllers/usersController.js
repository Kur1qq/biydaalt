import Users from "../models/users.model.js"
import mongoose from "mongoose";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";

// export const createUser = asyncHandler(async (req, res) => {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//         res.status(400);
//         throw new Error("Бүх мэдээллээ оруулна уу!");
//     }

//     const userExists = await Users.findOne({ email });
//     if (userExists) {
//         res.status(400);
//         throw new Error("Энэ email аль хэдийн бүртгэгдсэн байна!");
//     }

//     const salt = await bcrypt.genSalt(10); 
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newUser = new Users({
//         name,
//         email,
//         password: hashedPassword, 
//     });

//     try {
//         await newUser.save();
//         res.status(201).json({
//             _id: newUser._id,
//             name: newUser.name,
//             email: newUser.email,
//             isAdmin: newUser.isAdmin || false,
//         });
//     } catch (error) {
//         res.status(400);
//         throw new Error("Хэрэглэгч бүртгэхэд алдаа гарлаа");
//     }
// });


export const getUsers = async(req, res) => {
    try {
        const users = await Users.find({});
        res.status(200).json({success : true, data : users});
    } catch (error) {
        console.log("error in fetching user : ", error.message);
        res.status(500).json({success : false, message : "server error"});
    } 
};

export const postUsers = async(req, res) => {
    const users = req.body;
    if(!users.name || !users.email || !users.phone_number){
        return res.status(400).json({success: false, message: "please provide fields"});
    }
    const newUsers = new Users(users);
    try {
        await newUsers.save();
        res.status(200).json({success: true, data: newUsers});
    } catch (error) { 
        console.log("Error in create user:", error.message);
        res.status(500).json({success: false, message: "server error"});
        
    }
};

export const putUsers = async(req, res) => {
    const {id} = req.params;

    const users = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success : false, message : "invalid user id"});
    }

    try {
        const UpdetedUser = await Users.findByIdAndUpdate(id, users, {new: true});
        res.status(200).json({success : true, data: UpdetedUser}); 
    } catch (error) {
        res.status(500).json({success : false, message: "server error"});
    }
};

export const deleteUsers = async(req, res) => {
    const {id} = req.params;

    try {
        await Users.findByIdAndDelete(id);
        res.status(200).json({success : true, message : "user deleted"});
    } catch (error) {
        console.log("error in deleting user: ", error.message);
        res.status(404).json({success : false, message : "user not found"});
    }
};