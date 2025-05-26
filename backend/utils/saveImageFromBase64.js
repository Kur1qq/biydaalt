import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// ES модулд __dirname авах
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default function saveImageFromBase64(base64Data, fileName = 'drug_image.jpg') {
  const base64Image = base64Data.replace(/^data:image\/\w+;base64,/, "");

  const uploadsDir = path.join(__dirname, '../uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
  }

  const filePath = path.join(uploadsDir, fileName);

  fs.writeFileSync(filePath, base64Image, { encoding: 'base64' });
  console.log('Файл амжилттай хадгалагдлаа:', filePath);

  return filePath;
}
