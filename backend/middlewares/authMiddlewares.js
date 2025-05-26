import jwt from 'jsonwebtoken';
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Токен олдсонгүй" });
  }

  try {
    const decoded = jwt.verify(token, 'your_secret_key');
    
    req.user = decoded;

    next();  // Үргэлжлүүлнэ
  } catch (error) {
    return res.status(401).json({ message: "Токен алдаатай байна" });
  }
};


export default verifyToken;