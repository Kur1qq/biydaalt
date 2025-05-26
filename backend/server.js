import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { connectDB } from './config/db.js';
import usersRoutes from "./routes/users.route.js";
import drugsRoutes from "./routes/drugs.route.js";
import adminRoutes from "./routes/admin.route.js";
import newsRoutes from "./routes/news.route.js";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors({
    origin: ['http://localhost:3000', 'http://192.168.1.99:3000'],
    methods: 'GET, POST, PUT, DELETE',
    credentials: true
  }));

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/newsUploads', express.static(path.join(__dirname, 'newsUploads')));

app.use("/api/drugs", drugsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/news", newsRoutes);


app.listen(5001, () => {
    connectDB();
    console.log("server is starting at http://localhost:5001");
});
