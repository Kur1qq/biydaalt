import jwt from 'jsonwebtoken';

const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      name: user.name,         // 👈 Нэрийг JWT-д нэмлээ
      email: user.email        // (нэмэлтээр)
    },
    'your_secret_key',
    { expiresIn: '1h' }
  );
};

export default generateToken;
