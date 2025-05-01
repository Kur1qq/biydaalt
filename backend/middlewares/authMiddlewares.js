import jwt from 'jsonwebtoken';
const verifyToken = (req, res, next) => {
  // Authorization header-ийг авна
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Токен олдсонгүй" });
  }

  try {
    // Токеныг баталгаажуулж, decode хийх
    const decoded = jwt.verify(token, 'your_secret_key');
    
    // Токен баталгаажсан тохиолдолд хэрэглэгчийн мэдээллийг request-тай холбож өгнө
    req.user = decoded;

    next();  // Үргэлжлүүлнэ
  } catch (error) {
    return res.status(401).json({ message: "Токен алдаатай байна" });
  }
};


export default verifyToken;