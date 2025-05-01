import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from './config/db.js';
import usersRoutes from "./routes/users.route.js";
import drugsRoutes from "./routes/drugs.route.js"
dotenv.config();
const app = express();
app.use(cors({
    origin: "http://localhost:3000", 
    methods: 'GET, POST, PUT, DELETE',
    credentials: true
  }));

app.use(express.json());


app.use("/api/drugs", drugsRoutes)
app.use("/api/users", usersRoutes)

app.listen(5001, ()=>{
    connectDB();
    console.log("server is starting at http://localhost:5001");
});

