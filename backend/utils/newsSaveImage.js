import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default function saveNewsImage(base64Data, fileName = 'news_image.jpg') {
  const base64Image = base64Data.replace(/^data:image\/\w+;base64,/, "");

  const uploadsDir = path.join(__dirname, '../newsUploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
  }

  const filePath = path.join(uploadsDir, fileName);

  fs.writeFileSync(filePath, base64Image, { encoding: 'base64' });
  console.log('Мэдээний зураг хадгалагдлаа:', filePath);

  return filePath;
}
