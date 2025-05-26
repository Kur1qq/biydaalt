import Users from "../models/users.model.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import generateToken from "../utils/token.js";

export const getUsers = async(req, res) => {
    try {
        const users = await Users.find({});
        res.status(200).json({success : true, data : users});
    } catch (error) {
        console.log("error in fetching user : ", error.message);
        res.status(500).json({success : false, message : "server error"});
    } 
};



export const registerUsers = async (req, res) => {
    const { name, email, phone_number, password } = req.body;

    try {
        // Имэйл хаяг давхардаагүйг шалгах
        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Имэйл хаяг аль хэдийн бүртгэгдсэн байна.' });
        }

        // Нууц үгийг хэшлэх
        const hashedPassword = await bcrypt.hash(password, 10);

        // Хэрэглэгчийг хадгалах
        const newUser = new Users({
            name,
            email,
            phone_number,
            password: hashedPassword,  // Хэшлэгдсэн нууц үг хадгалагдах болно
        });

        await newUser.save();

        // Токен үүсгэх
        const token = generateToken(newUser);  // Токен үүсгэх

        console.log("Үүсгэгдсэн токен:", token);  // Токен шалгах

        // Бүртгэл амжилттай болсон үед токеныг буцаах
        res.status(201).json({
            success: true,
            message: 'Бүртгэл амжилттай боллоо.',
            token,  // Токеныг буцаах
        });
    } catch (error) {
        console.error('Хэрэглэгч бүртгэхэд алдаа гарлаа:', error);
        res.status(500).json({ success: false, message: 'Серверийн алдаа.' });
    }
};

export const loginUsers = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Хэрэглэгчийг email-р нь хайж олох
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "И-мэйл эсвэл нууц үг буруу байна." });
        }

        // Хэшлэгдсэн нууц үгийг шалгах
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Нууц үг буруу байна." });
        }

        // Токен үүсгэх
        const token = generateToken(user._id);

        // Токен амжилттай үүссэн тохиолдолд хариу илгээх
        res.status(200).json({
            success: true,
            message: "Амжилттай нэвтэрлээ.",
            token,  // Токен буцаах
        });
    } catch (error) {
        console.error("Error in login:", error.message);
        res.status(500).json({ success: false, message: "Серверийн алдаа." });
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