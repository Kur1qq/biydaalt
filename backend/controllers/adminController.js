import Users from "../models/users.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/token.js";


export const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await Users.findOne({ email });
      if (!user) {
        return res.status(400).json({ success: false, message: "И-мэйл эсвэл нууц үг буруу байна." });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: "Нууц үг буруу байна." });
      }
  
      if (!user.isAdmin) {
        return res.status(403).json({ success: false, message: "Энэ хэрэглэгч админ эрхгүй байна." });
      }
  
      const token = generateToken(user._id);
      res.status(200).json({
        success: true,
        message: "Амжилттай нэвтэрлээ.",
        token,
      });
    } catch (error) {
      console.error("Error in admin login:", error.message);
      res.status(500).json({ success: false, message: "Серверийн алдаа." });
    }
  };